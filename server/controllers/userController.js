import * as solutionService from '../services/solutionService.js';
import * as userService from '../services/userService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const leaderboard = asyncHandler(async (req, res) => {
  const users = await solutionService.getLeaderboard(req.query.limit);
  res.json({ users });
});

export const profile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.params.id);
  res.json({ user });
});
