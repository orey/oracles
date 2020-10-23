/********************************************
 * Wrapper for IndexedDB
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 11 2020
 * --------------
 * Note : this code is specific to the browser
 * Note the events received are not in a different this context
 * so the IndexedDB cannot be encapsulated in an object
 *******************************************/
"use strict";

const DBNAME = "NPCS";
const DBVERSION = 1;
const INDEXNAME = "name";
const INDEXUNIQUE = false;

// There is only one

function createDB() {
    let request = window.indexedDB.open(DBNAME, DBVERSION);
    let db;

    request.onerror = function(event) {
        myTrace("Error opening DB. Error code = " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        myTrace("Success opening DB.");
        db = event.target.result;
        //db = request.result;
        // Create an objectStore for this database
        let objectStore = db.createObjectStore(DBNAME, { keyPath: "id", autoIncrement: true });
            
        objectStore.createIndex(INDEXNAME, INDEXNAME, { unique: INDEXUNIQUE });

        objectStore.transaction.oncomplete = function(event) {
            myTrace("Event this.objectStore.transaction.oncomplete received");
        }
    };

    // This event is only implemented in recent browsers   
    request.onupgradeneeded = function(event) {
        console.log("are we there");
        // Save the IDBDatabase interface
        let db = event.target.result;
    };
}

function insertInDB(obj){
    let request = window.indexedDB.open(DBNAME, DBVERSION);

    request.onerror = function(event) {
        myTrace("Error opening DB. Error code = " + event.target.errorCode);
    };

    request.onsuccess = function(event) {
        myTrace("Success opening DB : attempting to write.");
        let db = event.target.result;
    
        let transaction = db.transaction([DBNAME], "readwrite");

        var npcsObjectStore = transaction.objectStore();
        npcsObjectStore.add(obj);

        transaction.oncomplete = function(event) {
            myTrace("Data added to store");
        };

        transaction.onerror = function(event) {
            // Don't forget to handle errors!
            myTrace("Error when inserting data");
        };
        //db = request.result;
    };
    
}

/*    getObjectStore(store_name, mode) {
        var tx = db.transaction(store_name, mode);
        return tx.objectStore(store_name);
    }

    clearObjectStore() {
        var store = getObjectStore(DB_STORE_NAME, 'readwrite');
        var req = store.clear();
        req.onsuccess = function(evt) {
            displayActionSuccess("Store cleared");
            displayPubList(store);
        };
        req.onerror = function (evt) {
            console.error("clearObjectStore:", evt.target.errorCode);
            displayActionFailure(this.error);
        };
    }*/







