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
    return fetch(url)
        .then( response => {
            if (!response.ok)
                throw new Error('Network response was not ok :(');
            // When the page is loaded convert it to text
            return response.text();
        })
        .catch( err => {  
            console.log('Error: Failed to fetch page: ', err);  
        });
}

/*void async function () {
    //get the imported document in templates:
    var templates = document.createElement( 'template' )
    templates.innerHTML = await ( await fetch( 'templates.html' ) ).text()

    //fetch template2 1 and 2:
    var template1 = templates.content.querySelector( '#t1' ) 
    var template2 = templates.content.querySelector( '#t2' ) 
    console.log( template2 )
} ()*/


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
    constructor(){};
    addTemplate(id, url){
        this.template = getHtmlFile(url);
        analyzeTemplate(this.template);
        
    }
}

function testTemplate(){
    //let temp = new Template();
    getHtmlFile("templates/npccomponent.htpl")
        .then(template => {
            let data = template.toString().split(/(?:\r\n|\r|\n)/g);
            console.log("Analyzing template");
            console.log(data.length);
        });
}

testTemplate();


