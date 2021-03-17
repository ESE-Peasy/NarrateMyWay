import * as SQLite from 'expo-sqlite';

import * as nmwTable from './nmwstandard.json';

// Interface for data
interface location {
  code: string;
  description: string;
  emblem: String;
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
        'CREATE TABLE IF NOT EXISTS locationCodes (id string primary key not null, description text, emblem text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS versionRecord (id integer primary key not null, version text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS expansionPackTable (id integer primary key autoincrement, pack_name text, description text, wtw text, organisation text);'
      );
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS uuidTable (id string primary key not null, nmw text, name text, description text, website text, expansionID INTEGER REFERENCES expansionPackTable(id));'
      );

      tx.executeSql('SELECT * FROM versionRecord', [], (_, results) => {
        if (results.rows.length == 0) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);
          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (id, description, emblem) VALUES (?,?,?)',
              [value.code, value.description, value.emblem]
            );
          });
        } else if (results.rows.item(0) != nmwTable.version) {
          tx.executeSql('INSERT INTO versionRecord (version) VALUES (?)', [
            nmwTable.version
          ]);

          nmwTable.nmw.forEach((value) => {
            tx.executeSql(
              'INSERT INTO locationCodes (id, description, emblem) VALUES (?,?,?)',
              [value.code, value.description, value.emblem]
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
        'INSERT INTO expansionPackTable (pack_name, description, wtw, organisation) VALUES (?,?,?,?)',
        [
          expansionData.meta.pack_name,
          expansionData.meta.description,
          expansionData.meta.w3w,
          expansionData.meta.organisation
        ]
      );
      tx.executeSql(
        'SELECT id FROM expansionPackTable WHERE pack_name=?',
        ['Boyd Orr'],
        (_, results) => {
          expansionData.UUIDs.forEach((value) => {
            tx.executeSql(
              'INSERT INTO uuidTable (id, nmw, name, description, website, expansionID) VALUES (?,?,?,?,?,?)',
              [
                value.code,
                value.nmw,
                value.name,
                value.description,
                value.website,
                results.rows.item(0).id
              ]
            );
          });
        }
      );
    });
  }

  deleteExpansionPack(code: number) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM uuidTable WHERE expansionID=?;', [code]);
      tx.executeSql('DELETE FROM expansionPackTable WHERE id=?;', [code]);
    });
  }

  // 'INSERT INTO versionRecord (version) VALUES (?)'
  printExpansionPack() {
    this.db.transaction((tx) => {
      tx.executeSql('SELECT * FROM uuidTable', [], (_, results) => {
        console.log(results.rows);
      });
      tx.executeSql('SELECT * FROM expansionPackTable', [], (_, results) => {
        console.log(results.rows);
      });
    }, null);
  }

  getUUIDData(code: string, callback: Function) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT nmw FROM uuidTable WHERE nmw=?',
        [code],
        (_, results) => {
          console.log(results, 'this is results ---');
          callback(results.rows.item(0).nmw);
        }
      );
      console.log('error error error');
    });
    // console.log("this is the code");
    console.log(code);
  }
  // Input location code data
  loadData(data: location) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO locationCodes (id, description, emblem) VALUES (? ,?, ?)',
        [data.code, data.description, data.emblem]
      );
    }, null);
  }

  // Clear storage
  clearStorage() {
    this.db.transaction((tx) => {
      tx.executeSql('DROP TABLE locationCodes;');
      tx.executeSql('DROP TABLE versionRecord;');
      tx.executeSql('DROP TABLE expansionPackTable;');
      tx.executeSql('DROP TABLE uuidTable;');
    });
  }

  // Delete element from location table
  deleteElementLocation(id: string) {
    this.db.transaction((tx) => {
      tx.executeSql('DELETE FROM locationCodes WHERE id=?', [id]);
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

  // Lookup code description
  lookupDataForNMWCode(code: String, callback: Function) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'SELECT description, emblem FROM locationCodes WHERE id=?',
        [code],
        (_, results) => {
          callback(
            results.rows.item(0).description,
            results.rows.item(0).emblem
          );
        }
      );
    });
  }
}

export default Storage;
