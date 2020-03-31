import { Observable } from "/js/src/index.js";

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
        authorID: "Batman",
        title: "Run1",
        creationTime: this.date,
        tags: ["Tag1", "Tag2"]
      },
      {
        authorID: "Joker",
        title: "Run2",
        creationTime: this.date,
        tags: ["Tag2"]
      },
      {
        authorID: "Anonymous",
        title: "Run5",
        creationTime: this.date,
        tags: ["Tag3"]
      }
    ];
    this.filtered = [...this.data];
    this.headers = ["ID", "Author ID", "Title", "Creation Time"];
  }
  /**
   * @returns Array []
   */
  getHeaders = () => {
    return this.headers;
  };

  /**
   * @returns Array []
   */
  getTableData = () => {
    const subentries = this.filtered.map(entry => {
      const filter = Object.keys(entry).map(subkey => {
        if (subkey !== "tags") {
          return entry[subkey];
        }
      });

      return filter;
    });

    return subentries;
  };

  addFilter = tag => {
    this.filterCriteria = [...this.filterCriteria, tag];
    this.getFilteredData();
  };

  removeFilter = condition => {
    this.filterCriteria = this.filterCriteria.filter(tag => tag !== condition);
    this.getFilteredData();
  };

  getFilteredData = () => {
    this.filterCriteria.length !== 0
      ? this.filterByTags()
      : (this.filtered = [...this.data]);

    this.notify();
  };

  filterByTags = () => {
    this.filtered = this.data
      .map(entry => {
        let match = this.checkExistingTag(entry);

        if (match) {
          return entry;
        }

        return null;
      })
      .filter(entry => entry !== null);
  };

  checkExistingTag = entry => {
    const check = this.filterCriteria.map(tag => {
      const match = entry.tags.includes(tag);
      if (match) {
        return "Match";
      }
      return "No Match";
    });

    return check.includes("Match");
  };

  getTagCounts = () => {
    return this.data.reduce((accumulator, currentValue) => {
      currentValue.tags.forEach(tag => {
        accumulator[tag] = (accumulator[tag] || 0) + 1;
      });
      return accumulator;
    }, {});
  };
}
