/********************************************
 * Main web JS entry point for oracles
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: September 08 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const BASE_URL =  "https://orey.github.io/oracles/";

const TRACE = document.getElementById('trace');


function myTrace(text, para=true,hr=true) {
    //let elem = document.getElementById('trace');          
    let date = new Date().toLocaleString();
    TRACE.innerHTML +=  "<p>[" +  date
        + (para ? "] " : "]</p>")
        + text
        + (para ? "</p>" : "") + (hr ? "<hr>" : "");
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
    let data;
    (async () => {
        let response = await fetch(url);
        data = await response.json(); // read response body and parse as JSON
    })();
    return data;
}

function getJsonFile2(url){
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            myTrace('Success');
            for (const elem of data) {
                myTrace("Name: " + elem.name + " " + elem.surname, true, false);
            }
            myTrace("End of JSON file");
        })
        .catch((error) => {
            myTrace('Error:' + error);
        });
}


function test(){
    //loadDependencies();
    let url2 = BASE_URL + 'names.json';
    myTrace(url2);
    
    getJsonFile2(url2);
    
    myTrace("Average D20 testing:" + testRollDie(20).toString())

    let c = new HarryPotterNPC();
    myTrace("NPC name: " + c.name + " " + c.surname, true, false);
    myTrace(c.to_HTML(), false, true);

    let e = document.querySelector("my-npc");
    console.log(e);
    e.data = c;
    //e.setAttribute("render","true");
    //BUS.fire("my-npc-refresh");

    let e2 = document.querySelector("my-npc2");
    console.log(e2);
    e2.data = c;
    //e.setAttribute("render","true");
    BUS.fire("my-npc2-refresh");

    //    insertInDB(c);
    DB.insert(c);
    
}

let DB= new IDBWrapper("BASE", "NPCS",1,"name");

window.onload = function(){
    myTrace("window.onload");
    //    createDB();
}

