import { User } from '../models/User.js';
import { Query } from '../models/Query.js';
import { Answer } from '../models/Answer.js';
import { AuditLog } from '../models/AuditLog.js';
import { ApiError } from '../utils/ApiError.js';
import { notify } from './notificationService.js';
import { POSITIVE_BADGES, NEGATIVE_BADGES, NOTIFICATION_TYPE } from '../config/constants.js';

/** Public profile: reputation, badges, governance status, and activity counts. */
export async function getProfile(userId) {
  const user = await User.findOne({ _id: userId, is_deleted: false })
    .select('name points badges negative_badges is_banned ban_expires_at ban_reason requires_approval createdAt')
    .lean();
  if (!user) throw ApiError.notFound('User not found');

  const [queryCount, answerCount] = await Promise.all([
    Query.countDocuments({ author_id: userId, is_deleted: false }),
    Answer.countDocuments({ author_id: userId, is_deleted: false }),
  ]);

  // Expand stored badge keys to full definitions for the UI.
  const badges = (user.badges ?? [])
    .map((k) => POSITIVE_BADGES.find((b) => b.key === k))
    .filter(Boolean);

  return {
    id: user._id,
    name: user.name,
    points: user.points,
    badges,
    negative_badges: user.negative_badges ?? [],
    is_banned: user.is_banned,
    ban_expires_at: user.ban_expires_at,
    ban_reason: user.ban_reason,
    requires_approval: user.requires_approval,
    query_count: queryCount,
    answer_count: answerCount,
    member_since: user.createdAt,
  };
}

/** Admin: ban a user, optionally for a fixed number of hours (else permanent). */
export async function banUser(admin, userId, { hours, reason } = {}) {
  if (String(admin._id) === String(userId)) throw ApiError.badRequest('You cannot ban yourself');

  const user = await User.findById(userId);
  if (!user || user.is_deleted) throw ApiError.notFound('User not found');

  const h = Number(hours);
  user.is_banned = true;
  user.ban_expires_at = h > 0 ? new Date(Date.now() + h * 60 * 60 * 1000) : null;
  user.ban_reason = reason || 'Banned by an administrator';
  await user.save();

  await AuditLog.create({
    action: 'user.ban',
    entity_type: 'user',
    entity_id: user._id,
    performed_by: admin._id,
    details: { hours: h > 0 ? h : null, reason: user.ban_reason },
  });
  await notify({
    recipientId: user._id,
    type: NOTIFICATION_TYPE.BAN,
    title: 'Your account has been banned',
    message: user.ban_reason,
    link: `/users/${user._id}`,
  });

  return { ok: true, is_banned: true, ban_expires_at: user.ban_expires_at };
}

/** Admin: lift a ban and clear restriction. */
export async function unbanUser(admin, userId) {
  const user = await User.findById(userId);
  if (!user || user.is_deleted) throw ApiError.notFound('User not found');

  user.is_banned = false;
  user.ban_expires_at = null;
  user.ban_reason = null;
  user.requires_approval = false;
  await user.save();

  await AuditLog.create({
    action: 'user.unban',
    entity_type: 'user',
    entity_id: user._id,
    performed_by: admin._id,
    details: {},
  });
  await notify({
    recipientId: user._id,
    type: NOTIFICATION_TYPE.SYSTEM,
    title: 'Your account has been reinstated',
    link: `/users/${user._id}`,
  });

  return { ok: true };
}

/**
 * Admin: issue a negative badge. Restricted → requires approval to post;
 * Suspended → permanent ban. Warning is informational.
 */
export async function issueNegativeBadge(admin, userId, key, reason) {
  const def = Object.values(NEGATIVE_BADGES).find((b) => b.key === key);
  if (!def) throw ApiError.badRequest('Invalid negative badge');

  const user = await User.findById(userId);
  if (!user || user.is_deleted) throw ApiError.notFound('User not found');

  if (!user.negative_badges.some((b) => b.key === def.key)) {
    user.negative_badges.push({
      key: def.key,
      label: def.label,
      icon: def.icon,
      reason,
      issued_by: admin._id,
    });
  }
  if (key === NEGATIVE_BADGES.RESTRICTED.key) user.requires_approval = true;
  if (key === NEGATIVE_BADGES.SUSPENDED.key) {
    user.is_banned = true;
    user.ban_expires_at = null;
    user.ban_reason = reason || 'Suspended by an administrator';
  }
  await user.save();

  await AuditLog.create({
    action: 'user.negative_badge',
    entity_type: 'user',
    entity_id: user._id,
    performed_by: admin._id,
    details: { key, reason },
  });
  await notify({
    recipientId: user._id,
    type: NOTIFICATION_TYPE.BADGE,
    title: `You received a ${def.icon} ${def.label} badge`,
    message: reason || '',
    link: `/users/${user._id}`,
  });

  return { ok: true };
}
