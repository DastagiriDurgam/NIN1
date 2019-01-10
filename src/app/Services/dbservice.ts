import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { EventService } from './eventservice';
import { Platform } from 'ionic-angular';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@Injectable()
export class DBService {

    private sqliteObject: SQLiteObject = null;
    database: SQLiteObject;
    databaseName = "developers.db";
    private databaseReady: BehaviorSubject<boolean>;
    constructor(private sqlite: SQLite, private eventservice: EventService,
        private spinnerDialog: SpinnerDialog,
        public sqlitePorter: SQLitePorter, private storage: Storage,
        private platform: Platform,
        private http: Http) {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() => {
            this.sqlite.create({
                name: this.databaseName,
                location: 'default',
                createFromLocation: 1
            }).then((db: SQLiteObject) => {
                this.database = db;
                this.storage.get('database_filled').then(val => {
                    if (val) {
                        this.databaseReady.next(true);
                    } else {
                        this.fillDatabase();
                    }
                });
            });
        });
    }
    fillDatabase() {
        this.http.get('assets/db/dump.sql')
            .map(res => res.text())
            .subscribe(sql => {
                this.sqlitePorter.importSqlToDb(this.database, sql)
                    .then(data => {
                        this.databaseReady.next(true);
                        this.storage.set('database_filled', true);
                        console.log('dbdump completed');
                    })
                    .catch(e => alert(e));
            });
    }
    tableDump(tableName) {
        return new Promise((resolve) => {
            this.createDb(this.databaseName).then((db: SQLiteObject) => {
                console.log('tableName', tableName);
                this.storage.get(tableName).then(res => {
                    if (res) {
                        resolve(true);
                    } else {
                        this.spinnerDialog.show('loading ' + tableName);
                        this.http.get('assets/db/' + tableName + '.sql')
                            .map(res => res.text())
                            .subscribe(sql => {
                                this.sqlitePorter.importSqlToDb(this.database, sql)
                                    .then(data => {
                                        this.storage.set(tableName, true);
                                        this.spinnerDialog.hide();
                                        resolve(true);
                                    })
                                    .catch(e => console.log('table dump error', e));
                            });

                    }
                });

            });
        });

    }
    getDatabaseState() {
        return this.databaseReady.asObservable();
    }


    createDb(databaseName: string) {

        return this.sqlite.create({
            name: databaseName,
            location: 'default',
            createFromLocation: 1
        });
    }

    createTable(databaseName: string, query: string, insertQuery: string, tableName: string) {
        // alert(JSON.stringify(query));
        console.log('db-conent-createTable');
        return this.sqlite.create({
            name: this.databaseName,
            location: 'default'
        })
            .then((db: SQLiteObject) => {

                //  alert(JSON.stringify(db))
                this.sqliteObject = db;
                db.executeSql(query, [])
                    .then((output) => {
                        // alert(JSON.stringify("create")) 
                        // alert(JSON.stringify(output))  
                        //  console.log(JSON.stringify(output))  
                        this.insertValuesToTable(this.databaseName, insertQuery, tableName, db);

                    }).catch((e) => {
                        // alert(JSON.stringify(e))
                    });

            }).catch((e) => {
                // alert('create db SQL Exception');alert(JSON.stringify(e))
            });;

    }


    insertValuesToTable(databaseName: string, query: string, tableName: string, db?: any) {
        console.log('db-conent-insertValuesToTable');
        this.sqliteObject = db;
        if (this.sqliteObject != null) {
            // console.log(JSON.stringify(query));
            // console.log('sqliteObject not null')
            var clearQuery = 'DELETE FROM ' + tableName;

            this.sqliteObject.executeSql(clearQuery, []).then((output) => {

            });

            this.sqliteObject.executeSql(query, []).then((output) => {
                // alert(JSON.stringify("insert"));
                // alert(JSON.stringify(output));


            }).catch((e) => {
                // alert('insert sql Exception'); 
                // alert(JSON.stringify(e)) 
            });
        } else {

            this.createDb(this.databaseName).then((db: SQLiteObject) => {

                this.sqliteObject = db;
                var clearQuery = 'DELETE FROM ' + tableName;

                db.executeSql(clearQuery, []).then((output) => {

                });
                db.executeSql(query, []).then((output) => {
                    // console.log(JSON.stringify(query))
                    return output;

                }).catch((e) => { console.log('SQL Exception'); console.log(JSON.stringify(e)) });

            }).catch((e) => { console.log('SQL Exception'); console.log(JSON.stringify(e)) });
        }
    }

    getDataFromTable2(query, responseRows = false, rowsObject = false) {
        return this.createDb(this.databaseName).then((db: SQLiteObject) => {
            return this.database.executeSql(query, []).then((data) => {

                if (responseRows) {
                    return data.rows.item(0);
                } else {
                    let responseArray: any = { columns: [], values: [] };
                    for (var i = 0; i < data.rows.length; i++) {
                        if (i == 0) {
                            responseArray.columns = Object.keys(data.rows.item(i));
                        }
                        let vals = Object.keys(data.rows.item(i)).map(function (key) {
                            return data.rows.item(i)[key];
                        });
                        responseArray.values.push(Array.from(vals));
                    }
                    if (rowsObject) {
                        responseArray.rows = data.rows.item(0);
                    }
                    return responseArray;
                }
            }, err => {
                console.log('Error: ', err);
                return [];
            });
        });
    }


    getDataFromTable(name: any, databaseName: string, query: string, callback?: any): any {
        this.createDb(this.databaseName).then((db: SQLiteObject) => {
            this.sqliteObject = db;
            db.executeSql(query, [])
                .then((output) => {

                    let responseArray: any = { columns: [], values: [] };
                    for (var i = 0; i < output.rows.length; i++) {
                        if (i == 0) {
                            responseArray.columns = Object.keys(output.rows.item(i));
                        }
                        // alert(JSON.stringify(output.rows.item(i)));
                        let vals = Object.keys(output.rows.item(i)).map(function (key) {

                            return output.rows.item(i)[key];
                        });
                        responseArray.values.push(Array.from(vals));
                    }
                    callback(new Object(responseArray), output.rows.item(0));
                    this.eventservice.sendMessage(name, new Object(responseArray));

                    // alert(JSON.stringify(responseArray) );
                })
                .catch((e) => {
                    // alert(JSON.stringify(e))
                });

        }).catch((e) => {
            //   alert(JSON.stringify(e))
        });

    }

}