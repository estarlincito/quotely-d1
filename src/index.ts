import { Hono } from 'hono';

import { authorRoute, authorsRoute } from './routes/authors';
import { createRoute } from './routes/create';
import { errorRoute } from './routes/error';
import {
  lastQuoteRoute,
  quoteRoute,
  quotesRoute,
  randomQuoteRoute,
} from './routes/quotes';
import { tagRoute, tagsRoute } from './routes/tags';

const app = new Hono();

/* Quotes Routes */
app.route('/', quotesRoute); // GET /quotes?offset=0&limit=6
app.route('/', quoteRoute); // GET /quote/1
app.route('/', lastQuoteRoute); // GET /last
app.route('/', randomQuoteRoute); // GET /random

/* Tags Routes */
app.route('/', tagRoute); // GET /tag/self-help
app.route('/', tagsRoute); // GET /tags?offset=0&limit=6

/* Authors Routes */
app.route('/', authorsRoute); // GET /authors?offset=0&limit=6
app.route('/', authorRoute); // GET /author/rem

/* Create Routes */
app.route('/', createRoute); // POST /create

/* Error Route */
app.route('/', errorRoute);

export default app;
