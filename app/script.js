document.getElementById('csvFile').addEventListener('change', onAddFile)

/**
 * Cette fonction est appeller lors de l'insertion d'un fichier
 * Il faut recuperer le contenu du fichier sous forme de texte
 * Reduire le texte en utilisant la fonction prepareStringData
 * Faire un appel à l'API avec la fonction call API
 * Afficher les visualisations avec la fonction generateCharts.
 * @param {*} datas 
 */
async function onAddFile(event) {
    
}

function prepareStringData(data) {
    const arrayLines = data.split('\n')
    const first = arrayLines.slice(0, 50)
    return first.join('\n')
}

/**
 * Cette fonction va récuperer une partie du contenu du fichier et faire une requête à l'API
 * @param {*} datas 
 */
async function callApi (strData) {
}

/**
 * Cette fonction va recuperer les resultats renvoyés par l'API
 * Et génerer les charts sur la page html via chart.js
 * @param {*} datas 
 */
function createCharts(datas) {

}
