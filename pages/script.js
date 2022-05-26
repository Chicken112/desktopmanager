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

const dropdown = document.querySelector('.right > .container')
const dropdownElements = document.querySelectorAll('.right .container')
function openDropdownTab(params) {
    dropdownElements.forEach(child => {
        child.classList.remove('active')
    });

    params.nextElementSibling.classList.toggle('active')
    setActiveREC(params.nextElementSibling)
    function setActiveREC(element) {
        const el = element.parentElement.parentElement
        if(el.classList.contains('container')){
            el.classList.add('active')
            setActiveREC(el)
        }
    }
}

// navbar.innerHTML = getHtml(elements, "")
// function getHtml(arr, current) {
//     arr.forEach(el => {
//         if(typeof el == typeof []){
//             current += `<li>${el[0]}</li><ul class="container">`
//             current += getHtml(el.slice(1, -1), current)
//             current += '</ul>'
//         }else{
//             current += `<li>${el}</li>`
//         }
//     });
//     return current
// }