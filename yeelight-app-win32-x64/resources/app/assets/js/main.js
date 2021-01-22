var selection;
var light;
var lights = [];

const Lookup = require("node-yeelight-wifi").Lookup;
let look = new Lookup();

look.on("detected", (light) => {
    lights.push(light)
    console.log(lights)
});

function listLights() {
    const list = document.getElementById('lightsList')
    list.innerHTML = '<btn class="flex flex-row items-center justify-center h-10 mb-1 text-white bg-gray-600 select-none cursor-pointer" onclick="listLights()">Search for Lights</btn>'
    var index;
    for (index = 0; index < lights.length; ++index) {
        list.innerHTML = list.innerHTML += '<div class="bulbItem"><div class="flex flex-row"><p>Bulb ID: ' + index + '<p><p class="w-32 text-right">' + lights[index].host + '</p></div><button onclick="select(' + index + ')" class="selectBtn" style="outline: none;">Select</button></div>'
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
    return new Promise(resolve => setTimeout(resolve, (s*1000)));
}

function run(func) {
    func
}