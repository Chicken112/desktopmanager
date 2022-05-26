const windows = document.querySelectorAll('.window')
const settingspage = document.querySelector('.window#settings')
function openSettings(val) {
    if(val == undefined){
        settingspage.classList.toggle('open')
    }else{
        settingspage.classList.toggle('open',val)
    }
}



settingspage.classList.add("open")
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);
settingspage.style.width = `${clamp(window.innerWidth/2, 0, 500)}px`
settingspage.style.height = `${clamp(window.innerHeight/2, 0, 500)}px`
settingspage.style.left = `${window.innerWidth/2 - settingspage.clientWidth/2}px`
settingspage.style.top = `${window.innerHeight/2 - settingspage.clientHeight/2}px`
settingspage.classList.remove("open")
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