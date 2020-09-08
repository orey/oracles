var getJsonFile(){
    fetch('names.json')
        .then(res => res.json())
        .then((out) => {
            alert('Output: ', out);
        }).catch(err => alert(err));
}

