const { ipcRenderer } = require('electron');

const time = document.querySelector("#time")
const date = document.querySelector("#date")
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
setInterval(() => {
  const current = new Date()
  date.textContent = `${current.getDate()} ${months[current.getMonth()]}`
  time.textContent = `${current.getHours()}:${current.getMinutes()}.${current.getSeconds()}`
}, 1000);
function openApp(path) {
  ipcRenderer.send('open-app', path)
}

const rootElement = document.querySelector(':root')
function setPalette(palette, sendUpdate=true) {
  if(sendUpdate){
    window.settings.visuals.palette = palette
    ipcRenderer.send('update-theme', palette)
  }
  rootElement.style.setProperty('--color-accent', palette.accentcolor)
  rootElement.style.setProperty('--color-accent-light', palette.lightaccentcolor)
  rootElement.style.setProperty('--color-accent-dark', palette.darkaccentcolor)
  rootElement.style.setProperty('--color-text', palette.textcolor)
}
ipcRenderer.on('settings', (e, data) => {
  console.log(data)
  window.settings = data
  setPalette(data.visuals.palette, false)
  rootElement.style.setProperty('--opacity', data.visuals.opacity)

  const navbar = document.querySelector('.right')
  navbar.innerHTML = ""
  let current = ""
  data.navbar.forEach(el => {
    fillNavbarREC(el)
  })
  navbar.innerHTML = '<ul class="container active">' + current + "</ul>"
  function fillNavbarREC(stuff) {
    let icon = ""
    switch (stuff.textType.toLowerCase() || "text") {
      case "material":
        icon = `<i class="material-symbols-outlined">${stuff.text}</i>`
        break;
      case "devicon":
        icon = `<i class="devicon-${stuff.text}"></i>`
        break;
      default:
        icon = stuff.text
        break;
    }
    current += `<li><button class="${stuff.hover ? 'tooltip" data-tooltip="' + stuff.hover : ""}" onclick="${stuff.submenu ? "openDropdownTab(this)" : "openApp('" + stuff.exelocation + "')"}">${icon}</button>`
    if(stuff.submenu){
      current += `<ul class="container">`
      stuff.submenu.forEach(elm => {
        fillNavbarREC(elm)
      })
      current += `</ul>`
    }
    current += `</li>`
  }
})
ipcRenderer.send('request-settings')

let dropdownElements = null
function openDropdownTab(params) {
  if(dropdownElements == null){
    dropdownElements = document.querySelectorAll('.right .container')
  }
  const hasActive = params.nextElementSibling.classList.contains('active')
  dropdownElements.forEach(child => {
    child.classList.remove('active')
  });
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