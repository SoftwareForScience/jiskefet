import { h } from '/js/src/index.js';
import filters from '../../../components/Filters/index.js';
import { rowData, rowHeader } from '../../../components/Table/index.js';

/**
 * Table row header
 * @param {object} model
 * @return {vnode}
 */
const overviewScreen = model => {
  const headers = model.overview.getHeaders();
  const tags = model.overview.getTagCounts();

  return h('.w-75.flex-row', [
    filters(model, tags),
    h('table.table.shadow-level1.mh3', [
      h('tr', [
        headers.map(header => {
          return rowHeader(header);
        }),
      ]),
      model.overview.data.map((entry, index) => {
        return h('tr', [
          rowData(index + 1),
          Object.keys(entry).map(subitem => {
            return rowData(entry[subitem]);
          }),
        ]);
      }),
    ]),
  ]);
};

export default overviewScreen;