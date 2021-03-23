import * as Lookup from './lookup';

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
        Lookup.checkExpansionPack(packInfo.pack_id, packInfo.version).then(
          (result: Lookup.ExpansionPackLookupResult) => {
            switch (result._tag) {
              case 'ExpansionPackDownloadRequired':
                console.log(
                  'Download of pack ',
                  packInfo.pack_name,
                  ' is required'
                );
                downloadExpansionPack(packInfo.pack);
                break;
              case 'ExpansionPackDownloadNotRequired':
                console.log('Download not required');
                break;
              case 'ExpansionPackLookupError':
                console.error('Error performing lookup');
            }
          }
        );
        // downloadExpansionPack(packInfo.pack);
      });
    })
    .catch((error) => console.log(error));
}

async function downloadExpansionPack(url: string) {
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      // Update UUID database
      Lookup.saveExpansionPack(json).then((success) => {
        if (success) {
          console.log('Successfuly saved expansion pack!');
        } else {
          console.log('Unable to save expansion pack');
        }
      });
    })
    .catch((error) => console.log(error));
}

export { fetchExpansionPackMetadata };
