import { ApiResponse } from '@estarlincito/utils';
import { jwtVerify as jwtVerify_ } from 'jose';
import { z } from 'zod';

const jwtVerify = async (session: string | null | File, secretKey: string) => {
  const key = new TextEncoder().encode(secretKey);

  try {
    const session_ = z.string().parse(session);
    const { payload } = await jwtVerify_(session_, key, {
      algorithms: ['HS256'],
    });

    return payload;
  } catch {
    return ApiResponse.json({
      message: 'There was an issue with your session.',
      status: 401,
      success: false,
    });
  }
};

export default jwtVerify;
