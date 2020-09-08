'use strict';

function getJsonFile(){
    let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
    alert("hola!");
    fetch(url)
//    fetch("./names.json")
        .then(res => {
            res.text();
            
        }
             )
        .then(out => {
            alert('Output: ', out);
        }
             )
        .catch(err => alert(err));
}

/*window.onload = function() {
    document.getElementById("button1").addEventListener('click',getJsonFile);
}*/


function test(){
    alert("new test");

    (async () => {
        let url = 'https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits';
        let url2 = 'https://raw.githubusercontent.com/orey/oracles/master/names.json';
        let response = await fetch(url2);

        let commits = await response.json(); // read response body and parse as JSON

        alert(commits[0].name);
})()
    
}
