import * as userService from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const banUser = asyncHandler(async (req, res) => {
  const result = await userService.banUser(req.user, req.params.id, {
    hours: req.body?.hours,
    reason: req.body?.reason,
  });
  res.json(result);
});

export const unbanUser = asyncHandler(async (req, res) => {
  const result = await userService.unbanUser(req.user, req.params.id);
  res.json(result);
});

export const issueNegativeBadge = asyncHandler(async (req, res) => {
  const result = await userService.issueNegativeBadge(
    req.user,
    req.params.id,
    req.body?.key,
    req.body?.reason,
  );
  res.json(result);
});
