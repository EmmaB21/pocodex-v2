const { app, BrowserWindow } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const net = require('net');

let backendProcess;

function startBackend() {
  const backendPath = path.join(__dirname, 'pocoback', 'server.js');
  console.log('➡️ Tentative de lancement du backend :', backendPath);

  backendProcess = spawn('node', [backendPath], {
    cwd: path.dirname(backendPath),
    stdio: 'inherit',
    windowsHide: true,
  });

  backendProcess.on('close', code => {
    console.log(`[backend] exited with code ${code}`);
  });

  backendProcess.on('error', err => {
    console.error('❌ Erreur de lancement du backend :', err);
  });
}

function waitForBackend(port, timeout = 10000) {
  const start = Date.now();
  return new Promise((resolve, reject) => {
    const check = () => {
      const socket = net.connect(port, 'localhost', () => {
        socket.end();
        resolve();
      });
      socket.on('error', () => {
        if (Date.now() - start > timeout) {
          reject(new Error('Backend startup timeout'));
        } else {
          setTimeout(check, 200);
        }
      });
    };
    check();
  });
}

async function createWindow() {
  const isDev = process.env.NODE_ENV === 'development' || (!app.isPackaged && !process.env.NODE_ENV);
  console.log(`➡️ Mode : ${isDev ? 'Développement (React Dev Server)' : 'Production (build)'}`);

  // Lancer le backend
  startBackend();

  try {
    await waitForBackend(3001);
    console.log('✅ Backend is up on port 3001');
  } catch (err) {
    console.error('❌ Failed to connect to backend:', err);
  }

  const win = new BrowserWindow({
    width: 1600,
    height: 1200,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  const startURL = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, 'build', 'index.html')}`;

  console.log('➡️ Chargement du front depuis :', startURL);
  win.loadURL(startURL);
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (backendProcess) backendProcess.kill();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});