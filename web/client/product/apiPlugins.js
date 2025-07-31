/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


export default {
    plugins: {
        // Plugins essenciais
        MapPlugin: require('../plugins/Map').default,
        ToolbarPlugin: require('../plugins/Toolbar').default,
        DrawerMenuPlugin: require('../plugins/DrawerMenu').default,

        // Plugins que você quer adicionar
        SidebarMenu: require('../plugins/SidebarMenu').default,
        TOCPlugin: require('../plugins/TOC').default,
        SearchPlugin: require('../plugins/Search').default,
        SearchByBookmarkPlugin: require('../plugins/SearchByBookmark').default,
        Measure: require('../plugins/Measure').default,
        BackgroundSelector: require('../plugins/BackgroundSelector').default,
        SettingsPlugin: require('../plugins/Settings').default,
        IdentifyPlugin: require('../plugins/Identify').default,
        Locate: require('../plugins/Locate').default,
        FullScreenPlugin: require('../plugins/FullScreen').default,
        ZoomInPlugin: require('../plugins/ZoomIn').default,
        ZoomOutPlugin: require('../plugins/ZoomOut').default,
        MousePosition: require('../plugins/MousePosition').default,
        MapFooter: require('../plugins/MapFooter'),
        StreetView: require( '../plugins/StreetView').default,



        ZoomAllPlugin: require('../plugins/ZoomAll').default,
        AddGroup: require('../plugins/AddGroup').default,
        
        // O plugin do Catálogo
        MetadataExplorer: require('../plugins/MetadataExplorer').default
    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,

        SwipeHeader: require('../components/data/identify/SwipeHeader').default
    }
};
