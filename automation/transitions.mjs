export const boardOptions = {
  Backlog: 'f75ad846', Ready: '61e4505c',
  'In Progress': '47fc9ee4', 'Code Review': 'df73e18b', Testing: 'df73e18b',
};

export function validateDryRun(value) {
  if (!['true', 'false'].includes(value)) throw new Error('Explicit dry-run boolean required');
  return value === 'true';
}

export function validateTransition({ issue, target, evidence, actor }) {
  if (actor !== 'Rohithnairreghu005') throw new Error('Owner authorization required');
  if (!Number.isInteger(issue) || issue < 1 || issue > 14) throw new Error('Issue outside approved backlog');
  if (!Object.hasOwn(boardOptions, target)) throw new Error('Unsupported transition; Done requires verified human merge');
  if (typeof evidence !== 'string' || evidence.trim().length < 20 || evidence.length > 2000) throw new Error('Evidence required');
  if ([1, 7, 14].includes(issue) && target !== 'Backlog') throw new Error('Human-only task');
  return boardOptions[target];
}
