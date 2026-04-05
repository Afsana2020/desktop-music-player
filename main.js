import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Scan for default songs in public/default_songs (dev) or dist/default_songs (prod)
ipcMain.handle('get-default-songs', async () => {
  const isDev = !!process.env.VITE_DEV_SERVER_URL;
  const songsDir = isDev 
    ? path.join(__dirname, 'public', 'default_songs')
    : path.join(__dirname, 'dist', 'default_songs');

  try {
    if (!fs.existsSync(songsDir)) return [];
    
    const files = fs.readdirSync(songsDir);
    return files
      .filter(file => file.toLowerCase().endsWith('.mp3'))
      .map(file => ({
        fileName: file,
        title: file.replace(/\.[^/.]+$/, ""), // Remove extension for title
        url: `./default_songs/${file}`
      }));
  } catch (error) {
    console.error('Error reading default songs:', error);
    return [];
  }
});

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    autoHideMenuBar: true, // cleaner look
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
    // mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, 'dist', 'index.html'));
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
