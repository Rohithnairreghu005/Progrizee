import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { validateTransition } from './transitions.mjs';

const issue = Number(process.env.ISSUE_NUMBER);
const target = process.env.TARGET_STATUS;
const evidence = process.env.TRANSITION_EVIDENCE;
const option = validateTransition({ issue, target, evidence, actor: process.env.GITHUB_ACTOR });
const gh = args => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 2_000_000 }));
const items = gh(['project', 'item-list', '2', '--owner', 'Rohithnairreghu005', '--format', 'json', '--limit', '100']);
const item = items.items.find(entry => entry.content?.number === issue && entry.content?.repository === 'Rohithnairreghu005/Progrizee');
if (!item) throw new Error('Project item missing; owner must add issue');
if (process.env.DRY_RUN === 'true') {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `DRY RUN: issue #${issue}, current ${item.status}, requested ${target}. No board mutation.\n`);
  process.exit(0);
}
execFileSync('gh', ['project', 'item-edit', '--id', item.id, '--project-id', 'PVT_kwHOCr2ZKs4BrMk4', '--field-id', 'PVTSSF_lAHOCr2ZKs4BrMk4zhpgWrI', '--single-select-option-id', option], { stdio: 'pipe' });
appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Issue #${issue} board mutation confirmed. Status: ${target}.\n`);
