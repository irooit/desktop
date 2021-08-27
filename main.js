const {app,BrowserWindow} = require('electron')
function createWindow(){
    let win = new BrowserWindow({
        width:670,
        height:470,
        webPreferences:{
            nodeIntegration:true
        }
    })
    win.loadFile('index.html')
    
}
app.whenReady().then(createWindow)

