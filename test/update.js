/* eslint-disable no-console */
import { fecchi } from 'fecchi';
import { lenv } from 'lenv';
lenv();

const translations = {
  en: {
    id: 1,
    language: 'en',
    quote: 'Life is too short to complain',
  },
  es: {
    id: 1,
    language: 'en',
    quote: "La vida es muy corta pa' quejarte",
  },
};

const res = await fecchi('http://localhost:8000/api/update', {
  body: JSON.stringify(translations['es']),
  headers: {
    Authorization: process.env.AUTH,
  },
  method: 'POST',
});

console.log(await res.json());

// node test/update.js
