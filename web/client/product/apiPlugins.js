/**
 * Copyright 2017, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */


export default {
    plugins: {
        // Plugins funcionando
        BurgerMenu: require('../plugins/BurgerMenu').default,
        Cookie: require('../plugins/Cookie').default,
        Map: require('../plugins/Map').default, //mapa
        MapLoading: require('../plugins/MapLoading'),
        Toolbar: require('../plugins/Toolbar').default, //barra de ferramentas (lateral interna) (mover posição)
        SidebarMenu: require('../plugins/SidebarMenu').default, //barra lateral (nesseária para aparecr alguns puglins)
        Measure: require('../plugins/Measure').default, //Régua - depende de SidebarMenu
        TOC: require('../plugins/TOC').default, //árvore de elementos (camadas)
        LongitudinalProfileTool: require('../plugins/LongitudinalProfileTool'),
        DrawerMenu: require('../plugins/DrawerMenu').default, //necessário para o TOC
        AddGroup: require('../plugins/AddGroup').default, //add grupos de camadas no TOC
        BackgroundSelector: require('../plugins/BackgroundSelector').default, //seletor de fundo
        Identify: require('../plugins/Identify').default, //identificador de dados de feições
        Locate: require('../plugins/Locate').default, //exibe localização atual do usuário
        FullScreen: require('../plugins/FullScreen').default, //permite tela cheia
        ZoomIn: require('../plugins/ZoomIn').default,
        ZoomOut: require('../plugins/ZoomOut').default,
        StreetView: require( '../plugins/StreetView').default,
        ZoomAll: require('../plugins/ZoomAll').default,
        MetadataExplorer: require('../plugins/MetadataExplorer').default, //busca de catálogos
        Expander: require( '../plugins/Expander').default,
        GoFull: require('../plugins/GoFull'),
        Search: require('../plugins/Search').default, //busca do osm não funciona
        OmniBar: require( '../plugins/OmniBar').default, //causando problema
        SettingsPlugin: require('../plugins/Settings').default, //Config de exibição
        MousePosition: require('../plugins/MousePosition').default, //coordenada de onde o mouse estar
        Footer: require('../plugins/MapFooter').default, //barra inferior
        CRSSelector: require('../plugins/CRSSelector').default,//seleciona o datum
        History: require('../plugins/History').default,//desfaz ação,
        StyleEditor: require('../plugins/StyleEditor').default

    },
    requires: {
        ReactSwipe: require('react-swipeable-views').default,

        SwipeHeader: require('../components/data/identify/SwipeHeader').default
    }
};

