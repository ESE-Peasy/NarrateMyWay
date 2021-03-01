import * as SQLite from 'expo-sqlite'

import * as nmwTable from './nmwstandard.json';


// var nmwTable = require('./nmwstandard.json');

const executeQuery = (sql, db, params = []) => new Promise((resolve, reject) => {
    db.transaction((trans) => {
      trans.executeSql(sql, params, (trans, results) => {
        resolve(results);
      },
        (error) => {
          reject(error);
        });
    });
  });

// Interface for data
interface location {
    code: string;
    description: string;
}

// Storage Class
class Storage {
    //
    // local varibles
    db:SQLite.WebSQLDatabase;
    output:String|null;
  
    constructor() {
        this.db = this.createDb();
        console.log('this has ran! :)');

    }
    
    // create database
    createDb() {
        const db = SQLite.openDatabase('database.db');
        return db
    }

    // create high level table
    createTable(){
        let version:SQLite.SQLResultSetRowList | null | String;
        version = null;

        this.db.transaction(tx => {
            tx.executeSql(
                'create table if not exists locationcodes (id string primary key not null, description text);'
            );
            tx.executeSql(
                'create table if not exists versionRecord (id integer primary key not null, version text);'
            );
            tx.executeSql('select * from versionRecord', [], (_,  results) =>
                    {
                    if (results.rows.length == 0){
                        console.log(nmwTable.version);
                        tx.executeSql('insert into versionRecord (version) values (?)', [nmwTable.version]);
                        nmwTable.nmw.forEach(value =>{ 
                            tx.executeSql('insert into locationcodes (id, description) values (?,?)', [value.code, value.description]);
                        });                        
                        console.log('length == 0')
                    }else if(results.rows.item(0) != nmwTable.version){
                        tx.executeSql('insert into versionRecord (version) values (?)', [nmwTable.version]);
                        
                        nmwTable.nmw.forEach(value =>{ 
                            tx.executeSql('insert into locationcodes (id, description) values (?,?)', [value.code, value.description]);
                        });
                        
                    }
                    }
                    
                );
            },
            null,
            console.log('this runs')
        );
    
    }
    


    // Test input data
    loadData(data: location){
        
        this.db.transaction(
            tx => {
              // tx.executeSql('insert into items (done, value) values (0, ?)', [text]);
              tx.executeSql('insert into locationcodes (id, description) values (? ,?)', [data.code ,data.description]);
              tx.executeSql('select * from locationcodes', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
                );
                },
            null,
            console.log('FINISHED')
        )
    }

    // Load all data into high level table
    populateTable(){

    }
    

    // Load all data into uuid data


    // get data from high level table

    // get data from uuid table

    // clear storage
    clearStorage(){
        this.db.transaction(tx => {
            tx.executeSql(
                'drop table locationcodes;'
            );
             
            tx.executeSql(
                'drop table versionRecord;'
            );
            
          });
    }


    // delete element from location table
    deleteElementLocation(id:string){
        this.db.transaction(tx => {
            tx.executeSql(
                'delete from locationcodes where id=?', [id]
            ); 
        })
    }

    // delete element from uuid table
    deleteElementUUID(id:string){
        this.db.transaction(tx => {
            tx.executeSql(
                'delete from uuiddata where id=?', [id]
            ); 
        })
    }


    // print data within a table
    async printData(){
        /*
        this.db.transaction(tx => {
            
            tx.executeSql('select * from locationcodes', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            );
            
        })
        */
       return await executeQuery('select * from locationcodes', this.db, [])
    }

    printVersionData(){
        this.db.transaction(tx => {
            tx.executeSql('select * from versionRecord', [], (_, { rows }) =>
                console.log(JSON.stringify(rows))
            ); 
        })
    }

    async lookUpResults(_:any, results:SQLite.SQLResultSet){
        console.log(results.rows.item(0).description)
        this.output = await results.rows.item(0).description;
    }

    
    // lookup for locationcodes
    lookUpCodeDescription(code:String, callback:Function){
        // let output:null | String;
        this.output = null;
         this.db.transaction(
            tx => {
              tx.executeSql('select description from locationcodes where id=?', [code], (_, results ) => {
                callback(results.rows.item(0).description);

              }
            );
            }
          );
      
    }
    
}



export default Storage;
export default location;
