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

const SINGLE_BEGIN = "{{";
const SINGLE_END   = "}}";
const MULTIPLE_TAG_BEGIN = "[[";
const MULTIPLE_TAG_END   = "||";
const MULTIPLE_END       = "]]";

const INIT = "DEFAULT";

const SINGLE = "SINGLE";
const MULTIPLE = "MULTIPLE";


/********************************************
 * Tools
 *******************************************/
function isEven(n){
    return (n % 2 == 0) ? true : false;
}

function nextGrammarItem(s, verbose = false){
    if (verbose)
        console.log(s);
    let sb  = s.indexOf(SINGLE_BEGIN),
        mtb = s.indexOf(MULTIPLE_TAG_BEGIN);

    // Nothing left to find
    if ((sb == mtb) && (sb == -1))
        return -1;
    // The first one is a single
    else if (((mtb == -1) && (sb != -1)) || (sb < mtb)) {
        let se = s.indexOf(SINGLE_END);
        return {type: SINGLE,
                before: s.slice(0, sb),
                tag:    s.slice(sb + SINGLE_BEGIN.length, se),
                after:  s.slice(se + SINGLE_END.length) };
    }
    else if (((sb == -1) && (mtb != -1)) || (mtb < sb)) {
        // First tag
        let mte = s.indexOf(MULTIPLE_TAG_END);
        // Second tag
        let me = s.indexOf(MULTIPLE_END);
        return {type: MULTIPLE,
                before: s.slice(0,mtb),
                tag:    s.slice(mtb + MULTIPLE_TAG_BEGIN.length, mte),
                middle: s.slice(mte + MULTIPLE_TAG_END.length, me),
                after:  s.slice(me  + MULTIPLE_END.length) };
    }
    else
        throw new Error("This case should not happen. sb=" + String(sb)
                        + ", mtb=" + String(mtb));
}


class Single {
    constructor(name){
        this.type = SINGLE;
        this.name = name;
    }
}

class Multiple {
    constructor(name){
        this.type = MULTIPLE;
        this.name = name;
        this.content = [];
    }

    // Obj should be Singles but could be Multiples
    addObject(obj){
        this.content.push(obj);
    }
}




/********************************************
 * Class template
 *******************************************/
/*class Template{
    constructor(name, text){
        // Grammar is an object with individual members or members that are arrays
        this.grammar = {};
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
                        this.grammar[b] = b;
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
            let balises = this.getBalises(elems[2]);
            this.grammar.push(balises); // Array in the array
        }
    }

    // Log the content of the template object
    log(){
        console.log("Template name: " + this.name + "\n" + JSON.stringify(this.grammar));
        
    }

    // Returns balises under the form of an array (by default)
    // or under the form of an object (to be embedded into a list
    getBalises(l){
        let segs = l.split(BALISE),
            nb = segs.length;
        if (nb == 1)
            // There is no balise in this line
            return 0;
        if (isEven(nb))
            throw new Error("Syntax error in template. Line << " + l
                            + " >> contains an odd number of " + BALISE);
        let balises = [];
        for (let i = 0; i<nb; i++){
            if (isEven(i))
                continue;
            else
                balises.push(segs[i]);
        }
        return balises;
    }
}


/*****************************************************
 * For test in node
 * Compatibility with browser code
 *****************************************************/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        //Template,
        nextGrammarItem,
    }
}


