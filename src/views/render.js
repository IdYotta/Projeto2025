/** Processo de renderização */

console.log("Processo de Renderização");
console.log(`Electron: ${api.varElectron()}`);

function openChild() {
  //console.log("clicou");
  api.open();
}

api.send("oi");
api.on((event, message) => {
  console.log(`Processso de renderização recebeu uma mensagem.`);
});
