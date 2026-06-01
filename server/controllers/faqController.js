import * as faqService from '../services/faqService.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const list = asyncHandler(async (req, res) => {
  const groups = await faqService.listFaqs({ category: req.query.category });
  res.json({ groups });
});

export const search = asyncHandler(async (req, res) => {
  const results = await faqService.searchFaqs(req.query.q);
  res.json({ results });
});

export const promote = asyncHandler(async (req, res) => {
  const entry = await faqService.promoteQueryToFaq(req.params.queryId);
  res.status(201).json({ entry });
});

export const create = asyncHandler(async (req, res) => {
  const entry = await faqService.createFaq({
    category: req.body?.category,
    question: req.body?.question,
    answer: req.body?.answer,
    sort_order: req.body?.sort_order,
    force: req.body?.force === true || req.body?.force === 'true',
  });
  res.status(201).json({ entry });
});

export const update = asyncHandler(async (req, res) => {
  const entry = await faqService.updateFaq(req.params.id, req.body);
  res.json({ entry });
});

export const setOutdated = asyncHandler(async (req, res) => {
  const entry = await faqService.setFaqOutdated(req.params.id, req.body?.is_outdated);
  res.json({ entry });
});

export const remove = asyncHandler(async (req, res) => {
  res.json(await faqService.deleteFaq(req.params.id));
});
