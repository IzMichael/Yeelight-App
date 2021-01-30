var selection;
var light;
var lights = [];

const version = 'v1.1.0'

async function versioning() {
    const text = document.getElementById('version')
    fetch('https://api.github.com/repos/IzMichael/Yeelight-App/releases/latest')
        .then(response => response.json())
        .then(data => {
            if (version === data.tag_name) {
                text.innerHTML = 'You are on the latest version,<br>Version ' + version
            } else {
                text.innerHTML = 'The latest version is ' + data.tag_name + '<br>You are on version ' + version + '<br>-<br>Please download the latest version by <a class="font-bold" onclick="toggleUpdatePage()">clicking here</a>';
            }
        });
}

function toggleUpdatePage() {
    const main = document.getElementById('wrapper');
    const update = document.getElementById('downloadWrapper');

    if (main.classList.contains('hidden')) {
        main.classList.remove('hidden');
        update.classList.add('hidden');
    } else {
        main.classList.add('hidden');
        update.classList.remove('hidden');
        fetch('https://api.github.com/repos/IzMichael/Yeelight-App/releases/latest')
            .then(response => response.json())
            .then(data => {
                document.getElementById('frame').setAttribute('src', "https://github.com/IzMichael/Yeelight-App/archive/" + data.tag_name + ".zip")
                document.getElementById('status').innerHTML = 'Downloading...'
            });
    }
}

const Lookup = require("node-yeelight-wifi").Lookup;
let look = new Lookup();

look.on("detected", (light) => {
    lights.push(light)
    console.log(lights)
});

function listLights() {
    updatevars()
    const list = document.getElementById('lightsList')
    list.innerHTML = '';
    var index;
    for (index = 0; index < lights.length; ++index) {
        var id = lights[index].id.replace('.', 'X').replace('.', 'X').replace('.', 'X').replace('.', 'X').toString();
        if (!json.nicknames[id]) {
            json.nicknames[id] = '';
        }
        list.innerHTML = list.innerHTML += '<div class="bulbItem fade-in"><div class="flex flex-row justify-between"><p class="mr-3">Bulb ID: ' + index + '<p><div class="flex flex-col w-2/4 flex-1 items-end"><input type="text" onkeyup="getInput(' + "'" + id + "')" + '" id="' + id + '" value="' + json.nicknames[id] + '" class="text-md text-right outline-none bg-gray-300 border-b border-gray-600 w-full"><p class="text-right">' + lights[index].id + '</p></div></div><button onclick="select(' + index + ')" class="selectBtn" style="outline: none;">Select</button></div>'
    }
}

function toggleLight() {
    const inner = document.getElementById('onoff-inner')
    if (light.power === false) {
        light.setPower(true, 500)
        inner.classList.add('translate-x-full')
    } else {
        light.setPower(false, 500)
        inner.classList.remove('translate-x-full')
    }
}

function colour() {
    const picker = document.querySelector('#sl-color-picker');
    var rgb = picker.value.replace('rgb(', '').replace(')', '').split(', ');
    var inpu = [Number(rgb[0]), Number(rgb[1]), Number(rgb[2])]
    if (inpu.toString() === [Number('255'), Number('255'), Number('255')].toString()) {
        console.log('white')
        light.setCT(6500, 500)
    } else {
        console.log('else')
        light.setRGB(inpu, 500)
    }
}

function bright() {
    const brightness = document.getElementById('brightness').value
    light.setBright(brightness, 500)
}

function setStatus() {
    const inner = document.getElementById('onoff-inner')
    if (light.power === true) {
        inner.classList.add('translate-x-full')
    } else {
        inner.classList.remove('translate-x-full')
    }

    const picker = document.querySelector('#sl-color-picker');
    var rCol = light.rgb.r
    var gCol = light.rgb.g
    var bCol = light.rgb.b
    picker.value = 'rgb(' + rCol + ', ' + gCol + ', ' + bCol + ')'

    const brightness = document.getElementById('brightness')
    brightness.value = light.bright
}

async function alert(textInput) {
    const box = document.getElementById('alertbox');
    const boxtext = document.getElementById('alert');
    const panel = document.getElementById('panel-wrapper');
    boxtext.innerHTML = textInput;
    panel.classList.add('translate-y-20');
    await sleep(1);
    panel.classList.remove('transition')
    panel.classList.remove('duration-1000')
    panel.classList.remove('ease-in-out')
    await sleep(0.1);
    panel.classList.remove('translate-y-20')
    panel.classList.remove('transform')
    box.classList.remove('hidden');
    await sleep(6);
    box.classList.add('fade-out');
    await sleep(1);
    box.classList.add('hidden');
    box.classList.remove('fade-out');
    panel.classList.add('transform')
    panel.classList.add('translate-y-20')
    await sleep(0.1);
    panel.classList.add('ease-in-out')
    panel.classList.add('duration-1000')
    panel.classList.add('transition')
    await sleep(1);
    panel.classList.remove('translate-y-20');
}

function sleep(s) {
    return new Promise(resolve => setTimeout(resolve, (s * 1000)));
}

function run(func) {
    func
}