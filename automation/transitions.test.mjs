import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTransition, validateDryRun } from './transitions.mjs';

const transition = { issue: 2, target: 'In Progress', evidence: 'Owner reviewed issue implementation plan.', actor: 'Rohithnairreghu005' };
test('writes require explicit false; missing and malformed input fail closed', () => {
  assert.equal(validateDryRun('true'), true);
  assert.equal(validateDryRun('false'), false);
  for (const value of [undefined, '', 'False', '0', false]) assert.throws(() => validateDryRun(value));
});
test('owner transition maps to verified field option', () => {
  assert.equal(validateTransition(transition), '47fc9ee4');
});
test('unauthorized actors and Done are rejected', () => {
  assert.throws(() => validateTransition({ ...transition, actor: 'contributor' }));
  assert.throws(() => validateTransition({ ...transition, target: 'Done' }));
});
test('missing evidence and human decisions are rejected', () => {
  assert.throws(() => validateTransition({ ...transition, evidence: '' }));
  assert.throws(() => validateTransition({ ...transition, issue: 1 }));
});
