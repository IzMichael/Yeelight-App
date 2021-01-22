const remote = require('electron').remote;

const win = remote.getCurrentWindow();

document.onreadystatechange = (event) => {
    if (document.readyState == "complete") {
        handleWindowControls();
        handleLightControls();
        handlePresets();
    }
};

function handleLightControls() {
    document.getElementById('onoff-button').addEventListener("click", event => {
        toggleLight();
    });

    document.getElementById('update').addEventListener("click", event => {
        colour();
        bright();
        setStatus();
    });
}

function select(option) {
    selection = option
    light = lights[selection]
    document.getElementById('selectedBulb').innerHTML = selection
    setStatus()
    alert('Selected Bulb with ID ' + selection)
}

window.onbeforeunload = (event) => {
    win.removeAllListeners();
}

function handleWindowControls() {
    document.getElementById('min-button').addEventListener("click", event => {
        win.minimize();
    });

    document.getElementById('max-button').addEventListener("click", event => {
        win.maximize();
    });

    document.getElementById('restore-button').addEventListener("click", event => {
        win.unmaximize();
    });

    document.getElementById('close-button').addEventListener("click", event => {
        win.close();
    });

    toggleMaxRestoreButtons();
    win.on('maximize', toggleMaxRestoreButtons);
    win.on('unmaximize', toggleMaxRestoreButtons);

    function toggleMaxRestoreButtons() {
        if (win.isMaximized()) {
            document.body.classList.add('maximized');
        } else {
            document.body.classList.remove('maximized');
        }
    }
}


function showPage(page) {
    win.loadFile(page);
}

function handlePresets() {
    document.getElementById('bright').addEventListener("click", event => {
        light.setCT(6500, 500);
        light.setBright(100, 500)
        setStatus()
    });

    document.getElementById('dim').addEventListener("click", event => {
        light.setCT(6500, 500);
        light.setBright(1, 500)
        setStatus()
    });

    document.getElementById('dark').addEventListener("click", event => {
        light.setCT(1700, 500);
        light.setBright(100, 500)
        setStatus()
    });

    document.getElementById('darkest').addEventListener("click", event => {
        light.setCT(1700, 500);
        light.setBright(1, 500)
        setStatus()
    });
}