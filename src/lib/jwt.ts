import { jwtVerify as jwtVerify_ } from 'jose';

const jwtVerify = async (session: string | null | File, secretKey: string) => {
  const key = new TextEncoder().encode(secretKey);

  if (typeof session !== 'string') return null;

  try {
    const { payload } = await jwtVerify_(session, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch {
    return null;
  }
};

export default jwtVerify;
