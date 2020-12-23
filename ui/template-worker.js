/********************************************
 * Web worker to get template
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: December 23 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const BROWSER = 0;
const URL_KEY = "https://orey.github.io/oracles/ui/";

/*********************************************
 * Receive message from caller
 *********************************************/
onmessage = function(e) {
    if (e.data[0] == BROWSER)
        getRemoteTemplate(e.data[1]);
    else
        getHardcodedTemplate();
};

/*********************************************
 * getRemoteTemplate
 *********************************************/
function getRemoteTemplate(templatename){
    var r = new XMLHttpRequest();
    r.open('GET', URL_KEY + templatename);

    r.onreadystatechange = function(){
        if(this.readyState === XMLHttpRequest.DONE){
            if(this.status === 200){
                // send template back to the caller
                postMessage(this.responseText());
            }
        }
    };

    r.send();
};

/*********************************************
 * getHardcodedTemplate
 *********************************************/
function getHardcodedeTemplate(){
    postMessage("Hardcoded template");
}


