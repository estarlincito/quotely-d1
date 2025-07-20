const getPagination = (url: URL, isAdmin: boolean) => {
  const offsetParam = url.searchParams.get('offset') ?? '0';
  const limitParam = url.searchParams.get('limit') ?? '6';

  const offset = Number.isNaN(Number(offsetParam)) ? 0 : parseInt(offsetParam);
  let limit = Number.isNaN(Number(limitParam)) ? 6 : parseInt(limitParam);

  if (isAdmin) {
    return { limit, offset };
  }

  limit = Math.max(0, Math.min(6, limit));
  return { limit, offset };
};

export default getPagination;
