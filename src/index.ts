import { Hono } from 'hono';

import {
  authorRoute,
  authorsRoute,
  createRoute,
  errorRoute,
  lastQuoteRoute,
  quotesRoute,
  randomQuoteRoute,
  tagRoute,
  tagsRoute,
} from './routes';

const app = new Hono();
//quote
app.route('/', quotesRoute);
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
