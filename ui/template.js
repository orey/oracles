/********************************************
 * Simplest template class
 * Author: rey.olivier@gmail.com
 * License: GPL V3
 * Date: November 22 2020
 * --------------
 * Note : this code can run in the browser and
 * in node.
 *******************************************/
"use strict";

const BALISE = "||";
const LIST = "@@";
const INIT = "DEFAULT";


function isEven(n){
    return (n % 2 == 0) ? true : false;
}

class Template{
    constructor(name, text){
        this.obj = {};
        this.name = name;
        this.lines = text.split(/(?:\r\n|\r|\n)/g);
    }

    parseTemplate(){
        for (let l of this.lines){
            let elems = l.split(LIST),
                nb = elems.length;
            // There is no list
            if (nb == 1){
                let balises = this.getBalises(l);
                if (balises == 0)
                    continue;
                else
                    for (let b of balises)
                        this.obj[b] = INIT;
                continue;
            }
            // Expected syntax
            // ---@@LIST@@----------@@LIST@@---
            //  0    1       2         3     4
            if (nb != 5)
                throw new Error("Unexpected list syntax in line: " + l);
            let start = elems[1], end = elems[3];
            if (start != end)
                throw new Error("Unexpected list syntax. Start is: " + start
                                + ", and end is: " + end);
            // The index 3 should contain balises
            let balises = this.getBalises(elems[2], true);
            this.obj[start] = balises;
        }
    }

    log(){
        console.log("Template name: " + this.name + "\n" + JSON.stringify(this));
    }

    // Returns balises under the form of an array (by default)
    // or under the form of an object (to be embedded into a list
    getBalises(l, object=false){
        let segs = l.split(BALISE),
            nb = segs.length;
        if (nb == 1)
            // There is no balise in this line
            return 0;
        if (isEven(nb))
            throw new Error("Syntax error in template. Line << " + l
                            + " >> contains an odd number of " + BALISE);
        let balises = [];
        let balises_obj = {};
        for (let i = 0; i<nb; i++){
            if (isEven(i))
                continue;
            else {
                if (object)
                    balises_obj[segs[i]] = INIT;
                else
                    balises.push(segs[i]);
            }
        }
        if (object)
            return balises_obj;
        else
            return balises;
    }
}


/*****************************************************
 * For test in node
 * Compatibility with browser code
 *****************************************************/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        Template,
    }
}


