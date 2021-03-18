const endpoint: string =
  'https://narratemyway-default-rtdb.europe-west1.firebasedatabase.app/meta-packs.json?orderBy="MAC"&equalTo=';

async function fetchExpansionPackMetadata(uuid: string) {
  fetch(endpoint + '"' + uuid + '"')
    .then((response) => response.json())
    .then((json) => {
      Object.keys(json).forEach((key) => {
        const packInfo = json[key];
        // Check if retrieved meta data has higher version number
        // than currently in database
        // If so then download into database, else do nothing
        downloadExpansionPack(packInfo.pack);
      });
    })
    .catch((error) => console.log(error));
}

async function downloadExpansionPack(url: string) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
        // Update UUID database
    })
    .catch((error) => console.log(error));
}

export { fetchExpansionPackMetadata };
