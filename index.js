const { app, BrowserWindow, globalShortcut, ipcMain, shell } = require('electron')
const utils = require('os-utils')
const fs = require('fs')
const path = require('path')
const package = require('./package.json')
const openApp = require('child_process').execFile

const createWindow = () => {
    const win = new BrowserWindow({
        kiosk: true,
        transparent: true,
        frame: false,
        movable: false,
        resizable: false,
        minimizable: false,
        maximizable: false,
        show: false,
        opacity: 0,
        closable: false,
        alwaysOnTop: true,
        skipTaskbar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }
    })
  
    win.loadFile('pages/index.html')
    return win
}

const settingslocation = path.join(app.getPath("appData"), "desktopmanager", "settings.json")
const defaultsettings = {
    visuals: {
        plette: {
            accentcolor: "#974063",
            textcolor: "#ff9677",
            lightaccentcolor: "#f54768",
            darkaccentcolor: "#41436a",
        },
        opacity: .5
    },
    hotkey: "CommandOrControl+Tab",
    navbar: [
        {
            "text": "O",
            "hover": "Options",
            "textType": "text",
            "submenu": [
            {
                "text": "firefox-plain",
                "exelocation": "Path to firefox.exe",
                "hover": "Firefox",
                "textType": "devicon"
            },
            {
                "text": "chrome-plain",
                "textType": "devicon",
                "exelocation": "Path to chrome.exe",
                "hover": "Chrome"
            }
            ]
        }
    ]
}
if(!fs.existsSync(settingslocation)){
    fs.writeFileSync(settingslocation, JSON.stringify(defaultsettings))
}
const settings = JSON.parse(fs.readFileSync(settingslocation, 'utf-8'))


app.setLoginItemSettings({
    openAtLogin: true,
    openAsHidden: true,
    args: [
        '--processStart', `"${path.basename(process.execPath)}"`,
    ]
})



app.whenReady().then(() => {
    let open = false
    const win = createWindow()
    
    globalShortcut.register(settings.hotkey, () => toggleWindow())

    win.webContents.on("before-input-event", (event,input)=> { 
        if(input.code=='F4' && input.alt) 
            event.preventDefault();
        }
    );

    ipcMain.on('request-settings', (e, args) => {
        settings.version = package.version
        win.webContents.send('settings', settings)
    })

    ipcMain.on("show-resource-directory", (e, args) => {
        shell.showItemInFolder(settingslocation)
        toggleWindow()
    })
    ipcMain.on("exit", (e, args) => {
        app.exit(0)
    })

    ipcMain.on('update-theme', (e, data) => {
        settings.visuals.palette = data
        fs.writeFileSync(settingslocation, JSON.stringify(settings))
    })

    const cores = utils.cpuCount()
    const totalmem = utils.totalmem()
    ipcMain.once("start-stat-probing", () => {
        const probe = setInterval(() => {
            if(!win.isVisible()){
                return
            }
            utils.cpuUsage((cpupercent) => {
                win.webContents.send("os-stat", {
                    cpu: cpupercent,
                    cores: cores,
                    memory: utils.freemem(),
                    maxmemory: totalmem
                })
            })
        }, 1000);
        ipcMain.once("stop-stat-probing", () => {
            clearInterval(probe)
        })
    })

    function toggleWindow() {
        if(open){
            fadeOut()
            setTimeout(() => {
                win.hide()
            }, 500)
        }else{
            win.setOpacity(0)
            win.show()
            setTimeout(() => {
                fadeIn()
            }, 200);
        }
        open = !open
    }
    

    function fadeIn (step = 0.1,fadeEveryXSeconds = 10) {
        let opacity = win.getOpacity()
        const interval = setInterval(() => {
          if (opacity >= 1) clearInterval(interval)
          win.setOpacity(opacity)
          opacity += step
        }, fadeEveryXSeconds)
        return interval
    }
    function fadeOut (step = 0.1,fadeEveryXSeconds = 10) {
        let opacity = win.getOpacity()
        const interval = setInterval(() => {
          if (opacity <= 0) clearInterval(interval)
          win.setOpacity(opacity)
          opacity -= step
        }, fadeEveryXSeconds)
        return interval
    }
    
    ipcMain.on('open-app', (event, path) => {
        toggleWindow()
        console.log(path)
        openApp(path)
    })
})



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})