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
//quote
app.route('/', quotesRoute);
app.route('/', quoteRoute);
app.route('/', lastQuoteRoute);
app.route('/', randomQuoteRoute);
//tag
app.route('/', tagRoute);
app.route('/', tagsRoute);
//author
app.route('/', authorsRoute);
app.route('/', authorRoute);
//create
app.route('/', createRoute);
//error
app.route('/', errorRoute);

export default app;
