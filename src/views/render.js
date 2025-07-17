/** Processo de renderização */

console.log("Processo de Renderização");
console.log(`Electron: ${api.verElectron()}`);

function openChild() {
  //console.log("clicou");
  api.open();
}

api.send("oi");
api.on((event, message) => {
  console.log(`Processso de renderização recebeu uma mensagem: ${message}`);
});

function info() {
  api.info();
}

function warning() {
  api.warning();
}
function select() {
  api.select();
}
