import { User } from '../models/User.js';

/**
 * Ban-expiry job (Milestone 4). Lifts time-limited bans whose deadline has
 * passed. Permanent bans (ban_expires_at = null) are untouched. `banCheck` also
 * lifts expired bans lazily on access, so this is the periodic safety net.
 * @returns {Promise<{ lifted: number }>}
 */
export async function expireBans() {
  const res = await User.updateMany(
    { is_banned: true, ban_expires_at: { $ne: null, $lte: new Date() } },
    { $set: { is_banned: false, ban_expires_at: null, ban_reason: null } },
  );
  return { lifted: res.modifiedCount ?? 0 };
}

export default expireBans;
