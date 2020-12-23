"using strict";

const tpl = require('./template.js');
const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('npccomponent.htpl', 'UTF-8');
    console.log(data);
    let temp = new tpl.Template("npccomponent.htpl", data);
    temp.parseTemplate();
    temp.log();

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
    



}
catch (err) {
    console.error(err);
}

