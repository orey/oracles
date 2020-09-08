/********************************************
 * JS utilities
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: September 08 2020
 *******************************************/

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
        alert(commits[0].name);
    })()    
}


function test(){
    let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
    let url2 = 'https://raw.githubusercontent.com/orey/oracles/master/names.json';
    let url3 = getBaseUrl() + 'names.json';
    alert(url2);
    getJsonFile(url2);
}
