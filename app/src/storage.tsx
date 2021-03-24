import * as SQLite from 'expo-sqlite';

import * as nmwTable from '../nmwstandard.json';

import { Platform } from 'react-native';

// Interface for data
export interface nmwLocation {
  code: string;
  description: string;
  icon: string;
}

export interface enrichedLocation {
  nmw: string;
  name: string;
  description: string;
  icon: string;
  website: string;
  expansionPackID: number;
}

export interface expansionPackMetaData {
  packId: number;
  packName: string;
  packVersion: number;
  description: string;
  w3w: string;
  organisation: string;
}

export interface expansionPackBeaconsData {
  uuid: string;
  mac: string;
  nmw: string;
  name: number;
  description: string;
  website: string;
}

export interface expansionPack {
  meta: expansionPackMetaData;
  beacons: expansionPackBeaconsData[];
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
        if (
          results.rows.length == 0 ||
          results.rows.item(0) != nmwTable.version
        ) {
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
    }, undefined);
  }

  // Insert expansion pack into the database
  parseExpansionPack(expansionPack: expansionPack) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO expansionPackTable (packId, packName, packVersion, description, wtw, organisation) VALUES (?,?,?,?,?,?)',
        [
          expansionPack.meta.packId,
          expansionPack.meta.packName,
          expansionPack.meta.packVersion,
          expansionPack.meta.description,
          expansionPack.meta.w3w,
          expansionPack.meta.organisation
        ],
        undefined,
        () => {
          return false;
        }
      );
      expansionPack.beacons.forEach((beacon: expansionPackBeaconsData) => {
        tx.executeSql(
          'INSERT INTO beaconTable (uuid, mac, nmw, name, description, website, expansionID) VALUES (?,?,?,?,?,?,?)',
          [
            beacon.uuid,
            beacon.mac,
            beacon.nmw,
            beacon.name,
            beacon.description,
            beacon.website,
            expansionPack.meta.packId
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
      tx.executeSql('DELETE FROM expansionPackTable WHERE packId=?;', [code]);
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
    }, undefined);
  }

  /**
   * Perform a lookup based on a beacon's UUID (iOS) or MAC Address (Android)
   *
   * @param {string} code The UUID or MAC Address to look up.
   * @param {Function} callback Function to call on completion
   * of lookup. The `location` parameter may be `null` if the lookup fails.
   */
  lookupEnrichedInfo(
    code: string,
    callback: (location: enrichedLocation) => void
  ) {
    this.db.transaction((tx) => {
      // Lookup in beacon table
      const lookupType = Platform.OS === 'ios' ? 'uuid' : 'mac';
      tx.executeSql(
        `SELECT * FROM beaconTable WHERE ${lookupType}=?`,
        [code],
        (_, results) => {
          const result: enrichedLocation = results.rows.item(0);
          if (result == null) {
            callback(result);
            return;
          }

          // On success lookup icon in NMW codes table
          tx.executeSql(
            'SELECT icon FROM locationCodes WHERE code=?',
            [result.nmw],
            (_, resultsNMW) => {
              result.icon = resultsNMW.rows.item(0).icon;
              callback(result);
            }
          );
        }
      );
    });
  }
  // Input location code data
  loadData(data: nmwLocation) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO locationCodes (code, description, icon) VALUES (? ,?, ?)',
        [data.code, data.description, data.icon]
      );
    }, undefined);
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
      tx.executeSql(
        'SELECT description, icon FROM locationCodes WHERE code=?',
        [code],
        (_, results) => {
          callback(results.rows.item(0));
        },
        (_, error) => {
          console.log('lookupNMWCode error', error);
          return false;
        }
      );
    });
  }

  /**
   * Check if an expansion pack exists and if it does, pass it back via the callback
   *
   * @param {number} packId The unique pack ID
   * @param {Function} callback Function to call on completion
   * of lookup. The `expansionPackMeta` parameter may be `null` if the lookup fails.
   */
  lookupExpansionPack(
    packId: number,
    callback: (packMeta: expansionPackMetaData) => void
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
          return false;
        }
      );
    });
  }
}

export default Storage;
