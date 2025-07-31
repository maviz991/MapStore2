// mapstore/web/client/product/custom_embed.jsx

import main from './main';
import pluginsDefinition from './plugins';

const customConfig = {
    initialState: {
        defaultState: {
            map: {
                center: { x: -54, y: -15, crs: 'EPSG:4236' },
                zoom: 4,
                layers: [
                    { type: 'osm', source: 'osm', name: 'OpenStreetMap', title: 'Base Map', visibility: true },
                    { type: 'wms', url: 'http://localhost:8282/geoserver/wms', name: 'docker_teste:sp_uf_2024', title: 'SP State Outline', visibility: true, format: 'image/png', transparent: true }
                ]
            },
            catalog: {
                "url": "http://localhost:8282/geoserver/rest/",
                "type": "wms",
                "title": "Layer Catalog"
            }
        }
    },
    storeOpts: {
        persist: {
            whitelist: ['security']
        }
    }
};

const customPluginsDefinition = {
    ...pluginsDefinition,
    desktop: [
        "MapPlugin", "DrawerMenuPlugin", "IdentifyPlugin", "ZoomInPlugin", "ZoomOutPlugin",
        "ZoomAllPlugin", "BackgroundSelectorPlugin", "MeasurePlugin", "TOCPlugin",
        "SettingsPlugin", "MetadataExplorerPlugin", "FullScreenPlugin", "ToolbarPlugin"
    ]
};

main(customConfig, customPluginsDefinition);