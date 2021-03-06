/**
 * This file is part of the ALICE Electronic Logbook v2, also known as Jiskefet.
 * Copyright (C) 2020  Stichting Hogeschool van Amsterdam
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const assert = require('assert');
const puppeteer = require('puppeteer');
const pti = require('puppeteer-to-istanbul');
const { server } = require('../../lib/application');

module.exports = function () {
    // Configure this suite to have a default timeout of 5s
    this.timeout(5000);

    let page;
    let browser;
    let url;

    before(async () => {
        await server.listen();
        browser = await puppeteer.launch();
        page = await browser.newPage();
        await Promise.all([
            page.coverage.startJSCoverage(),
            page.coverage.startCSSCoverage(),
        ]);

        const port = server.address().port;
        url = `http://localhost:${port}`;
    });

    after(async () => {
        const [jsCoverage, cssCoverage] = await Promise.all([
            page.coverage.stopJSCoverage(),
            page.coverage.stopCSSCoverage(),
        ]);

        [...jsCoverage, ...cssCoverage].forEach((element) => {
            element.url = element.url.replace('?', '');
        });

        pti.write([...jsCoverage, ...cssCoverage]);
        await browser.close();
        await server.close();
    });

    it('loads the page successfully', async () => {
        const response = await page.goto(url);
        await page.waitFor(100);

        // We expect the page to return the correct status code, making sure the server is running properly
        assert.equal(response.status(), 200);

        // We expect the page to return the correct title, making sure there isn't another server running on this port
        const title = await page.title();
        assert.equal(title, 'AliceO2 Logbook 2020');
    });

    it('can filter logs dynamically', async () => {
        const checkbox = await page.$('.form-check input');
        const label = await page.$('.form-check label div');

        const id = await page.evaluate((element) => element.id, checkbox);
        const amount = await page.evaluate((element) => element.innerText, label);
        // We expect to have captured the first checkbox in the list
        assert.equal(id, 'filtersCheckbox1');

        await page.click(`#${id}`);
        await page.waitFor(100);

        // We expect the amount of logs in this filter to match the advertised amount in the filters component
        const tableRows = await page.$$('table tr');
        assert.equal(true, tableRows.length - 1 === parseInt(amount.substring(1, amount.length - 1)));

        // Deselect the filter and wait for the changes to process
        await page.click(`#${id}`);
        await page.waitFor(100);
        assert.equal(true, tableRows.length - 1 === parseInt(amount.substring(1, amount.length - 1)));
    });

    it('can navigate to a log detail page', async () => {
        const firstRow = '#row1';
        const firstRowText = await page.$(firstRow + ' td');
        const id = await page.evaluate((element) => element.innerText, firstRowText);

        // We expect the entry page to have the same id as the id from the log overview
        await page.click(firstRow);
        await page.waitFor(100);
        const redirectedUrl = await page.url();
        assert.equal(redirectedUrl, `${url}/?page=entry&id=${id}`);

        // We expect there to be at least one post in this log entry
        const postExists = !!(await page.$('#post1'));
        assert.equal(true, postExists);
    });
};
