"using strict";

const tpl = require('./template.js');
const fs = require('fs');

/********************************
 * Unit tests for createGrammar
 ********************************/
function testCreateGrammar(){
    let acc = [];
    tpl.createGrammar(acc, "  /* height: 300px; /* Should be removed. Only for demonstration */*/", true);
    console.log(acc);
    acc = [];
    tpl.createGrammar(acc, `</style>

<h3>Nom: {{NPC_NAME}}</h3>
<div class="row">`, true);
    console.log(acc);
    acc = [];
    tpl.createGrammar(acc, "{{TEST}}", true);
    acc = [];
    tpl.createGrammar(acc, `      <tr><th>Caractéristiques</th> <th>Valeur</th></tr>
      [[NPC_TAB2||<tr><td>{{VAL3}}</td><td>{{VAL4}}</td></tr>]]
    </table>`, true);
    console.log(acc);
    console.log("Test nextGrammarItem end");
    console.log("------------------------------------");
}


/********************************
 * Tests for fillTemplate
 ********************************/
function testFillTemplate(){
    console.log("------------------------------------");
    console.log("Test fillTemplate start");

    // Opening test file
    const data = fs.readFileSync('npccomponent.htpl', 'UTF-8');
    console.log(data);

    // Extracting the grammar
    let grammar = [];
    tpl.createGrammar(grammar, data, true);
    console.log("**************************************************");
    console.log(grammar);

    // Declaring test data
    let johnny = {NPC_NAME : "Johnny Be Good",
                  NPC_TAB1 : [ { VAL1 : "Force", VAL2 : 1000 },
                               { VAL1 : "Age", VAL2 : 35 },
                               { VAL1 : "Race", VAL2 : "Bronchiosaures de l'espace" },
                               { VAL1 : "Nombre d'yeux", VAL2 : "Deux douzaines" } ],
                  NPC_TAB2 : [ { VAL3 : "Rouboudoux?", VAL4 : "Oui" },
                               { VAL3 : "Nombre de connecteurs", VAL4 : 12 },
                               { VAL3 : "Parking sur", VAL4 : "Planète Biouzette" },
                               { VAL3 : "Vaisseau", VAL4 : "Brakano 2 militarisé" },
                               { VAL3 : "Attaques", VAL4 : "Bras robot" } ] };
    
    // Filling the template
    let acc = "";
    acc = tpl.fillTemplate(grammar, johnny, true);
    console.log("Instantiated template:");
    console.log(acc);

    console.log("Test fillTemplate end");
    console.log("------------------------------------");
}

/********************************
 * Small utilities
 ********************************/
const OK = "OK", KO = "KO", UNDEFINED = "UNDEFINED";

class Test{
    constructor(f){
        this.f = f;
        this.startDate = undefined;
        this.stopDate = undefined;
        this.status = UNDEFINED;
    }
    run(){
        console.log("------------------------------------");
        console.log("Test started for "+ this.f.name);
        this.startDate = new Date();
        try {
            this.f();
            this.status = OK;
            console.log("Test passed OK");
        }
        catch (err){
            console.log("Error in tests");
            console.log(err);
            this.status = KO;
        }
        this.stopDate = new Date();
        console.log("Test performed in "
                    + String((this.stopDate - this.startDate)/1000)
                    + " seconds");
        console.log("Test ended for "+ this.f.name);
        console.log("------------------------------------");
    }
};

//... should be 
function stats(...args){
    let totalok = 0, totalko = 0;
    for (t of args){
        if (t.status == OK) totalok++;
        else totalko++;
    }
    console.log("===========================");
    console.log(String(totalok) + " test(s) passed OK");
    console.log(String(totalko) + " test(s) passed KO");
    console.log("===========================");
}


/********************************
 * Main function for tests
 ********************************/
function tests(){     
    let t1 = new Test(testCreateGrammar);
    t1.run();
    let t2 = new Test(testFillTemplate);
    t2.run();
    stats(t1, t2);
}

/********************************
 * Starting tests
 ********************************/
tests();

