import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import base from './base.js';

/** ESLint flat config for Next.js apps. */
export default [...base, ...nextVitals, ...nextTypescript];
