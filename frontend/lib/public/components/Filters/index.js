import { h } from '/js/src/index.js';

const FILTERS_LIMITS = 5;
/**
 * Checkbox filter
 * @param {Object} model
 * @param {Array} tags
 * @return {vnode}
 */
const checkboxFilter = (model, tags) => {
  const checkboxes = Object.entries(tags).map(([tag, count], index) =>
    h('.form-check', [
      h('input.form-check-input', {
        onclick: e => {
          const isChecked = e.target.checked;
          !isChecked
            ? model.overview.removeFilter(tag)
            : model.overview.addFilter(tag);
        },
        id: `filtersCheckbox${index + 1}`,
        type: 'checkbox',
      }),
      h('label.flex-row.items-center.form-check-label', {
        for: `filtersCheckbox${index + 1}`,
      }, tag, h('.f7.mh1.gray-darker', `(${count})`)),
    ]));

  return checkboxes.length > FILTERS_LIMITS
    ? h('.form-group', [
      ...checkboxes.slice(0, FILTERS_LIMITS),
      h('button.btn.btn-primary.mv1', {
        onclick: () => console.log('TODO'),
      }, 'Meer opties'),
      ...checkboxes.slice(FILTERS_LIMITS),
    ])
    : h('.form-group', checkboxes);
};

/**
 * Render the filters
 * @param {Object} model
 * @param {Array} tags
 * @return {vnode}
 */
const filters = (model, tags) =>
  h('.w-25.shadow-level1.p2', [
    h('.f3', 'Filters'),
    h('.f4', 'Tags'),
    checkboxFilter(model, tags),
  ]);

export default filters;
