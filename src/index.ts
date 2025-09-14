import { Resuponsu } from 'resuponsu';

import { create } from './lib/create';
import { quotes } from './lib/quotes';
import { update } from './lib/update';

export default {
  async fetch(req, env): Promise<Response> {
    const { pathname } = new URL(req.url);

    if (pathname === '/api/quotes') return quotes({ env, req });
    if (pathname === '/api/create') return create({ env, req });
    if (pathname === '/api/update') return update({ env, req });

    return Resuponsu.json({
      message: 'Page not found.',
      status: 404,
      success: false,
    });
  },
} satisfies ExportedHandler<Env>;
