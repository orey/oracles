/********************************************
 * Simplest template engine ever
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: November 22 2020
 * --------------
 * Note : this code is specific to the browser
 *******************************************/
"use strict";

const BEGIN_BALISE = "{{";
const END_BALISE = "}}";
const BEGIN_LIST = "[[";
const END_LIST = "]]";


function getHtmlFile(url){
    let template = "";
    fetch(url).then(function(response) {
        // When the page is loaded convert it to text
        template = response.text();
        return template;
    }).catch(function(err) {  
        console.log('Failed to fetch page: ', err);  
    });
    return template;
}

function analyzeTemplate(template){
    

}


class Template {
    addTemplate(id, url){
        this.template = getHtmlFile(url);
        
    }
}

