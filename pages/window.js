const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const windows = document.querySelectorAll('.window')
const settingspage = document.querySelector('.window#settings')
const keybindText = document.querySelector('#keybind')
const versionText = document.querySelector('#version')
settingspage.classList.add("open")
settingspage.style.width = `${clamp(window.innerWidth/2, 0, 500)}px`
//settingspage.style.height = `${clamp(window.innerHeight/2, 0, 500)}px`
settingspage.style.left = `${window.innerWidth/2 - settingspage.clientWidth/2}px`
settingspage.style.top = `${window.innerHeight/2 - settingspage.clientHeight/2}px`
settingspage.classList.remove("open")
function openSettings(val) {
    keybindText.textContent = window.settings.hotkey
    versionText.textContent = 'Version: ' + window.settings.version
    if(val == undefined){
        settingspage.classList.toggle('open')
    }else{
        settingspage.classList.toggle('open',val)
    }
}
const statspage = document.querySelector('.window#stats')
statspage.classList.add("open")
statspage.style.left = `${window.innerWidth/2 - statspage.clientWidth/2}px`
statspage.style.top = `${window.innerHeight/2 - statspage.clientHeight/2}px`
statspage.classList.remove("open")
function openStats(val) {
    if(val == undefined){
        statspage.classList.toggle('open')
    }else{
        statspage.classList.toggle('open',val)
    }
    ipcRenderer.send(statspage.classList.contains('open') ? 'start-stat-probing' : 'stop-stat-probing')
}



const cpupercent = document.getElementById('data-cpupercent')
const cputext = document.getElementById('data-cputext')
const memorypercent = document.getElementById('data-memorypercent')
const memorytext = document.getElementById('data-memorytext')
ipcRenderer.on("os-stat", (e, data) => {
    cpupercent.textContent = Math.floor(data.cpu * 100) + '%'
    cputext.textContent = `Cpu usage (${data.cores})`
    memorypercent.textContent = Math.floor(data.memory / data.maxmemory * 100) + '%'
    memorytext.textContent = `${Math.floor(data.memory/1000)}GB/${Math.floor(data.maxmemory/1000)}GB`
})


function setWindowAtMiddle(w) {
    w.classList.add("open")
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
    w.style.width = `${clamp(window.innerWidth/2, 0, 500)}px`
    w.style.height = `${clamp(window.innerHeight/2, 0, 500)}px`
    w.style.left = `${window.innerWidth/2 - w.clientWidth/2}px`
    w.style.top = `${window.innerHeight/2 - w.clientHeight/2}px`
    w.classList.remove("open")
}

let currentlydragging = null
let currentlydraggingOffset = [0,0]
windows.forEach(win => {
    const handle = win.querySelector('.handle')
    handle.onmousedown = (e) => {
        e.preventDefault()
        currentlydragging = win
        currentlydraggingOffset = [e.clientX - win.offsetLeft, e.clientY - win.offsetTop]
    }
});
window.onmouseup = (e) => {
    e.preventDefault()
    currentlydragging = null
}
window.onmousemove = (e) => {
    if(currentlydragging == null){return;}


    currentlydragging.style.left = `${clamp(e.clientX - currentlydraggingOffset[0], 0, window.innerWidth - currentlydragging.clientWidth)}px`
    currentlydragging.style.top = `${clamp(e.clientY - currentlydraggingOffset[1], 0, window.innerHeight - currentlydragging.clientHeight)}px`
}

function sendMessageToWindow(msg, ...args) {
    ipcRenderer.send(msg, ...args)
}

const paletteselector = document.querySelector('#palettes')
const palettes = [
    {
        name: "SeaTurtle",
        accentcolor: "#1fc4da",
        textcolor: "#e9ebed",
        lightaccentcolor: "#82efea",
        darkaccentcolor: "#006092",
    },
    {
        name: "Embers",
        accentcolor: "#974063",
        textcolor: "#ffffff",
        lightaccentcolor: "#f54768",
        darkaccentcolor: "#41436a",
    },
    {
        name: "Grove",
        accentcolor: "#69ab3d",
        textcolor: "#e9ebed",
        lightaccentcolor: "#aed36c",
        darkaccentcolor: "#295d09",
    },
    {
        name: "Docks",
        accentcolor: "#ef4b4c",
        textcolor: "#e9e9eb",
        lightaccentcolor: "#3e619b",
        darkaccentcolor: "#42506b",
    },
    {
        name: "Dragon",
        accentcolor: "#46a8a7",
        textcolor: "#eaebed",
        lightaccentcolor: "#ffd782",
        darkaccentcolor: "#334f64",
    },
]
for (let i = 0; i < palettes.length; i++) {
    paletteselector.innerHTML += `<div onclick="setPalette(palettes[${i}])" style="background-color: ${palettes[i].accentcolor}">${palettes[i].name}</div>`
}