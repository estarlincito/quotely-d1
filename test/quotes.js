// node --watch test/index.js
import console from 'node:console';

import { fecchi } from 'fecchi';

const res = await fecchi('http://localhost:8000/api/quotes', {
  headers: { 'Accept-Language': 'en', 'X-Page': '3' },
});

console.log(await res.text());
