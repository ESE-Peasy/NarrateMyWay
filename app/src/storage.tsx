import * as SQLite from 'expo-sqlite';

import * as nmwTable from '../nmwstandard.json';

// Interface for data
export interface nmwLocation {
  code: string;
  description: string;
  icon: string;
}

export interface uuidLocation {
  nmw: string;
  name: string;
  description: string;
  icon: string;
  website: string;
  expansionPackID: number;
}

export interface expansionPackMeta {
  packId: number;
  packName: string;
  packVersion: number;
  description: string;
  w3w: string;
  organisation: string;
}

export interface expansionPackData {
  uuid: string;
  mac: string;
  nmw: string;
  name: number;
  description: string;
  website: string;
}

// Storage Class
class Storage {
  //
  // local variables
  db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = this.createDb();
  }

  // Create database
  createDb() {
    const db = SQLite.openDatabase('database.db');
    db.transaction((tx) => {
      tx.executeSql('PRAGMA foreign_keys = ON');
    });
    return db;
  }

  // Create and populate database tables
  createTable() {
    this.db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS locationCodes (code string primary key not null, description text, icon text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS versionRecord (id integer primary key not null, version text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expansionPackTable (packId integer primary key not null, packName text, packVersion integer, description text, wtw text, organisation text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS beaconTable (uuid string primary key not null, mac string not null, nmw text, name text, description text, website text, expansionID INTEGER REFERENCES expansionPackTable(id));'
      );

      tx.executeSql('SELECT * FROM versionRecord', [], (_, results) => {
        if (results.rows.length == 0) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);
          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (code, description, icon) VALUES (?,?,?)',
              [value.code, value.description, value.icon]
            );
          });
        } else if (results.rows.item(0) != nmwTable.version) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);

          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (code, description, icon) VALUES (?,?,?)',
              [value.code, value.description, value.icon]
            );
          });
        }
      });
    }, null);
  }

  // Insert expansion pack into the database
  parseExpansionPack(expansionData) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO expansionPackTable (packId, packName, packVersion, description, wtw, organisation) VALUES (?,?,?,?,?,?)',
        [
          expansionData.meta.pack_id,
          expansionData.meta.pack_name,
          expansionData.meta.pack_version,
          expansionData.meta.description,
          expansionData.meta.w3w,
          expansionData.meta.organisation
        ],
        undefined,
        () => {
          return false;
        }
      );
      expansionData.beacons.forEach((beacon) => {
        tx.executeSql(
          'INSERT INTO beaconTable (uuid, mac, nmw, name, description, website, expansionID) VALUES (?,?,?,?,?,?,?)',
          [
            beacon.uuid,
            beacon.mac,
            beacon.nmw,
            beacon.name,
            beacon.description,
            beacon.website,
            expansionData.meta.pack_id
          ],
          undefined,
          () => {
            return false;
          }
        );
      });
    });
    return true;
  }

  deleteExpansionPack(code: number) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM beaconTable WHERE expansionID=?;', [code]);
      tx.executeSql('DELETE FROM expansionPackTable WHERE id=?;', [code]);
    });
  }

  printExpansionPack() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM beaconTable', [], (_, results) => {
        console.log(results.rows);
      });
      tx.executeSql('SELECT * FROM expansionPackTable', [], (_, results) => {
        console.log(results.rows);
      });
    }, null);
  }

  /**
   * Perform a lookup based on a beacon's UUID
   *
   * @param {string} code The UUID to look up.
   * @param {Function} callback Function to call on completion
   * of lookup. The `location` parameter may be `null` if the lookup fails.
   */
  lookupUUID(code: string, callback: (location: uuidLocation) => void) {
    this.db.transaction((tx) => {
      // Lookup in UUID table
      tx.executeSql(
        'SELECT * FROM beaconTable WHERE uuid=?',
        [code],
        (_, results) => {
          const result: uuidLocation = results.rows.item(0);
          if (result == null) {
            callback(result);
            return;
          }
          console.log('lookupUUID result', result);

          // On success lookup icon in NMW codes table
          tx.executeSql(
            'SELECT icon FROM locationCodes WHERE code=?',
            [result.nmw],
            (_, resultsNMW) => {
              result.icon = resultsNMW.rows.item(0).icon;
              console.log('lookupUUID result w/ icon', result);
              callback(result);
            }
          );
        }
      );
    });
    console.log(code);
  }
  // Input location code data
  loadData(data: nmwLocation) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO locationCodes (code, description, icon) VALUES (? ,?, ?)',
        [data.code, data.description, data.icon]
      );
    }, null);
  }

  // Clear storage
  clearStorage() {
    this.db.transaction((tx) => {
      tx.executeSql('DROP TABLE locationCodes;');
      tx.executeSql('DROP TABLE versionRecord;');
      tx.executeSql('DROP TABLE expansionPackTable;');
      tx.executeSql('DROP TABLE beaconTable;');
    });
  }

  // Delete element from location table
  deleteElementLocation(code: string) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM locationCodes WHERE code=?', [code]);
    });
  }

  // Print the version of currently stored data
  printVersionData() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM versionRecord', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  /**
   * Perform a lookup based on a beacon's NMW code
   *
   * @param {string} code The NMW code to look up.
   * @param {Function} callback Function to call on completion
   * of lookup. The `location` parameter may be `null` if the lookup fails.
   */
  lookupNMWCode(code: string, callback: (location: nmwLocation) => void) {
    this.db.transaction((tx) => {
      console.log('here');
      tx.executeSql(
        'SELECT description, icon FROM locationCodes WHERE code=?',
        [code],
        (_, results) => {
          console.log('lookupNMWCode result', results.rows.item(0));
          callback(results.rows.item(0));
        },
        (_, error) => {
          console.log('lookupNMWCode error', error);
        }
      );
    });
  }

  /**
   * Check if an expansion pack exists and if it does, determine the version number
   * of it.
   *
   * @param {number} packId The unique pack ID
   * @param {number} packVersionNumber The version number retrieved from central
   * database for this pack
   * @param {Function} callback Function to call on completion
   * of lookup. The `location` parameter may be `null` if the lookup fails.
   */
  lookupExpansionPack(
    packId: number,
    packVersionNumber: number,
    callback: (packMeta: expansionPackMeta) => void
  ) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM expansionPackTable WHERE packId=?',
        [packId],
        (_, results) => {
          callback(results.rows.item(0));
        },
        (_, error) => {
          console.log('lookupExpansionPack error', error);
        }
      );
    });
  }
}

export default Storage;
