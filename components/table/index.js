let utils
export const TINYTABLE_CLASS = 'tinytable'
export class TinybirdTable {
  constructor(id, original, api = {}) {
    this.id = id;
    this.original = original;
    if (![...this.original.classList].includes(TINYTABLE_CLASS)) this.original.classList.add(TINYTABLE_CLASS);
    this.thead = utils.create('thead');
    this.tbody = utils.create('tbody');
    this.original.appendChild(this.thead);
    this.original.appendChild(this.tbody);
    this.api = api;
    this.printHeaders();
    this.printRows();
  }

  async printHeaders () {
    if (!this.api.getHeaders) throw new Error('Necessary implement api.getHeaders functions')
    const headers = await this.api.getHeaders()
    const theader = headers.map(label => `<th scope="col">${label}</th>`).join('')
    this.thead.innerHTML = theader
  }

  async printRows () {
    if (!this.api.getRows) throw new Error('Necessary implement api.getHeaders functions')
    const elementsPromises = []
    elementsPromises.push(this.api.getHeaders())
    elementsPromises.push(this.api.getRows())
    const elements = await Promise.all(elementsPromises)
    const tbody = elements[1].map(row => {
      const tds = elements[0].map(item => `<td scope="row" data-label="${item}">${row[item]}</td>`).join('')
      return `<tr>${tds}</tr>`
    }).join('')
    this.tbody.innerHTML = tbody
  }

  createElements() {
    /* this.wrapper = utils.create('div', '<div class="select" role="combobox" aria-expanded="false" aria-has-popup="listbox">');
    this.input = utils.create('<input aria-autocomplete="list" autocomplete="off">');
    this.dropdown = utils.create('<ul class="select__dropdown" role="listbox" tabindex="-1">'); */
  }
}


async function load() {
  utils = await import('../utils.js');
  utils.importCSS('/components/table/index.css')
  const response = {
    "meta": [
      {
        "name": "vendorid",
        "type": "Int16"
      },
      {
        "name": "passenger_count",
        "type": "Int16"
      }
    ],
    "data": [
      {
        "vendorid": 2,
        "passenger_count": 4
      },
      {
        "vendorid": 1,
        "passenger_count": 1
      },
      {
        "vendorid": 1,
        "passenger_count": 1
      }
    ],
    "rows": 3,
    "rows_before_limit_at_least": 4,
    "statistics": {
      "elapsed": 0.006693503,
      "rows_read": 4,
      "bytes_read": 16
    }
  }
  Array.from(document.querySelectorAll('[tinybird-table]')).forEach(el => {
    const tableInstance = new TinybirdTable(utils.randomString(8), el, {
      getHeaders: () => response.meta.map(e => e.name),
      getRows: () => response.data
    });
  });
}

load();
