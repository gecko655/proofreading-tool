const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('api', {
  proofread: async (data) => await ipcRenderer.invoke('proofread', data),
  openTextlintConfig: async () => await ipcRenderer.send('openTextlintConfig'),
});
