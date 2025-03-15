import { resmsg } from '@estarlincito/utils';

import { isNumber } from './zod';

const getPagination = (url: URL) => {
  let offset: number;
  let limit: number;

  const offsetParam = url.searchParams.get('offset');
  const limitParam = url.searchParams.get('limit');

  try {
    offset = offsetParam ? isNumber.parse(offsetParam) : 0;
    limit = limitParam ? isNumber.parse(limitParam) : 6;
    limit = Math.max(0, limit);
    limit = Math.min(6, limit);
    offset = Math.max(0, offset);

    return { limit, offset, success: true };
  } catch {
    return {
      error: resmsg({
        code: 400,
        message: 'offset or limit not provided or invalid type.',
        success: false,
      }),

      success: false,
    };
  }
};

export default getPagination;
