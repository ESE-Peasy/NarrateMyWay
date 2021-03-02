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
  // local varibles
  db: SQLite.WebSQLDatabase;

  constructor() {
    this.db = this.createDb();
  }

  // Create database
  createDb() {
    const db = SQLite.openDatabase('database.db');
    return db;
  }

  // Create and populate database tables
  createTable() {
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          'create table if not exists locationcodes (id string primary key not null, description text, emblem text);'
        );
        tx.executeSql(
          'create table if not exists versionRecord (id integer primary key not null, version text);'
        );
        tx.executeSql('select * from versionRecord', [], (_, results) => {
          if (results.rows.length == 0) {
            console.log(nmwTable.version);
            tx.executeSql('insert into versionRecord (version) values (?)', [
              nmwTable.version
            ]);
            nmwTable.nmw.forEach((value) => {
              tx.executeSql(
                'insert into locationcodes (id, description, emblem) values (?,?,?)',
                [value.code, value.description, value.emblem]
              );
            });
            console.log('length == 0');
          } else if (results.rows.item(0) != nmwTable.version) {
            tx.executeSql('insert into versionRecord (version) values (?)', [
              nmwTable.version
            ]);

            nmwTable.nmw.forEach((value) => {
              tx.executeSql(
                'insert into locationcodes (id, description, emblem) values (?,?,?)',
                [value.code, value.description, value.emblem]
              );
            });
          }
        });
      },
      null,
      console.log('this runs')
    );
  }

  // Test input data
  loadData(data: location) {
    this.db.transaction(
      (tx) => {
        tx.executeSql(
          'insert into locationcodes (id, description, emblem) values (? ,?, ?)',
          [data.code, data.description, data.emblem]
        );
        tx.executeSql('select * from locationcodes', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      console.log('FINISHED')
    );
  }

  // Clear storage
  clearStorage() {
    this.db.transaction((tx) => {
      tx.executeSql('drop table locationcodes;');

      tx.executeSql('drop table versionRecord;');
    });
  }

  // Delete element from location table
  deleteElementLocation(id: string) {
    this.db.transaction((tx) => {
      tx.executeSql('delete from locationcodes where id=?', [id]);
    });
  }

  // Delete element from uuid table
  deleteElementUUID(id: string) {
    this.db.transaction((tx) => {
      tx.executeSql('delete from uuiddata where id=?', [id]);
    });
  }

  // Print the version of currently stored data
  printVersionData() {
    this.db.transaction((tx) => {
      tx.executeSql('select * from versionRecord', [], (_, { rows }) =>
        console.log(JSON.stringify(rows))
      );
    });
  }

  // Lookup code description
  lookUpCodeDescription(code: String, callback: Function) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'select description from locationcodes where id=?',
        [code],
        (_, results) => {
          callback(results.rows.item(0).description);
        }
      );
    });
  }

  // Lookup code emblem
  lookUpEmblem(code: String, callback: Function) {
    this.db.transaction((tx) => {
      tx.executeSql(
        'select emblem from locationcodes where id=?',
        [code],
        (_, results) => {
          callback(results.rows.item(0).emblem);
        }
      );
    });
  }
}

export default Storage;
export default location;
