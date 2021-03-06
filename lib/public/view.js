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

import { h, switchCase } from '/js/src/index.js';
import NavBar from './components/NavBar/index.js';
import GeneralOverview from './views/Overview/General/page.js';
import DetailsView from './views/Overview/Details/page.js';

/**
 * Main view layout
 * @param {object} model - representing current application state
 * @return {vnode} application view to be drawn according to model
 */
export default (model) => {
    const navigationPages = {
        home: GeneralOverview,
    };

    const subPages = {
        entry: DetailsView,
    };

    return [
        h('.flex-column.absolute-fill', [
            NavBar(model, navigationPages),
            content(model, { ...navigationPages, ...subPages }),
        ]),
    ];
};

/**
 * Page content
 * @param {Object} model Pass the model object to the child
 * @param {Object} pages Pass the pages to the switchcase
 * @returns {vnode} Returns a vnode to render the pages
 */
const content = (model, pages) =>
    h('.p4', switchCase(model.router.params.page, pages)(model));
