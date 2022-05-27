const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const windows = document.querySelectorAll('.window')
const settingspage = document.querySelector('.window#settings')
const keybindText = document.querySelector('#keybind')
settingspage.classList.add("open")
settingspage.style.width = `${clamp(window.innerWidth/2, 0, 500)}px`
settingspage.style.height = `${clamp(window.innerHeight/2, 0, 500)}px`
settingspage.style.left = `${window.innerWidth/2 - settingspage.clientWidth/2}px`
settingspage.style.top = `${window.innerHeight/2 - settingspage.clientHeight/2}px`
settingspage.classList.remove("open")
function openSettings(val) {
    keybindText.textContent = window.settings.hotkey
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
    handle.onmouseup = (e) => {
        e.preventDefault()
        currentlydragging = null
    }
});
window.onmousemove = (e) => {
    if(currentlydragging == null){return;}

    currentlydragging.style.left = `${e.clientX - currentlydraggingOffset[0]}px`
    currentlydragging.style.top = `${e.clientY - currentlydraggingOffset[1]}px`
}

function sendMessageToWindow(msg, ...args) {
    ipcRenderer.send(msg, ...args)
}