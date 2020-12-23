/********************************************
 * Wrapper for IndexedDB
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 11 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";


/*
 * This class is a wrapper around the very strangely designed and badly documented
 * IndexedDB. It is designed to host only one store with one index in one DB.
 * It is autonomous and can be reused in various contexts.
 */
class IDBWrapper {
    constructor (base, name, version, index="") {
        this.base = base;
        this.name = name; // object store name
        this.version = version;
        this.index = index;
        
        let request = window.indexedDB.open(this.base, this.version);

        request.onerror = function(event) {
            // Do something with request.errorCode!
            console.error("IDBWrapper: Error opening DB. Error code = " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            // Do something with request.result!
            console.log("IDBWrapper: Success opening DB.");
            //let db = event.target.result;
        };

        // This event is only implemented in recent browsers   
        request.onupgradeneeded = function(event) { 
            // Save the IDBDatabase interface
            // we'll use this.db instead
            let db = event.target.result;
            let objectStore;

            // Create an objectStore for this database
            if (db.objectStoreNames.contains(this.name))
                console.log("IDBWrapper: Store " + this.name + " already exists.");
            else {
                objectStore = db.createObjectStore(name,
                                                       { keyPath: "id", autoIncrement: true });
                console.log("IDBWrapper: object store created");
                if (index != "") {
                    objectStore.createIndex("by_" + index, index, { unique: false });
                    console.log("IDBWrapper: Index by_" + index + " created");
                }
            }
            
            objectStore.transaction.oncomplete = function(event) {
                console.log("IDBWrapper: Event objectStore.transaction.oncomplete received");
            }
        }
        // Record request object
        this.request = request;

        // it is not possible to record the DB oject because it is created
        // asynchronously and its handle only appear in events at this time.
        // That would mean having a global variable which is bad..
        // Later, to get the db, we can type
        // db = request.result;
    }

    insert(obj){
        let db = this.request.result;

        // Normally, we shouldn't need this code, except on very old browser that
        // do not support the "onupgradeneeded" event.
        /*
        if (db.objectStoreNames.contains(this.name))
            myTrace("Store " + this.name + " already exists.");
        else {
           let store =  db.createObjectStore(this.name,
                                             { keyPath: "id", autoIncrement: true });
            if (index != "")
                store.createIndex("by_" + this.index, this.index, { unique: false });
        }
        */
        
        let transaction = db.transaction([this.name], "readwrite");

        let npcsObjectStore = transaction.objectStore(this.name);
        npcsObjectStore.put(obj);

        transaction.oncomplete = function(event) {
            console.log("IDBWrapper: Data added to store");
        };

        transaction.onerror = function(event) {
            console.error("IDBWrapper: Error when inserting data");
        };
    }

    /*
     * This method clears all the records in the store
     */
    clearDB() {
        let store = db.transaction([this.name], 'readwrite').objectStore(this.name);
        let request = store.clear();
        
        request.onsuccess = function(event) {
            console.log("IDBWrapper: Store cleared");
        };

        req.onerror = function (evt) {
            console.error("IDBWrapper: clearObjectStore error, code: ", evt.target.errorCode);
        };
    }

}






