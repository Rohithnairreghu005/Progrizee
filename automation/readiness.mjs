import { readFileSync } from 'node:fs';
import { assess } from './policy.mjs';

const issues = JSON.parse(readFileSync(process.argv[2], 'utf8'));
console.log('# Heard AI readiness\n\nExecution disabled. Model spend: $0. No board or issue mutations.\n');
for (const issue of issues.sort((first, second) => first.number - second.number)) {
  console.log(`- #${issue.number}: ${assess(issue)}`);
}
