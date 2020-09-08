var getJsonFile(){
    alert("hola!");
    fetch('https://raw.githubusercontent.com/orey/oracles/master/names.json')
        .then(res => {
            res.json();
            alert(res);
        }
        )
        .then((out) => {
            alert('Output: ', out);
        }).catch(err => alert(err));
}

/*window.onload = function() {
    document.getElementById("button1").addEventListener('click',getJsonFile);
}*/

