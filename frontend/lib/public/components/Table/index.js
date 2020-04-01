import { h } from '/js/src/index.js';

/**
 * Table row header
 * @param {string} header
 * @return {vnode}
 */
const rowHeader = header => [h('th', header)];

/**
 * Table data row
 * @param {object} data
 * @return {vnode}
 */
const rowData = data => [h('td', data)];

export { rowHeader, rowData };
