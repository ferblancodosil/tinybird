const utils = await import('../utils.js');
const { executeQuery } = await import('../service.js')
export const TINYTABLE_CLASS = 'tinytable'
const instances = [];
export class TinybirdTable {
  constructor(id, original, api = {}) {
    this.id = id;
    this.original = original;
    this.query = this.original.getAttribute('query');
    if (![...this.original.classList].includes(TINYTABLE_CLASS)) this.original.classList.add(TINYTABLE_CLASS);
    this.thead = utils.create('thead');
    this.tbody = utils.create('tbody');
    this.original.appendChild(this.thead);
    this.original.appendChild(this.tbody);
    this.api = api;
    this.validateFields()
  }

  validateFields () {
    if (!this.query) throw new Error('Not defined query attribute')
    if (!this.api.getHeaders) throw new Error('Necessary implement api.getHeaders functions')
    if (!this.api.getRows) throw new Error('Necessary implement api.getHeaders functions')
  }

  refreshData () {
    const promises = []
    promises.push(this.printHeaders());
    promises.push(this.printRows());
    return Promise.all(promises)
  }

  async printHeaders () {
    if (!this.api.getHeaders) throw new Error('Necessary implement api.getHeaders functions')
    const headers = await this.api.getHeaders(this)
    const theader = headers.map(label => `<th scope="col">${label}</th>`).join('')
    this.thead.innerHTML = theader
  }

  async printRows () {
    if (!this.api.getRows) throw new Error('Necessary implement api.getHeaders functions')
    const elementsPromises = []
    elementsPromises.push(this.api.getHeaders(this))
    elementsPromises.push(this.api.getRows(this))
    const elements = await Promise.all(elementsPromises)
    const tbody = elements[1].map(row => {
      const tds = elements[0].map(item => `<td scope="row" data-label="${item}">${row[item]}</td>`).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    this.tbody.innerHTML = tbody
  }
}
const getInstances = () => {
  if (!instances.length) {
    Array.from(document.querySelectorAll('[tinybird-table]')).forEach(el => {
      const instance = new TinybirdTable(utils.randomString(8), el, {
        getHeaders: async (table) => {
          const response = await executeQuery(table.query)
          return response.meta.map(e => e.name)
        },
        getRows: async (table) => {
          const response = await executeQuery(table.query)
          return response.data
        }
      })
      instances.push(instance);
    });
  }
  return instances;
}

export const load = async () => {
  utils.importCSS('/components/table/index.css')
  const tableInstances = await getInstances()
  tableInstances.forEach(table => {
    table.refreshData();
  });
  return tableInstances
}
