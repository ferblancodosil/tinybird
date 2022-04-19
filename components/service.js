const { TOKEN, BASE_URL } = await import('./env.js');
const _cache = {};

const generateUrl = ({ query, filters = [], from = 0, to = 5 } = {}) => {
  if (!query) throw new Error('Necessary query to request')
  if (filters.length) query = query.replace(':where', `where ${filters.join(' AND ')}`); // where filters
  query = query.replace(':where', ''); // remove if not exist where params
  query = query.replace(':limit', `limit ${from}, ${to}`) // add limit params
  query = query.replace(':limit', '')// remove if not exist limit params
  return `${BASE_URL}${query}`
}

export const executeQuery = async (query, { filters = [], from = 0, to = 50 } = {}) => {
  let url = generateUrl({ query, filters, from, to })
  if (!_cache[url]) {
    console.info('execute query', url)
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
