/**********************************************
 * Oracles for JDR - Harry Potter jdr
 * Author: rey.olivier@gmail.com
 * Licence: GNU GPL v3
 * Date: October 2020 
 * Référence: http://www.geek-it.org/harry-potter-jdr/
 ***********************************************/
"use strict";

let engine = undefined;
let names  = undefined;
let server = true;

/*
 * Do I really need require.js?
 * Up to now, no, and this code runs both in the browser and in node
 */

if (typeof require !== 'undefined') {
    engine = require("./oracles-engine");
    names  = require("./names.js");
}
else
{
    //define wrappers for web environment
    engine = {
        chooseInList : chooseInList,
        createNpcCharac : createNpcCharac,
        NPC : NPC,
    };
    names = {
        FirstMaleNames : FirstMaleNames,
        FirstFemaleNames : FirstFemaleNames,
        FamilyNames : FamilyNames,
        LongFamilyNames : LongFamilyNames,
    };
}


/*--------------------------------------
 * Archetypes
 *--------------------------------------*/

/*const Archetypes = {pattern: "1D6",
        values:  ["Canaille/Fripouille",
                "Cérébral/Elève modèle",
                "Honnête/Vertueux",
                "Manipulateur/Sournois",
                "Naturaliste/Ecologiste",
                "Sportif/Bagarreur"
                ]};*/

const Archetypes = [
    {name: "Canaille/Fripouille",    pattern: "---213-4" },
    {name: "Cérébral/Elève modèle",  pattern: "---341-2" },
    {name: "Honnête/Vertueux",       pattern: "---3-214" },
    {name: "Manipulateur/Sournois",  pattern: "---2-134" },
    {name: "Naturaliste/Ecologiste", pattern: "-3-124--" },
    {name: "Sportif/Bagarreur",      pattern: "123-4---" },
];
                            
function displayArchetypes(){
    for (var obj of Archetypes){
        console.info("%s: 1:%s, 2:%s, 3:%s, 4:%s",
                     obj.name,
                     Characteristics[obj.pattern.indexOf('1')].abbrev,
                     Characteristics[obj.pattern.indexOf('2')].abbrev,
                     Characteristics[obj.pattern.indexOf('3')].abbrev,
                     Characteristics[obj.pattern.indexOf('4')].abbrev,
                    );
    }
}


/*--------------------------------------
 * Characteristics
 *--------------------------------------*/
const Characteristics =[
    {name: "Force",        abbrev: "FOR", pattern: "2D6+6"},
    {name: "Constitution", abbrev: "CON", pattern: "2D6+6"},
    {name: "Taille",       abbrev: "TAI", pattern: "2D6+6"},
    {name: "Perception",   abbrev: "PER", pattern: "2D6+6"},
    {name: "Dextérité",    abbrev: "DEX", pattern: "2D6+6"},
    {name: "Intelligence", abbrev: "INT", pattern: "2D6+6"},
    {name: "Apparence",    abbrev: "APP", pattern: "2D6+6"},
    {name: "Pouvoir",      abbrev: "POU", pattern: "2D6+6"},
];

const Abbreviations = ["FOR", "CON", "TAI", "PER", "DEX", "INT", "APP", "POU"];


/*--------------------------------------
 * Coups de pouce et croche-pattes
 *--------------------------------------*/
const CoupsDePouce = { pattern: "1D10",
                       values:  [
                           "Allié influent",
                           "Apprentissage inné",
                           "Dette éternelle",
                           "Hérédité",
                           "Influent",
                           "Objet de collection",
                           "Objet magique",
                           "Prodige",
                           "Riche",
                           "Sorts innés"
                       ]};

const CrochePattes = { pattern: "1D10",
                       values:  [
                           "Amour à sens unique",
                           "Dénigré",
                           "Honni",
                           "Hybride",
                           "Inapte",
                           "Limitation",
                           "Pauvre",
                           "Phobie",
                           "Souffre-douleur",
                           "Trouble de l'apprentissage"
                       ]};

const SangDuSorcier = { pattern: "1D3",
                        values:  [
                            "Sang pur",
                            "Sang-mêlé",
                            "Né-moldu"
                        ]};

