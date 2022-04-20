const { TOKEN, BASE_URL, FILTER_PARAMETERS } = await import('./env.js');
const utils = await import('./utils.js');
const _cache = {};

const generateUrl = (query) => {
  if (!query) throw new Error('Necessary query to request')
  const filters = utils.getUrlParams(FILTER_PARAMETERS);
  const from = utils.getUrlParam('from') || 0;
  const to = utils.getUrlParam('to') || 50;
  console.info(filters)
  if (filters.length) query = query.replace(':where', `where ${filters.join(' AND ')}`); // where filters
  query = query.replace(':where', ''); // remove if not exist where params
  query = query.replace(':limit', `limit ${from}, ${to}`) // add limit params
  query = query.replace(':limit', '')// remove if not exist limit params
  return `${BASE_URL}${query}`
}

export const executeQuery = async (query) => {
  let url = generateUrl(query)
  if (!_cache[url]) {
    _cache[url] = fetch(new URL(url), {
      headers: {
        Authorization: TOKEN
      }
    })
      .then(r => r.json())
      .then(r => r)
      .catch(e => e.toString())
  }
  const result = await _cache[url]
  if (!result.data) {
    console.error(result)
    throw new Error(`there is a problem running the query`);
  } else {
    return result
  }
}
