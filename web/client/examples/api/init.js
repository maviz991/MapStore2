// Arquivo: init.js - VERSÃO FINAL PARA CARREGAR O MAPA 15

/*eslint-disable */
function init() {
    /*eslint-enable */
        
        // 1. IGNORAMOS a lógica de ler da URL. Nós definimos o caminho aqui.
       // const urlDoNossoMapa = "/rest/geostore/data/15"; // Caminho para o seu mapa 15
    
        // 2. ADICIONAMOS nossa lista de plugins COMPLETA
        const nossosPlugins = {
            "desktop": [
                "Map", "Toolbar", "DrawerMenu", "ZoomIn", "ZoomOut", "ZoomAll",
                "TOC", "Identify", "Measure", "Settings", "FullScreen",
                "MetadataExplorer", "BackgroundSelector", "SidebarMenu", 
                "MousePosition", "MapFooter", "Locate", "Search", "Print", 
                "CRSSelector", "ScaleBox"
            ]
        };
        
        /*eslint-disable */
        MapStore2.create('container', {
            // 3. PASSAMOS a URL do nosso mapa diretamente
                configUrl: "./rest/geostore/data/15",
                originalUrl: "./#/viewer/15",
    
            // 4. FORÇAMOS a nossa lista de plugins, em vez de deixar a API decidir
            plugins: nossosPlugins,
    
            theme: {
                path: '../../dist/themes'
            }
        });
        
        // 5. REMOVEMOS os `addEventListener` para evitar erros.
    }
    /*eslint-enable */