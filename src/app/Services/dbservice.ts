import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EventService } from './eventservice'

@Injectable()
export class DBService {

    private sqliteObject: SQLiteObject = null;
    constructor(private sqlite: SQLite, private eventservice: EventService) {
    }


    createDb(databaseName: string) {
        
        return this.sqlite.create({
            name: databaseName,
            location: 'default'
        });
    }

    createTable(databaseName: string, query: string, insertQuery: string, tableName:string) {
        // alert(JSON.stringify(query));
        return this.sqlite.create({
            name: databaseName,
            location: 'default' 
        })
        .then((db: SQLiteObject) => {
            
            //  alert(JSON.stringify(db))
            this.sqliteObject = db;
              db.executeSql(query, {})
            .then((output) => {  
                // alert(JSON.stringify("create")) 
                // alert(JSON.stringify(output))  
                //  console.log(JSON.stringify(output))  
                this.insertValuesToTable(databaseName, insertQuery, tableName, db);        
               
            }).catch((e) => { 
                // alert(JSON.stringify(e))
            });

        }).catch((e) => {
            // alert('create db SQL Exception');alert(JSON.stringify(e))
        });;
       
    }


    insertValuesToTable(databaseName: string, query: string, tableName:string, db?:any) {
        this.sqliteObject = db;
        if (this.sqliteObject != null) {
            console.log(JSON.stringify(query));
            console.log('sqliteObject not null')
             var clearQuery = 'DELETE FROM ' + tableName;              
               
                this.sqliteObject.executeSql(clearQuery,{}).then((output) => {
                   
                });
               
            this.sqliteObject.executeSql(query, {}).then((output) => {
                // alert(JSON.stringify("insert"));
                // alert(JSON.stringify(output));
                

            }).catch((e) => {
                // alert('insert sql Exception'); 
                // alert(JSON.stringify(e)) 
            });
        } else {
            
            this.createDb(databaseName).then((db: SQLiteObject) => {
               
                this.sqliteObject = db;
                var clearQuery = 'DELETE FROM ' + tableName;              
               
                db.executeSql(clearQuery,{}).then((output) => {
                   
                });
                db.executeSql(query, {}).then((output) => {
                    // console.log(JSON.stringify(query))
                    return output;

                }).catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });

            }).catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
        }
    }


    getDataFromTable(name:any, databaseName: string, query: string): any {
        
        this.createDb(databaseName).then((db: SQLiteObject) => {
            this.sqliteObject = db;
            db.executeSql(query, {})
                .then((output) => {
                    let responseArray: any = {columns:[], values:[]};
                    for (var i = 0; i < output.rows.length; i++) {
                        if (i == 0) {
                            responseArray.columns = Object.keys(output.rows.item(i));
                        }
                        let vals = Object.keys(output.rows.item(i)).map(function (key) {
                            
                            return output.rows.item(i)[key];
                        });
                        
                        responseArray.values.push(Array.from(vals));                      
                  
                    }   
                        
                    this.eventservice.sendMessage(name,new Object(responseArray) );
                   
                    // alert(JSON.stringify(responseArray) );
                })
                .catch((e) => { 
                        // alert(JSON.stringify(e))
                }); 

        }).catch((e) => { 
            //   alert(JSON.stringify(e))
            });

    }

    // createTable(databaseName: string, query: string) {
    //     this.createDb(databaseName)
    //         .then(
    //         (db: SQLiteObject) => {
    //             this.sqliteObject = db;
    //             db.executeSql(query, {}).then((output) => {
    //                return   output;
    //             })
    //                 .catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
    //         }
    //         )
    //         .catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
    // }

    // insertValues(databaseName: string,query){
    //     this.createDb(databaseName)
    //         .then(
    //         (db: SQLiteObject) => {
    //             this.sqliteObject = db;
    //             db.executeSql(query, []).then((output) => {
    //                  console.log('output is');
    //              console.log(JSON.stringify(output) );
    //               for(let i = 0; i < output.rows.length; i++) {
    //                   if(i<10){                          
    //                       console.log(

    //                          JSON.stringify(output.rows.item(i))  
    //                            );
    //                   }
    //                     }

    //             })
    //                 .catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
    //         }
    //         )
    //         .catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
    // }


    // getDataFromTable(query) {
    //     this.sqliteObject.executeSql(query, {})
    //         .then((output) => {

    //         })
    //         .catch((e) => { console.log('SQL Exception');console.log(JSON.stringify(e)) });
    // }




}