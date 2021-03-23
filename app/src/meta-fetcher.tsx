import * as Lookup from './lookup';
import { Platform } from 'react-native';
import { expansionPack } from './storage';

const endpoint: string =
  'https://narratemyway-default-rtdb.europe-west1.firebasedatabase.app/meta-packs.json?';

async function fetchExpansionPackMetadata(code: string) {
  const lookupType = Platform.OS === 'ios' ? 'UUID' : 'MAC';

  fetch(`${endpoint}orderBy="${lookupType}"&equalTo="${code}"`)
    .then((response) => response.json())
    .then((json) => {
      Object.keys(json).forEach((key) => {
        const packInfo = json[key];
        Lookup.checkExpansionPack(packInfo.packId, packInfo.version).then(
          (result: Lookup.ExpansionPackLookupResult) => {
            switch (result._tag) {
              case 'ExpansionPackDownloadRequired':
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
      });
    })
    .catch((error) => console.log(error));
}

async function downloadExpansionPack(url: string) {
  fetch(url)
    .then((response) => response.json())
    .then((expansionPackData: expansionPack) => {
      // Update UUID database
      Lookup.saveExpansionPack(expansionPackData).then((success) => {
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
