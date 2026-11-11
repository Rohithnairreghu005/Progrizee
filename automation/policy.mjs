export function assess(issue) {
  const labels = new Set(issue.labels.map(label => label.name));
  if (!Number.isInteger(issue.number) || issue.number < 1 || issue.number > 14) return 'Outside approved backlog';
  if ([1, 7, 14].includes(issue.number)) return 'Human decision, design, or deployment approval required';
  if (!labels.has('ai:ready') || !labels.has('ai:approved')) return 'Awaiting explicit owner readiness and plan approval';
  if (labels.has('ai:blocked')) return 'Blocked';
  return 'Candidate only: project access, dependencies, credentials and budget still require verification';
}
