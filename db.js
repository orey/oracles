/********************************************
 * Wrapper for IndexedDB
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 11 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

class myDB() {
    constructor (name, version, index="") {
        this.db = undefined;
        this.name = name;
        this.version = version;
        this.objectStore = undefined;
        this.index = index;
        
        let request = window.indexedDB.open(this.name, this.version);

        request.onerror = function(event) {
            // Do something with request.errorCode!
            myTrace("Error opening DB. Error code = " + event.target.errorCode);
        };

        request.onsuccess = function(event) {
            // Do something with request.result!
            myTrace("Success opening DB.");
            this.db = event.target.result;
        };

        // This event is only implemented in recent browsers   
        request.onupgradeneeded = function(event) { 
            // Save the IDBDatabase interface
            // we'll use this.db instead
            // var db = event.target.result;

            // Create an objectStore for this database
            this.objectStore = this.db.createObjectStore(this.name,
                                                         { keyPath: "id", autoIncrement: true });
            
            if (this.index != "")
                this.objectStore.createIndex(this.index, this.index, { unique: false });

            this.objectStore.transaction.oncomplete = function(event) {
                myTrace("Event this.objectStore.transaction.oncomplete received");
            }
        }
    }

    insert(obj){
        let transaction = this.db.transaction([this.name], "readwrite");

        var npcsObjectStore = transaction.objectStore(this.name);
        npcsObjectStore.add(obj);

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






