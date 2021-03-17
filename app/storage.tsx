import * as SQLite from 'expo-sqlite';

import * as nmwTable from './nmwstandard.json';
import * as expansionData from './expansion1.json';


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
    db.exec(
      [{ sql: 'PRAGMA foreign_keys = ON;', args: [] }],
      false,
      () => console.log('Foreign keys turned on'),
    );
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
        'CREATE TABLE IF NOT EXISTS uuidTable (id string primary key not null, nmw text, name text, description text, website text, expansionID string, FOREIGN KEY (expansionID) REFERENCES expansionPackTable (id));'
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

  insertExpansion(){
    this.db.transaction((tx) => {
      
      expansionData.UUIDs.forEach((value) => {
        tx.executeSql(
          'INSERT INTO uuidTable (id, nmw, name, description, website) VALUES (?,?,?,?,?)',
          [value.code, value.nmw, value.name, value.description, value.website]
        );
      });
      
     tx.executeSql(
      'INSERT INTO expansionPackTable (pack_name, description, wtw, organisation) VALUES (?,?,?,?)',
          [expansionData.meta.pack_name, expansionData.meta.description, expansionData.meta.w3w, expansionData.meta.organisation]
    );
    });
  }


// 'INSERT INTO versionRecord (version) VALUES (?)'
   parseExpansionPack(){
    this.db.transaction((tx) => {
    tx.executeSql(
      'SELECT * FROM uuidTable',
      [],
      (_, results) => {
        console.log(results.rows);
      },
    );  
    tx.executeSql(
      'SELECT * FROM expansionPackTable',
      [],
      (_, results) => {
        console.log(results.rows);
      },
    );  
    }, null);
   }


    getUUIDData(code: string, callback: Function){
      this.db.transaction((tx) => {
        tx.executeSql(
          'SELECT nmw FROM uuidTable WHERE nmw=?',
          [code],
          (_, results) => {
            console.log(results, "this is results ---");
            callback(
              results.rows.item(0).nmw 
            );
          },
        );
        console.log("error error error");
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
