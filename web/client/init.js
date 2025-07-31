/*eslint-disable */
function init() {
    /*eslint-enable */
        var cfg;
        var cfgUrl;
        var theme;
        var embeddedPlugins;
        var pluginsCfg;
    
        /*eslint-disable */
        cfg = MapStore2.loadConfigFromStorage('mapstore.example.plugins.' + MapStore2.getParamFromRequest('map'));
        cfgUrl = MapStore2.getParamFromRequest('config');
        theme = MapStore2.getParamFromRequest('theme');
        /*eslint-enable */
        
        embeddedPlugins = {
            "desktop": [
                "Map",
                "SidebarMenu",
                "Measure",
                "AddGroup",
                "MousePosition",
                "DrawerMenuPlugin",
                "MapFooter",
                "Toolbar",
                "ZoomAll",
                "Expander",
                "ZoomIn",
                "ZoomOut",
                "ScaleBox",
                "OmniBar",
                "Search",
                "SearchByBookmark",
                "DrawerMenu",
                "MetadataExplorer",
                "Locate",
                "TOC",
                "UndoPlugin",
                "StreetView",
                {
                    "name": "BackgroundSelector",
                    "cfg": {
                        "dimensions": {
                            "side": 65,
                            "sidePreview": 65,
                            "frame": 3,
                            "margin": 5,
                            "label": true,
                            "vertical": false
                        }
                    }
                },
                "Identify",
                "FullScreen"
            ]};
            const configDoMapa = {
                map: { /* ... sua configuração de mapa ... */ },
                MetadataExplorer: { "url": "https://geo.cdhu.sp.gov.br/geoserver/ows?service=WCS&acceptversions=2.0.1&request=GetCapabilities" }
            };
        /*eslint-disable */
        pluginsCfg = cfg && MapStore2.buildPluginsCfg(cfg.pluginsCfg.standard, cfg.userCfg) || embeddedPlugins;
        MapStore2.create('container', {
            plugins: pluginsCfg,
            configUrl: cfgUrl,
            initialState: cfg && cfg.state && {
                defaultState: cfg.state
            } || null,
            style: cfg && cfg.customStyle,
            theme: theme ? {
                theme: theme,
                path: '../../dist/themes'
            } : {
                path: '../../dist/themes'
            }
        });
        MapStore2.onAction('CHANGE_MAP_VIEW', function(action) {
            console.log('ZOOM: ' + action.zoom);
        });
        MapStore2.onStateChange(function(map) {
            console.log('STATE ZOOM: ' + map.zoom);
        }, function(state) {
            return (state.map && state.map.present) || state.map || {}
        });
        MapStore2.onAction("MAP_CONFIG_LOADED", function(action) {
            var layers = action && action.config && action.config.map && action.config.map.layers;
            var layerIndex = layers.findIndex(function(e) {
                return e.name === "nurc:Arc_Sample";
            });
            if (layerIndex >= 0) {
                var layer = layers[layerIndex];
                document.querySelector('#ck').disabled = false;
                document.querySelector('#ck').addEventListener('change', function(event) {
                    MapStore2.triggerAction({
                      type: 'CHANGE_LAYER_PROPERTIES',
                      newProperties: {
                        visibility: event.target.checked
                      },
                      layer: layer.id
                    });
                });
            }
    
        });
        
    }
    