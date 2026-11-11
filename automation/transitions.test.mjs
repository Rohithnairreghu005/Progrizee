import test from 'node:test';
import assert from 'node:assert/strict';
import { validateTransition } from './transitions.mjs';

const transition = { issue: 2, target: 'In Progress', evidence: 'Owner reviewed issue implementation plan.', actor: 'Rohithnairreghu005' };
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
