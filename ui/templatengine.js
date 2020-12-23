/********************************************
 * Simplest template engine ever
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: November 22 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const BALISE = "||";
const LIST = "@@";

const DEFAULT = "INIT";


/*********************************************
 * Get file from server
 *********************************************/
const BROWSER = 0;

let worker = new Worker('ui/template-worker.js');

// Event called by the button
function getTemplate(){
    worker.postMessage([BROWSER, 'npccomponent.htpl']);
};

worker.onmessage = function(e) {
    console.log("Event received from Worker: " + JSON.stringify(e));
    createObjectFromTemplate(e.data);
    setTemplate(e.data);
};

function setTemplate(text){
    document.getElementById('template').innerHTML = text;
}

