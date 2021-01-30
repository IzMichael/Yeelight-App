const storage = require('electron-storage');

var json;
updatevars()

function updatevars() {
    storage.get('/nicks')
        .then(data => {
            json = data
        })
    console.log(json)
}

function getInput(el) {
    json.nicknames[el] = document.getElementById(el).value;
    updatefile()
}

function write(id, nick) {
    json.nicknames[id] = nick;
    updatefile();
}

function updatefile() {
    storage.set('/nicks', json)
        .then(() => {
            console.log('The data was successfully written to the file');
        })
}