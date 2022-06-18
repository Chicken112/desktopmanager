# Desktop Manager

# Gallery
![Screenshot](https://github.com/Chicken112/desktopmanager/blob/main/desktopmanager.png)

# Config
### Visuals
```js
"accentcolor": COLOR
"textcolor": COLOR
"lightaccentcolor": COLOR
"darkaccentcolor": COLOR
"opacity": FLOAT(0,1)
```
### hotkey
hotkey: string representing *[electron global hotkeys](https://www.electronjs.org/docs/latest/api/accelerator)*

### navbar
navbar is a list of objects such:\
`? means optional`
```js
"text": string that gets displayed STRING
"textType": TEXT | MATERIAL | DEVICON
    1. "material": fetches the icon from google's material icons "fonts.google.com/icons"
    2. "devicon": fetches the icon form "devicon.dev/", autofills the "devicon-" part
    3. "text": displays it regularly, as clear text
"hover": text displayed when hovering element ?STRING
"exelocation": the path to the application to run when clicked ?STRING
"submenu": a list of objects ?ARRAY
```

# Example
```json
{
    "text": "B",
    "hover": "Browsers",
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
```
# Thanks
thanks to [ui.ux.palette](https://www.instagram.com/ui.ux.palette/) for providing the base palettes