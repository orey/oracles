/********************************************
 * Wrapper for IndexedDB
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 11 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

class myDB {
    constructor (base, name, version, index="") {
        this.base = base;
        this.name = name;
        this.version = version;
        this.index = index;
        
        let request = window.indexedDB.open(this.base, this.version);

        request.onerror = function(event) {
            // Do something with request.errorCode!
            myTrace("Error opening DB. Error code = " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            // Do something with request.result!
            myTrace("Success opening DB.");
            let db = event.target.result;
        };

        // This event is only implemented in recent browsers   
        request.onupgradeneeded = function(event) { 
            // Save the IDBDatabase interface
            // we'll use this.db instead
            let db = event.target.result;

            // Create an objectStore for this database
            let objectStore = db.createObjectStore(name,
                                                   { keyPath: "id", autoIncrement: true });
            
            if (index != "")
                objectStore.createIndex("by_" + index, index, { unique: false });
            
            myTrace("Object store created");
            
            objectStore.transaction.oncomplete = function(event) {
                myTrace("Event this.objectStore.transaction.oncomplete received");
            }
        }
        // try to record request
        // db = request.result;
        this.request = request;
    }

    insert(obj){
        let db = this.request.result;

        /*if (db.objectStoreNames.contains(this.name))
            myTrace("Store " + this.name + " already exists.");
        else {
           let store =  db.createObjectStore(this.name,
                                             { keyPath: "id", autoIncrement: true });
            if (index != "")
                store.createIndex("by_" + this.index, this.index, { unique: false });
        }*/
        
        let transaction = db.transaction([this.name], "readwrite");

        let npcsObjectStore = transaction.objectStore(this.name);
        npcsObjectStore.put(obj);

        transaction.oncomplete = function(event) {
            myTrace("Data added to store");
        };

        transaction.onerror = function(event) {
            // Don't forget to handle errors!
            myTrace("Error when inserting data");
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

}






