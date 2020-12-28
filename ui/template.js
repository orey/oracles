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

const SINGLE   = "SINGLE";
const MULTIPLE = "MULTIPLE";
const TEXT     = "TEXT";


/********************************************
 * Tools
 *******************************************/
function isEven(n){
    return (n % 2 == 0) ? true : false;
}

/********************************************
 * Recursive function with accumulator
 * to get the grammar from the template file
 *******************************************/
function createGrammar(acc, s, verbose = false){
    if (verbose)
        console.log(s);
    let sb  = s.indexOf(SINGLE_BEGIN),
        mtb = s.indexOf(MULTIPLE_TAG_BEGIN);

    // Nothing left to find
    if ((sb == mtb) && (sb == -1)) {
        acc.push( { type: TEXT,
                    value: s
                  });
        return -1;
    }
    // The first one is a single
    else if (((mtb == -1) && (sb != -1)) || (sb < mtb)) {
        let se = s.indexOf(SINGLE_END);
        acc.push({ type:   SINGLE,
                   before: s.slice(0, sb),
                   tag:    s.slice(sb + SINGLE_BEGIN.length, se)
                 });
        let res = createGrammar(acc, s.slice(se + SINGLE_END.length) );
        if (res == -1)
            return;
    }
    else if (((sb == -1) && (mtb != -1)) || (mtb < sb)) {
        // First tag
        let mte = s.indexOf(MULTIPLE_TAG_END);
        // Second tag
        let me = s.indexOf(MULTIPLE_END);
        let acc2 = [];
        createGrammar(acc2, s.slice(mte + MULTIPLE_TAG_END.length, me));
        acc.push( { type: MULTIPLE,
                    before: s.slice(0,mtb),
                    tag:    s.slice(mtb + MULTIPLE_TAG_BEGIN.length, mte),
                    middle: acc2
                  } );
        let res = createGrammar(acc, s.slice(me  + MULTIPLE_END.length) );
        if (res == -1)
            return;
    }
    else
        throw new Error("This case should not happen. sb=" + String(sb)
                        + ", mtb=" + String(mtb));
}


// Start Attempt same struct as parsing grammar

/********************************************
 * Recursive function with accumulator
 * fill the template with the real values
 *******************************************/
function fillTemplate(grammar, data, verbose = false){
    let acc = "";
    // gammar is an array of objects of the form:
    // SINGLE:   {type: ..., before: ..., tag: ...} 
    // MULTIPLE: {type: ..., before: ..., tag: ..., middle: subgrammar}
    // TEXT:     {type: ..., value: ...}
    // Data is an object with an object with fields {... TAG: "value" ...}
    console.log(grammar);
    for (let e of grammar){
        if (!e.hasOwnProperty("type")){
            throw new Error("Element in grammar does not have a type field. e=" + JSON.stringify(e));
        }
        switch (e.type){
        case SINGLE:
            console.log("===========================================> SINGLE");
            // e is an object with three fields: type, before and tag
            // As the function is recursive, the data should always be at the same level
            // than the grammar.
            acc += e.before + data[e.tag];
            break;
        case MULTIPLE:
            console.log("===========================================> MULTIPLE");
            acc += e.before;
            //We have multiple lines to deal with in data[e.tag]
            let content = data[e.tag]; // content is an array of objects
            for (let line of content){
                acc +=  fillTemplate(e.middle, line, verbose);
            }
            break;
        case TEXT:
            console.log("===========================================> TEXT");
            acc += e.value;
            break;
        default:
            throw new Error("This case should not happen. e.type=" + String(e.type));
        }
    }
    return acc;
}

/*****************************************************
 * For test in node
 * Compatibility with browser code
 *****************************************************/
if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        createGrammar,
        fillTemplate,
    }
}


