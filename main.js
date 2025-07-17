console.log("Processo principal.");
console.log(`Electron: ${process.versions.electron}`);

const {
  app,
  BrowserWindow,
  nativeTheme,
  Menu,
  shell,
  ipcMain,
  dialog,
} = require("electron");
//Aqui conexão ao arquivo preloud
const path = require("node:path");

//Janela Principal
const createWindow = () => {
  nativeTheme.themeSource = "dark";
  const win = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: "./src/public/img/vticon.png",
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
    //autoHideMenuBar: true,
    //titleBarStyle: 'hidden'
  });

  // menu personalizado
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
  win.loadFile("./src/views/index.html");
};

//janela mochila
const aboutWindow = () => {
  const about = new BrowserWindow({
    width: 250,
    height: 250,
    icon: "./src/public/img/vticon.png",
    autoHideMenuBar: true,
    resizable: false,
  });
  about.loadFile("./src/views/mochila.html");
};

app.whenReady().then(() => {
  createWindow();

  //aboutWindow();

  //IPC"PEDAGIO"LISTA VIP DE PROCESSOS>>>>>>>>
  ipcMain.on("open-child", () => {
    aboutWindow();
  });

  ipcMain.on("renderer-message", (event, message) => {
    console.log(`Process principal recebeu uma mensagem: ${message}`);
    event.reply("main-menssage", "Olá! Renderizador");
  });
  ipcMain.on("dialog-info", () => {
    dialog
      .showMessageBox({
        type: "info",
        title: "Informação",
        message: "Mensagem",
        buttons: ["ok"],
      })
      .then(() => {
        console.log(result);
      });
  });
  ipcMain.on("dialog-warning", () => {
    dialog
      .showMessageBox({
        type: "warning",
        title: "Aviso",
        message: "Confirma essa ação?",
        buttons: ["Sim", "Não"],
        defaultId: 0,
      })
      .then((result) => {
        console.log(result);
        if (result.response === 0) {
          console.log("Confirmado");
        }
      });
  });
  ipcMain.on("dialog-select", () => {
    dialog
      .showOpenDialog({
        properties: ["openDirectory"],
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  });
  //<<<<<<<<<<<<<<<<<<<<<<<<<<
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// Template do Menu
const template = [
  {
    label: "Arquivo",
    submenu: [
      {
        label: "Sair",
        click: () => app.quit(),
        //accelerator: "Alt+F4",
      },
    ],
  },
  {
    label: "Exibir",
    submenu: [
      {
        label: "Recarregar",
        role: "reload",
      },
      {
        label: "Ferramentas do desenvolvedor",
        role: "toggleDevTools",
      },
      {
        type: "separator",
      },
      {
        label: "Aplicar zoom",
        role: "zoomIn",
      },
      {
        label: "Reduzir",
        role: "zoomOut",
      },
      {
        label: "Restaurar o zoom padrão",
        role: "resetZoom",
      },
    ],
  },
  {
    label: "Ajuda",
    submenu: [
      {
        label: "docs",
        click: () =>
          shell.openExternal("https://www.electronjs.org/docs/latest/"),
      },
      {
        type: "separator",
      },
      {
        label: "Sobre",
        click: () => aboutWindow(),
      },
    ],
  },
  {
    label: "Missão",
  },
];
