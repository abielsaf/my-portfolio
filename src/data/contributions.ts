// Single source of truth for the commonwealth-ga-server contribution numbers,
// so the heatmap and the About stats can never disagree.
//
// Refresh with:
//   curl -s "https://api.github.com/search/issues?q=is:pr+author:abielsaf+repo:commonwealthga/commonwealth-ga-server&per_page=100"
// then group items by created_at[:10] for prActivity, and count the items whose
// pull_request.merged_at is non-null for mergedPRs.
// Last updated: 2026-07-25.

/** PRs opened, keyed by UTC date. */
export const prActivity: Record<string, number> = {
  '2026-06-19': 1,
  '2026-06-20': 1,
  '2026-06-21': 1,
  '2026-06-25': 1,
  '2026-06-26': 1,
  '2026-06-27': 1,
  '2026-06-28': 2,
  '2026-06-29': 2,
  '2026-06-30': 1,
  '2026-07-02': 1,
  '2026-07-06': 1,
  '2026-07-08': 1,
  '2026-07-12': 1,
  '2026-07-13': 1,
  '2026-07-17': 2,
  '2026-07-18': 3,
  '2026-07-19': 2,
  '2026-07-20': 3,
  '2026-07-23': 3,
  '2026-07-24': 2,
};

/** Of the 31 opened, how many actually landed. 2 closed unmerged, 1 still open. */
export const mergedPRs = 28;
