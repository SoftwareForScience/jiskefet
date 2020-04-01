import { Observable } from '/js/src/index.js';

/**
 * Model representing handlers for homePage.js
 */
export default class Overview extends Observable {
  /**
   * @param {Object} model
   */
  constructor(model) {
    super();
    this.model = model;
    this.date = new Date().toDateString();
    this.filterCriteria = [];
    this.data = [
      {
        authorID: 'Batman',
        title: 'Run1',
        creationTime: this.date,
        tags: ['Tag1', 'Tag2'],
      },
      {
        authorID: 'Joker',
        title: 'Run2',
        creationTime: this.date,
        tags: ['Tag2'],
      },
      {
        authorID: 'Anonymous',
        title: 'Run5',
        creationTime: this.date,
        tags: ['Tag3'],
      },
    ];
    this.filtered = [...this.data];
    this.headers = ['ID', 'Author ID', 'Title', 'Creation Time'];
  }
  /**
   * @returns {Array} headers
   */
  getHeaders() {
    return this.headers;
  }

  /**
   * @returns {Array} subentries
   */
  getTableData() {
    const subentries = this.filtered.map(entry => {
      const filter = Object.keys(entry).map(subkey => {
        if (subkey !== 'tags') {
          return entry[subkey];
        }
      });

      return filter;
    });

    return subentries;
  }

  /**
 * Add filter to the selection
 * @param {string} tag
 */
  addFilter(tag) {
    this.filterCriteria = [...this.filterCriteria, tag];
    this.getFilteredData();
  }

  /**
 * Remove filter from the selection
 * @param {string} condition
 */
  removeFilter(condition) {
    this.filterCriteria = this.filterCriteria.filter(tag => tag !== condition);
    this.getFilteredData();
  }

  /**
 * Filter the data
 */
  getFilteredData() {
    this.filterCriteria.length !== 0
      ? this.filterByTags()
      : (this.filtered = [...this.data]);

    this.notify();
  }
  /**
   * Filter data by tags if applicable
   */
  filterByTags() {
    this.filtered = this.data
      .map(entry => {
        let match = this.checkExistingTag(entry);

        if (match) {
          return entry;
        }

        return null;
      })
      .filter(entry => entry !== null);
  }
  /**
   * Check for an existing tag
   * @param {object} entry
   * @return {bool}
   */
  checkExistingTag(entry) {
    const check = this.filterCriteria.map(tag => {
      const match = entry.tags.includes(tag);
      if (match) {
        return 'Match';
      }
      return 'No Match';
    });

    return check.includes('Match');
  }

  /**
 * Counts the tags with their total appearances
 * @return {object}
 */
  getTagCounts() {
    return this.data.reduce((accumulator, currentValue) => {
      currentValue.tags.forEach(tag => {
        accumulator[tag] = (accumulator[tag] || 0) + 1;
      });
      return accumulator;
    }, {});
  }
}
