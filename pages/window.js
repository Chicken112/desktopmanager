const windows = document.querySelectorAll('.window')
const settingspage = document.querySelector('.window#settings')
function openSettings(val) {
    if(val == undefined){
        settingspage.classList.toggle('open')
    }else{
        settingspage.classList.toggle('open',val)
    }
}

windows.forEach(win => {
    
});