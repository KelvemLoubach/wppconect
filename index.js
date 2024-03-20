const wppconnect = require('@wppconnect-team/wppconnect'); //chatId:
const fs = require('fs');

wppconnect.create({
  session: 'sessionName', //Pass the name of the client you want to start the bot
  catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('Number of attempts to read the qrcode: ', attempts);
    console.log('Terminal qrcode: ', asciiQR);
    console.log('base64 image string qrcode: ', base64Qrimg);
    console.log('urlCode (data-ref): ', urlCode);
  },
  statusFind: (statusSession, session) => {
    console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
  },
  headless: false, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserWS: '', // If u want to use browserWSEndpoint
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  puppeteerOptions: {}, // Will be passed to puppeteer.launch
  disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
  updatesLog: true, // Logs info updates automatically in terminal
  autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
  tokenStore: 'file', // Define how work with tokens, that can be a custom interface
  folderNameToken: './tokens', //folder name when saving tokens
  // BrowserSessionToken
  // To receive the client's token use the function await clinet.getSessionTokenBrowser()
  sessionToken: {
    WABrowserId: '"UnXjH....."',
    WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
    WAToken1: '"0i8...."',
    WAToken2: '"1@lPpzwC...."',
  }
})
  .then((client) => start(client))
  .catch((error) => console.log(error));

let arrayContacts = ['5528998844998','5528999249841','5528999202979','5528998844998','5528998844998','5528998844998','5528998844998','5528998844998','5528998844998']

function start(client) {

  client.onMessage((message) => {

    if (message.chatId === '5511972553036@c.us') {

      arrayContacts.forEach((contato, index) => {

        setTimeout(() => {

          client
            .sendText(`${contato}@c.us`, 'teste aqui 2...')
            .then((result) => {
              const logMessage = ` Mensagem enviada para ${result.to} em ${getCurrentDateTime()}\n`;
              appendLogToFile(logMessage);
              console.log(logMessage);
            })

            .catch((erro) => {
              const errorMessage = `Erro ao enviar mensagem: ${erro} em ${getCurrentDateTime()}\n`;
              appendLogToFile(errorMessage);
              console.error(errorMessage);
            });

        }, index * 1000);

      });
    }
  });

}

function getCurrentDateTime() {
  const currentDateTime = new Date().toLocaleString();
  return currentDateTime;
}

function appendLogToFile(logMessage) {
  fs.appendFile('message_logs.txt', logMessage, (err) => {
    if (err) {
      console.error('Erro ao registrar log:', err);
    }
  });
}