# Desktop Manager

# Gallery

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
```
{
    "text": "O",
    "hover": "Options",
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
```
    },
    {
        "text": "code",
        "textType": "material",
        "submenu": [
            {
                "exelocation":"D:\\Downloads\\Android Studio\\bin\\studio64.exe')",
                "text":"android-plain",
                "textType":"devicon",
                "hover":"Android Studio"
            },
            {
                "exelocation":"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\Common7\\IDE')",
                "text":"visualstudio-plain",
                "textType":"devicon",
                "hover":"VS Community 2019"
            },
            {
                "exelocation":"C:\\Users\\Péter\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe')",
                "text":"vscode-plain",
                "textType":"devicon",
                "hover":"VS Code"
            },
            {
                "exelocation":"D:\\Downloads\\Android Studio\\bin\\studio64.exe')",
                "text":"android-plain",
                "textType":"devicon",
                "hover":"Android Studio"
            },
            {
                "exelocation":"C:\\Program Files (x86)\\Microsoft Visual Studio\\2019\\Community\\Common7\\IDE')",
                "text":"visualstudio-plain",
                "textType":"devicon",
                "hover":"VS Community 2019"
            },
            {
                "exelocation":"C:\\Program Files\\Unity Hub\\Unity Hub.exe')",
                "text":"unity-original",
                "textType":"devicon",
                "hover":"Unity"
            }
        ]
    },
    {
        "text": "more_horiz",
        "textType":"material",
        "submenu":[
            {
                "text": "Spotify",
                "textType":"text",
                "hover":"Spotify",
                "exelocation":"C:\\Users\\Péter\\AppData\\Roaming\\Spotify\\Spotify.exe"
            },
            {
                "text": "Steam",
                "textType":"text",
                "hover":"Steam",
                "exelocation":"C:\\Program Files (x86)\\Steam\\steam.exe"
            }
        ]
    }
]}
```