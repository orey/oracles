/**********************************************
 * Oracles for JDR
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: October 2020 
 ***********************************************/

/*
 * Main random dunction
 */
function rollDie(faces){
    return Math.floor((Math.random()*faces)+1);
    /*temp = Math.floor((Math.random()*faces)+1);
    console.log(temp);
    return temp;*/
}

/*************Test functions*********************/

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

/*************Roll combi*********************/

/*
 * Combination can be 3D6+2, 1D20, 3D8+1 as a string
 * Just one die should be 1D6
 */
function roll(combi){
    if (!(typeof combi == "string")) {
        console.error("Combination is not a string. Exiting.")
        return 0;
    }
    //determine pips
    let res = combi.split("+");
    let what = res[0].split("D");
    //rolling dice
    let acc = [];
    for (var i = 0; i < what[0]; i++) {
        acc.push(rollDie(what[1]));
    }
    //adding pips
    let pips  = parseInt(res.length == 2 ? res[1] : "0");
    let total = acc.reduce((a,b) => a+b, 0) + pips;
    console.info("Launching %s. Dices: %s, pips: %s. Total: %s",
                 combi,
                 JSON.stringify(acc),
                 pips.toString(),
                 total.toString());
    return total;
}

function testCombi(){
    roll("3D6");
    roll("12D10");
    roll("3D4+2");
    roll("1D30+6");
    roll("4D8+3");
    roll("1D4");
    roll("1D8+3");
    roll("1D20+2");
    roll("3D8");
}

/*****************************************/

/*
 * "charac" is an array of obj having "abbrev" and "pattern" attributes
 */
function createNpcCharac(charac){
    let npc = {};
    for (obj of charac){
        console.log(obj);
        npc[obj.abbrev] = roll(obj.pattern);
    }
    return npc;
}

function chooseInList(list){
    return list.values[roll(list.pattern)];
}


/*****************************************/

module.exports = { roll,
                   testCombi,
                   createNpcCharac,
                   chooseInList,
                 };

