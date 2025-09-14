/* eslint-disable no-console */
import { fecchi } from 'fecchi';
import { lenv } from 'lenv';
lenv();

const quote = JSON.stringify({
  addedAt: '2025-09-05T15:47:09.210Z',
  authors: [
    {
      avatar: '',
      bio: {
        en: 'Eladio Carrión is a Puerto Rican musician known for his lyrical style and motivational messages in music.',
        es: 'Eladio Carrión es un músico puertorriqueño conocido por su estilo lírico y mensajes motivacionales en la música.',
      },
      name: 'Eladio Carrión',
    },
  ],
  quote: {
    en: 'Life is too short to complain',
    es: "La vida es muy corta pa' quejarte",
  },
  reference: {
    en: 'Padre Tiempo',
    es: 'Padre Tiempo',
  },
  sourceName: { en: 'Music', es: 'Música' },
  sourceType: { en: 'Lyrics', es: 'Letras' },
  sourceUrl: 'https://lyrics.lyricfind.com/lyrics/eladio-carrion-padre-tiempo',
  tags: [
    { name: { en: 'Motivational', es: 'Motivacional' } },
    { name: { en: 'Life', es: 'Vida' } },
    { name: { en: 'Attitude', es: 'Actitud' } },
  ],
});

const res = await fecchi('http://localhost:8000/api/create', {
  body: quote,
  headers: {
    Authorization: process.env.AUTH,
  },
  method: 'POST',
});

console.log(await res.json());

// node test/create.js
