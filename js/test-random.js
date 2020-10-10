/**********************************************
 * Oracles tests
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: October 2020 
 ***********************************************/
"use strict";

let engine = require("./oracles-engine");

var MAX = 1000000;

function testRollDie(faces){
    console.log("Testing D" + faces.toString());
    var sum = 0;
    for (i=0;i<MAX;i++){
        sum += rollDie(faces);
    }
    return sum/MAX;
}

function testAll(){
    console.log("Testing all");
    console.log("D4:" + testRollDie(4).toString());
    console.log("D6:" + testRollDie(6).toString());
    console.log("D8:" + testRollDie(8).toString());
    console.log("D10:" + testRollDie(10).toString());
    console.log("D12:" + testRollDie(12).toString());
    console.log("D20:" + testRollDie(20).toString());
    console.log("D100:" + testRollDie(100).toString());

}

testAll();