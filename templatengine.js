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


/*********************************************
 * Get file from server
 *********************************************/
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

/*********************************************
 * This function aims at building the object 
 * to be filled with the proper values
 *********************************************/
function analyzeTemplate(template){
    let data = template.toString().split(/(?:\r\n|\r|\n)/g);
    console.log("Analyzing template");
    console.log(data.length);

}


class Template {
    addTemplate(id, url){
        this.template = getHtmlFile(url);
        analyzeTemplate(this.template);
        
    }
}

function testTemplate(){
    let temp = new Template();
    temp.addTemplate(12, "npcomponent.html");
}

testTemplate();


