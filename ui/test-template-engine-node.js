"using strict";

const tpl = require('./template.js');
const fs = require('fs');

function testNextGammarItem1(){
    console.log("------------------------------------");
    console.log("Test nextGrammarItem start");
    let acc = [];
    tpl.nextGrammarItem(acc, "  /* height: 300px; /* Should be removed. Only for demonstration */*/", true);
    console.log(acc);
    acc = [];
    tpl.nextGrammarItem(acc, `</style>

<h3>Nom: {{NPC_NAME}}</h3>
<div class="row">`, true);
    console.log(acc);
    acc = [];
    tpl.nextGrammarItem(acc, "{{TEST}}", true);
    acc = [];
    tpl.nextGrammarItem(acc, `      <tr><th>Caractéristiques</th> <th>Valeur</th></tr>
      [[NPC_TAB2||<tr><td>{{VAL3}}</td><td>{{VAL4}}</td></tr>]]
    </table>`, true);
    console.log(acc);
    console.log("Test nextGrammarItem end");
    console.log("------------------------------------");
}


function testNextGrammarItem2(text, data){
    console.log("------------------------------------");
    console.log("Test nextGrammarItem 2 start");
    let acc = [];
    tpl.nextGrammarItem(acc, text, true);
    console.log(acc);
    tpl.generateFragment(acc, data, true);
    console.log("Test nextGrammarItem 2 end");
    console.log("------------------------------------");
}

function tests(){
    try {
        // First test
        testNextGammarItem1();

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

        // Second test
        // Read contents of the file
        const data = fs.readFileSync('npccomponent.htpl', 'UTF-8');
        console.log(data);
        testNextGrammarItem2(data, johnny);

    }
    catch (err) {
        console.error(err);
    }
}

tests();

