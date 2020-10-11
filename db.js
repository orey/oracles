/********************************************
 * DB for NPC
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: October 11 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const DB_NAME = "RPG";
const DB_VERSION = 1;
const DB_STORE_NAME = "NPC";

var db;

function openDB() {
    // Open in version 1
    let request = indexedDB.open(dbName, 1);

    request.onerror = function(event) {
        MsgBox("Error in Opening DB");
        console.error("openDb:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = this.result;
        console.log("openDb DONE");
    };

    // Define the schema
    request.onupgradeneeded = function (event) {
        console.log("openDb.onupgradeneeded");
        var store = event.currentTarget.result.createObjectStore(
            DB_STORE_NAME,
            { keyPath: 'id', autoIncrement: true });
        //store.createIndex('biblioid', 'biblioid', { unique: true });
        //store.createIndex('title', 'title', { unique: false });
    };
}

function getObjectStore(store_name, mode) {
    var tx = db.transaction(store_name, mode);
    return tx.objectStore(store_name);
}

function clearObjectStore() {
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
}

function getBlob(key, store, success_callback) {
    var req = store.get(key);
    req.onsuccess = function(evt) {
        var value = evt.target.result;
        if (value)
            success_callback(value.blob);
    };
}

//reprendre ici







