const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getDefaultSongs: () => ipcRenderer.invoke('get-default-songs')
});