const Maison = { pattern: "1D4",
                 values:  [
                     "Gryffondor",
                     "Poufsouffle",
                     "Serdaigle",
                     "Serpentard"
                 ]};

/*--------------------------------------
 * Bonus aux dommages
 *--------------------------------------*/
function bonusDommages (nombre) {
    if (nombre < 25)
        return "0";
    else if (nombre < 33)
        return "+1d3";
    else if (nombre < 41)
        return "+1d6";
    else
        return "+2d6";
}


/*--------------------------------------
 * Utils
 *--------------------------------------*/

function replaceCharAt(s, index, replacement) {
    return s.substr(0, index) + replacement + s.substr(index + 1);
}


/*--------------------------------------
 * Score calculation
 *--------------------------------------*/

/*
 * Score calculation (very esoteric function)
 */
function comparePatterns(pat, ref){
    // ---213-4
    // -3-4--12
    let score  = 0;
    for (let i = 0; i < 8; i++) {
        if ((pat[i] != "-") || (ref[i] != "-")) {
            let p = parseInt(pat[i]), r = parseInt(ref[i]);
            if (p == r) {
                if (p == 1)       score = score + 10000;
                else if (p == 2)  score = score + 1000;
                else if (p == 3)  score = score + 100;
                else              score = score + 10;
            }
            else {
                let val = Math.abs(p - r);
                let max = Math.max(p,r);
                if (max == 1) {
                    if (val == 1)       score = score + 5000;
                    else if (val == 2)  score = score + 500;
                    else                score = score + 50;
                }
                else if (max == 2) {
                    if (val == 1)       score = score + 500;
                    else if (val == 2)  score = score + 50;
                    else                score = score + 5;
                }
                else  score = score + 10;
            }
        }
    }
    return score;
}


function scorePattern(pat){
    var liste = [];
    var e;
    for (e of Archetypes)
        liste.push(comparePatterns(pat, e.pattern));
    //console.log(liste);
    var max = Math.max.apply(null, liste);
    return liste.indexOf(max);
}


function npcArchetype(npc) {
    let sortable = Object.fromEntries(
        Object.entries(npc).sort(([,a],[,b]) => b-a)
    );
    //console.log(sortable);
    let pattern = "--------";
    let index = 0;
    for (var m in sortable){
        //console.log(m);
        //console.log(Abbreviations.indexOf(m));
        //console.log(parseInt(index + 1));
        pattern = replaceCharAt(pattern,
                                Abbreviations.indexOf(m),
                                parseInt(index + 1) );
        index = index + 1;
        if (index > 3) return pattern;
    }
    console.log("You should never see this");
}

/*--------------------------------------
 * NPC
 *--------------------------------------*/
class HarryPotterNPC extends engine.NPC {
    /*
     * Male is boolean
     */
    constructor (male){
        super(male);
        //first name
        if (male)
            this.name = engine.chooseInList(names.FirstMaleNames);
        else
            this.name = engine.chooseInList(names.FirstFemaleNames);
        //last name
        this.surname = engine.chooseInList(names.LongFamilyNames);
        //characteristics
        this.traits = engine.createNpcCharac(Characteristics);
        //archetype
        let index = scorePattern(npcArchetype(this.traits));
        this.others = {
            "Archetype"          : Archetypes[index].name,
            "PDV"                : Math.ceil((this.traits.CON + this.traits.TAI)/2),
            "Bonus aux dommages" : bonusDommages(this.traits.FOR + this.traits.TAI),
            "Idée"               : this.traits.INT * 5,
            "Chance"             : this.traits.POU * 5,
            "Coup de pouce"      : engine.chooseInList(CoupsDePouce),
            "Croche Patte"       : engine.chooseInList(CrochePattes),
            "Sang"               : engine.chooseInList(SangDuSorcier),
            "Maison"             : engine.chooseInList(Maison)
        };
    }


}


/*--------------------------------------
 * Main test stript
 *--------------------------------------*/

function test(){
   let anpc = new NPC(true);
    anpc.print();
    console.log(anpc.to_HTML());
    console.log("-------------");
    let anothernpc = new NPC(false);
    anothernpc.print();
    console.log(anothernpc.to_HTML());
}

//test();

if (typeof module !== "undefined" && module.exports) {
    module.exports = {
        HarryPotterNPC,
        test,
    }
}



