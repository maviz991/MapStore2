/*Script de localizar camadas no mapa para o SGT*/


    function buscarTerrenoNoMapa() {

        // 1. Ler o ID da URL
        const urlParams = new URLSearchParams(window.location.search);
        const idTerreno = urlParams.get('idTerreno');

        // Se não houver ID na URL, não fazemos nada
        if (!idTerreno) {
            console.log("Nenhum ID de terreno encontrado na URL. Carregando mapa padrão.");
            return;
        }

        console.log("Buscando terreno com ID:", idTerreno);

        // 2. Montar a URL da requisição WFS para o GeoServer
        // IMPORTANTE: Substitua os valores abaixo pelos seus
        const workspace = "teste_docker";
        const layerName = "SP_Municipios_2023.shp";
        const idField = "CD_MUN"; // O nome da coluna do ID no seu banco de dados

        // Usamos o proxy do MapStore para evitar problemas de CORS
        const wfsUrl = `/mapstore/proxy/?url=${encodeURIComponent(
            `http://localhost:8282/geoserver/${workspace}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${workspace}:${layerName}&outputFormat=application/json&CQL_FILTER=${idField}='${idTerreno}'`
        )}`;

        // 3. Fazer a requisição ao GeoServer
        fetch(wfsUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na rede ou na resposta do WFS.');
                }
                return response.json(); // Converte a resposta para JSON
            })
            .then(geojsonData => {
                // 4. Processar a resposta GeoJSON
                if (!geojsonData || !geojsonData.features || geojsonData.features.length === 0) {
                    alert("Terreno com ID " + idTerreno + " não encontrado.");
                    return;
                }

                const feature = geojsonData.features[0];
                const extent = geojsonData.bbox; // O GeoJSON já vem com a extensão (bounding box)

                // 5. Disparar ações na API do MapStore2
                console.log("Terreno encontrado. Dando zoom e destacando.");

                // Ação para dar zoom na extensão do terreno
                // A extensão vem no formato [minx, miny, maxx, maxy]
                MapStore2.actions.map.zoomToExtent(extent, "EPSG:4326"); // IMPORTANTE: use o CRS correto do seu BBOX

                // Ação para destacar o terreno
                // Adicionamos a feição a uma camada de anotações/desenho temporária
                MapStore2.actions.draw.addFeatures([feature]);
                MapStore2.actions.draw.setStyle({
                    color: '#ff0000', // Vermelho
                    opacity: 0.5,
                    fillColor: '#ff0000',
                    fillOpacity: 0.2
                });

            })
            .catch(error => {
                console.error("Falha ao buscar ou processar o terreno:", error);
                alert("Ocorreu um erro ao tentar localizar o terreno no mapa.");
            });
        }


        // Precisamos esperar o MapStore estar totalmente carregado antes de rodar nossa função.
        // A melhor forma é ouvir a ação 'MAP_CONFIG_LOADED'.
        // Supondo que a sua API expõe o objeto `store` do Redux em `window.MapStore2.store`
        let mapLoaded = false;
        window.MapStore2.store.subscribe(() => {
        const state = window.MapStore2.store.getState();
        // A chave 'loading' em 'map' vai para 'false' quando o mapa carrega
        if (!mapLoaded && state.map && state.map.loading === false) {
            mapLoaded = true;
            buscarTerrenoNoMapa();
        }
    });
                
