/* callterreno.js - VERSÃO PARA TESTE LOCAL DIRETO (SEM PROXY) */

function buscarTerrenoNoMapa(idTerreno) {

    if (!idTerreno) {
        alert("Por favor, digite um ID para buscar.");
        return;
    }
    console.log("Buscando terreno com ID:", idTerreno);

    // Configuração da camada
    const workspace = "teste_docker";
    const layerName = "SP_Municipios_2023.shp";
    const idField = "CD_MUN";

    // =========================================================================
    // ALTERAÇÃO PRINCIPAL: Chamada direta ao GeoServer
    // =========================================================================
    // Construímos a URL completa para o GeoServer, que o SEU NAVEGADOR consegue acessar.
    // Isso contorna completamente o proxy do MapStore para fins de teste.
    const wfsUrl = `http://localhost:8282/geoserver/${workspace}/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=${workspace}:${layerName}&outputFormat=application/json&CQL_FILTER=${idField}='${idTerreno}'`;
    //const wfsUrl = `http://localhost:8282/geoserver/${workspace}/wfs?service=wfs&version=2.0.0&request=GetFeature&typeNames=${workspace}:${layerName}:featuretype&featureID=${idField}='${idTerreno}'`;
    console.log("Fazendo requisição direta para:", wfsUrl);

    // Fazer a requisição direta
    fetch(wfsUrl)
        .then(response => {
            if (!response.ok) {
                console.error("Erro na resposta do WFS:", response);
                throw new Error('Erro na rede ou na resposta do WFS. Verifique o console.');
            }
            return response.json();
        })
        .then(geojsonData => {
            if (!geojsonData || !geojsonData.features || !geojsonData.features.length === 0) {
                alert("Município com ID " + idTerreno + " não encontrado.");
                return;
            }

            const feature = geojsonData.features[0];
            const extent = geojsonData.bbox;
            const crs = geojsonData.crs.properties.name.split('::')[1];

            console.log("Município encontrado. Dando zoom e destacando.");

            MapStore2.triggerAction({
                type: 'ZOOM_TO_EXTENT',
                extent: extent,
                crs: crs
            });

            MapStore2.triggerAction({
                type: 'DRAW_FEATURES',
                features: [feature],
                options: { style: { color: '#ff0000', fillColor: '#ff0000', fillOpacity: 0.3 } }
            });
        })
        .catch(error => {
            console.error("Falha ao buscar ou processar o terreno:", error);
            alert("Ocorreu um erro ao tentar localizar o terreno no mapa. Verifique se o GeoServer está permitindo CORS (instruções na conversa).");
        });
}