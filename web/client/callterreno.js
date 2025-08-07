function buscarTerrenoNoMapa(idTerreno) {
    if (!idTerreno) {
        alert("Por favor, digite um ID para buscar.");
        return;
    }

    console.log("Buscando terreno com ID:", idTerreno);

    const workspace = "teste_docker";
    const layerName = "SP_Municipios_2023.shp";
    const idField = "CD_MUN";

    const wfsUrl = `http://localhost:8282/geoserver/${workspace}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${workspace}:${layerName}&outputFormat=application/json&CQL_FILTER=${idField}=${idTerreno}`;

    fetch(wfsUrl)
        .then(response => {
            if (!response.ok || !response.headers.get("content-type")?.includes("application/json")) {
                throw new Error('A resposta do GeoServer não foi um GeoJSON válido.');
            }
            return response.json();
        })
        .then(geojsonData => {
            if (!geojsonData.features || geojsonData.features.length === 0) {
                alert("Município com ID " + idTerreno + " não encontrado.");
                return;
            }

            const feature = geojsonData.features[0];
            const vectorLayerId = "highlighted-terreno-layer";

            // Limpa camada anterior, se existir
            MapStore2.triggerAction({
                type: 'REMOVE_LAYER',
                id: vectorLayerId
            });

            // Adiciona camada vetorial temporária com o GeoJSON retornado
            MapStore2.triggerAction({
                type: 'ADD_LAYER',
                layer: {
                    id: vectorLayerId,
                    name: "Terreno buscado",
                    title: "Terreno buscado",
                    type: "vector",
                    visibility: true,
                    hideLoading: true,
                    features: geojsonData.features,
                    style: {
                        color: "#FF0000",
                        weight: 3,
                        opacity: 1,
                        fillColor: "#FFAAAA",
                        fillOpacity: 0.4
                    }
                }
            });

            // Calcula o bbox e dá zoom
            const bbox = turf.bbox(feature); // [minX, minY, maxX, maxY]
            MapStore2.triggerAction({
                type: 'ZOOM_TO_EXTENT',
                extent: bbox,
                crs: "EPSG:4326" // ajuste se estiver usando outro CRS
            });

        })
        .catch(error => {
            console.error("Erro ao buscar ou exibir terreno:", error);
            alert("Erro ao localizar o terreno no mapa.");
        });
}
