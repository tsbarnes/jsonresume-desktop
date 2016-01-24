'use strict'; /* jslint node: true,esnext:true */

const electron = require('electron');
const app = electron.app;  // Module to control application life.
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.
const Menu = electron.Menu // Module to handle menus
const dialog = electron.dialog; // Module for dialogs

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform != 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', function() {
  // Create the browser window.
  mainWindow = new BrowserWindow({width: 800, height: 600});

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // Emitted when the window is closed.
  mainWindow.on('closed', function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });

  var template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'Control+O',
          click: function() {
            var properties = ['openFile'],
            parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow();

            dialog.showOpenDialog(parentWindow, properties, function(f) {
              console.log("got a file: " + f);
            });
          }
        },
        {
          label: 'Save File',
          accelerator: 'Control+S',
          click: function() {
            var properties = ['createDirectory', 'saveFile'],
            parentWindow = (process.platform == 'darwin') ? null : BrowserWindow.getFocusedWindow();

            dialog.showSaveDialog(parentWindow, properties, function(f) {
              console.log("got a file: " + f);
            });
          }
        },
        {
          label: 'Developer Tools',
          accelerator: 'Control-Shift-I',
          click: function() {
              // Open the DevTools.
              mainWindow.webContents.openDevTools();
          }
        },
        {
          label: 'Quit',
          accelerator: 'Control+Q',
          click: function() {
            app.quit();
          }
        },
      ]
    }
  ];
  var menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
});
