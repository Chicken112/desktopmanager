//const { ipcRenderer } = require('electron');

const time = document.querySelector("#time")
const date = document.querySelector("#date")
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
setInterval(() => {
  const current = new Date()
  date.textContent = `${current.getDate()} ${months[current.getMonth()]}`
  time.textContent = `${current.getHours()}:${current.getMinutes()}.${current.getSeconds()}`
}, 1000);
function openApp(path) {
  //ipcRenderer.send('open-app', path)
}

const rootElement = document.querySelector(':root')
/*ipcRenderer.on('change-colors', (e, data) => {
  rootElement.style.setProperty('--color-accent', data.accentcolor)
  rootElement.style.setProperty('--color-text', data.textcolor)
  rootElement.style.setProperty('--color-button', data.buttoncolor)
  rootElement.style.setProperty('--opacity', data.opacity)
})
ipcRenderer.send('probe-colors')*/

const dropdownElements = document.querySelectorAll('.right .container')
function openDropdownTab(params) {
  const hasActive = params.nextElementSibling.classList.contains('active')
//  console.log(params.parentElement.parentElement)
  dropdownElements.forEach(child => {
        child.classList.remove('active')
    });

    console.log(hasActive)
    params.nextElementSibling.classList.toggle('active', !hasActive)
    setActiveREC(params.nextElementSibling)
    function setActiveREC(element) {
        const el = element.parentElement.parentElement
        if(el.classList.contains('container')){
            el.classList.add('active')
            setActiveREC(el)
        }
    }
}