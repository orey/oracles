/********************************************
 * JS utilities
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: September 08 2020
 *******************************************/
"use strict";

const BASE_URL =  "https://orey.github.io/oracles/";


function myTrace(text) {
    let elem = document.getElementById('trace');
    elem.innerHTML = "<h3>Trace</h3><p>" + text + "</p>";
}

/*---------------------------------------
 * Function to load other JS files
 *--------------------------------------*/
function loadJS(url) {
    let scriptTag = document.createElement('script');
    scriptTag.src = url;
    document.body.appendChild(scriptTag);
}

function loadDependencies() {
    loadJS(BASE_URL + "js/oracles-engine.js");
    myTrace(BASE_URL + "js/oracles-engine.js");
    myTrace("D20:" + testRollDie(20).toString())
    //hp     = loadJS(BASE_URL + "js/harrypotter.js");
    //names  = loadJS(BASE_URL + "js/names.js");
}


/*---------------------------------------
 * Function to retrieve the base URL
 * Used for JSON files
 *--------------------------------------*/
function getBaseUrl() {
    var re = new RegExp(/^.*\//);
    return re.exec(window.location.href);
}

/*---------------------------------------
 * Function to get the JSON file and provide
 * a JSON object
 *--------------------------------------*/
function getJsonFile(url){
    (async () => {
        let response = await fetch(url);
        let commits = await response.json(); // read response body and parse as JSON
        myTrace(commits[0].name);
    })()    
}


function test(){
    //loadDependencies();
    let url2 = BASE_URL + 'names.json';
    alert(url2);
    // let url3 = getBaseUrl() + 'names.json';
    myTrace(url2);
    getJsonFile(url2);
    myTrace("D20:" + testRollDie(20).toString())
    //let NPC = new NPC();
    //alert("NPC name: " + NPC.name + " " + NPC.surname);
    
}

