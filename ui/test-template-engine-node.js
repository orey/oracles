"using strict";

const tpl = require('./template.js');
const fs = require('fs');

try {
    // read contents of the file
    const data = fs.readFileSync('npccomponent.htpl', 'UTF-8');

    /* // split the contents by new line
    const lines = data.split(/\r?\n/);

    // print all lines
    lines.forEach((line) => {
        console.log(line);
        });*/

    console.log(data);
    let temp = new tpl.Template("npccomponent.htpl", data);
    temp.parseTemplate();
    temp.log();

}
catch (err) {
    console.error(err);
}

