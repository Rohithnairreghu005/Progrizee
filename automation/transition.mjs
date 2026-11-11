import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
import { validateTransition, validateDryRun } from './transitions.mjs';

const issue = Number(process.env.ISSUE_NUMBER);
const target = process.env.TARGET_STATUS;
const evidence = process.env.TRANSITION_EVIDENCE;
const dryRun = validateDryRun(process.env.DRY_RUN);
const option = validateTransition({ issue, target, evidence, actor: process.env.GITHUB_ACTOR });
const gh = args => JSON.parse(execFileSync('gh', args, { encoding: 'utf8', maxBuffer: 2_000_000 }));
const items = gh(['project', 'item-list', '2', '--owner', 'Rohithnairreghu005', '--format', 'json', '--limit', '100']);
const item = items.items.find(entry => entry.content?.number === issue && entry.content?.repository === 'Rohithnairreghu005/Progrizee');
if (!item) throw new Error('Project item missing; owner must add issue');
if (dryRun) {
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `DRY RUN: issue #${issue}, current ${item.status}, requested ${target}. Read access verified; write access remains unverified. No board mutation.\n`);
  process.exit(0);
}
if (!process.env.GH_ISSUE_TOKEN) throw new Error('Issue handoff token required before mutation');
const comment = body => execFileSync('gh', ['api', '--method', 'POST', `repos/Rohithnairreghu005/Progrizee/issues/${issue}/comments`, '--raw-field', `body=${body}`], { env: { ...process.env, GH_TOKEN: process.env.GH_ISSUE_TOKEN }, stdio: 'pipe' });
comment(`HANDOFF INTENT\nIssue: #${issue}\nAgent: PM / owner-approved coordinator\nFrom: ${item.status}\nTo: ${target}\nEvidence: ${evidence}\nRun: https://github.com/Rohithnairreghu005/Progrizee/actions/runs/${process.env.GITHUB_RUN_ID}\nBoard update: pending`);
try {
execFileSync('gh', ['project', 'item-edit', '--id', item.id, '--project-id', 'PVT_kwHOCr2ZKs4BrMk4', '--field-id', 'PVTSSF_lAHOCr2ZKs4BrMk4zhpgWrI', '--single-select-option-id', option], { stdio: 'pipe' });
} catch {
  comment(`BOARD_UPDATE_REQUIRED: ${target}\nIssue: #${issue}\nBoard mutation failed; see workflow run. No successful transition claimed.`);
  throw new Error('Board mutation failed');
}
comment(`HANDOFF CONFIRMED\nIssue: #${issue}\nFrom: ${item.status}\nTo: ${target}\nActor: ${process.env.GITHUB_ACTOR}\nEvidence: ${evidence}\nChecks: board API mutation succeeded; application tests not run by coordinator.\nNext owner: Product Owner`);
appendFileSync(process.env.GITHUB_STEP_SUMMARY, `Issue #${issue} board mutation confirmed. Status: ${target}.\n`);
