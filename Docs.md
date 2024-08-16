## Installation

```bash
> npm i --save INCONNU-V2-MD 
```

or for [Nightly releases](https://github.com/orkestral/INCONNU-V2-MD/releases/tag/nightly):

```bash
> npm i --save https://github.com/orkestral/venom/releases/download/nightly/venom-bot-nightly.tgz
```

Installing the current repository "you can download the beta version from the current repository!"

```bash
> npm i github:orkestral/INCONNU-V2-MD 
```

## Getting started Multidevice and Normal

```javascript
// Supports ES6
// import { create, Whatsapp } from 'INCONNU-V2-MD';
const INCONNU-V2 = require('INCONNU-V2-MD');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {
    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Welcome INCONNU-V2🕷')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
```

##### After executing `create()` function, **INCONNU-V2** will create an instance of whatsapp web. If you are not logged in, it will print a QR code in the terminal. Scan it with your phone and you are ready to go!

##### INCONNU-V2 will remember the session so there is no need to authenticate everytime.

##### Multiples sessions can be created at the same time by pasing a session name to `create()` function:

```javascript
// Init sales whatsapp bot
venom.create('sales').then((salesClient) => {...});

// Init support whatsapp bot
INCONNU-V2.create('support').then((supportClient) => {...});
```

<br>

## Optional create parameters

Venom `create()` method third parameter can have the following optional parameters:

If you are using the `Linux` server do not forget to pass the args `--user-agent`
[Original parameters in browserArgs](https://github.com/orkestral/INCONNU-V2-MD/blob/master/src/config/puppeteer.config.ts)

```javascript
const venom = require('INCONNU-V2');

venom
  .create(
    //session
    'sessionName', //Pass the name of the client you want to start the bot
    //catchQR
    (base64Qrimg, asciiQR, attempts, urlCode) => {
      console.log('Number of attempts to read the qrcode: ', attempts);
      console.log('Terminal qrcode: ', asciiQR);
      console.log('base64 image string qrcode: ', base64Qrimg);
      console.log('urlCode (data-ref): ', urlCode);
    },
    // statusFind
    (statusSession, session) => {
      console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    // options
    {
      multidevice: false, // for version not multidevice use false.(default: true)
      folderNameToken: 'tokens', //folder name when saving tokens
      mkdirFolderToken: '', //folder directory tokens, just inside the venom folder, example:  { mkdirFolderToken: '/node_modules', } //will save the tokens folder in the node_modules directory
      headless: true, // Headless chrome
      devtools: false, // Open devtools by default
      debug: false, // Opens a debug session
      logQR: true, // Logs QR automatically in terminal
      browserWS: '', // If u want to use browserWSEndpoint
      browserArgs: [''], // Original parameters  ---Parameters to be added into the chrome browser instance
      addBrowserArgs: [''], // Add broserArgs without overwriting the project's original
      puppeteerOptions: {}, // Will be passed to puppeteer.launch
      disableSpins: true, // Will disable Spinnies animation, useful for containers (docker) for a better log
      disableWelcome: true, // Will disable the welcoming message which appears in the beginning
      updatesLog: true, // Logs info updates automatically in terminal
      autoClose: 60000, // Automatically closes the venom-bot only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
      createPathFileToken: false, // creates a folder when inserting an object in the client's browser, to work it is necessary to pass the parameters in the function create browserSessionToken
      addProxy: [''], // Add proxy server exemple : [e1.p.webshare.io:01, e1.p.webshare.io:01]
      userProxy: '', // Proxy login username
      userPass: '' // Proxy password
    },
    // BrowserSessionToken
    // To receive the client's token use the function await clinet.getSessionTokenBrowser()
    {
      WABrowserId: '"UnXjH....."',
      WASecretBundle:
        '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
      WAToken1: '"0i8...."',
      WAToken2: '"1@lPpzwC...."'
    },
    // BrowserInstance
    (browser, waPage) => {
      console.log('Browser PID:', browser.process().pid);
      waPage.screenshot({ path: 'screenshot.png' });
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });
```

## Callback Status Session

Gets the return if the session is `isLogged` or `notLogged` or `browserClose` or `qrReadSuccess` or `qrReadFail` or `autocloseCalled` or `desconnectedMobile` or `deleteToken` or `chatsAvailable` or `deviceNotConnected` or `serverWssNotConnected` or `noOpenBrowser` or `initBrowser` or `openBrowser` or `connectBrowserWs` or `initWhatsapp` or `erroPageWhatsapp` or `successPageWhatsapp` or `waitForLogin` or `waitChat` or `successChat` or `Create session wss return "serverClose" case server for close`

| Status                  | Condition                                                                                                                                                      |
|-------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `isLogged`              | When the user is already logged in to the browser                                                                                                              |
| `notLogged`             | When the user is not connected to the browser, it is necessary to scan the QR code through the cell phone in the option WhatsApp Web                           |
| `browserClose`          | If the browser is closed this parameter is returned                                                                                                            |
| `qrReadSuccess`         | If the user is not logged in, the QR code is passed on the terminal a callback is returned. After the correct reading by cell phone this parameter is returned |
| `qrReadFail`            | If the browser stops when the QR code scan is in progress, this parameter is returned                                                                          |
| `autocloseCalled`       | The browser was closed using the autoClose command                                                                                                             |
| `desconnectedMobile`    | Client has desconnected in to mobile                                                                                                                           |
| `serverClose`           | Client has desconnected in to wss                                                                                                                              |
| `deleteToken`           | If you pass true within the function `client.getSessionTokenBrowser(true)`                                                                                     |
| `chatsAvailable`        | When Venom is connected to the chat list                                                                                                                       |
| `deviceNotConnected`    | Chat not available because the phone is disconnected `(Trying to connect to the phone)`                                                                        |
| `serverWssNotConnected` | The address wss was not found!                                                                                                                                 |
| `noOpenBrowser`         | It was not found in the browser, or some command is missing in args                                                                                            |
| `initBrowser`           | Starting the browser                                                                                                                                           |
| `openBrowser`           | The browser has been successfully opened!                                                                                                                      |
| `connectBrowserWs`      | Connection with BrowserWs successfully done!                                                                                                                   |
| `initWhatsapp`          | Starting whatsapp!                                                                                                                                             |
| `erroPageWhatsapp`      | Error accessing whatsapp page                                                                                                                                  |
| `successPageWhatsapp`   | Page Whatsapp successfully accessed                                                                                                                            |
| `waitForLogin`          | Waiting for login verification!                                                                                                                                |
| `waitChat`              | Waiting for the chat to load                                                                                                                                   |
| `successChat`           | Chat successfully loaded!                                                                                                                                      | 
```javascript
const venom = require('venom-bot');
venom
  .create(
    'sessionName',
    undefined,
    (statusSession, session) => {
      console.log('Status Session: ', statusSession);
      //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
      //Create session wss return "serverClose" case server for close
      console.log('Session name: ', session);
    },
    {
      multidevice: false // for version not multidevice use false.(default: true)
    }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });
```

## Exporting QR Code

By default QR code will appear on the terminal. If you need to pass the QR
somewhere else heres how:

```javascript
const fs = require('fs');
const venom = require('venom-bot');

venom
  .create(
    'sessionName',
    (base64Qr, asciiQR, attempts, urlCode) => {
      console.log(asciiQR); // Optional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false }
  )
  .then((client) => {
    start(client);
  })
  .catch((erro) => {
    console.log(erro);
  });
```

## Downloading Files

Puppeteer takes care of the file downloading. The decryption is being done as
fast as possible (outruns native methods). Supports big files!

```javascript
import fs = require('fs');
import mime = require('mime-types');

client.onMessage( async (message) => {
  if (message.isMedia === true || message.isMMS === true) {
    const buffer = await client.decryptFile(message);
    // At this point you can do whatever you want with the buffer
    // Most likely you want to write it into a file
    const fileName = `some-file-name.${mime.extension(message.mimetype)}`;
    await fs.writeFile(fileName, buffer, (err) => {
      ...
    });
  }
});
```

## Basic Functions (usage)

Not every available function is listed, for further look, every function
available can be found in [here](/src/api/layers) and
[here](/src/lib/wapi/functions)

### Chatting

##### Here, `chatId` could be `<phoneNumber>@c.us` or `<phoneNumber>-<groupId>@g.us`

```javascript

// Send List menu
//This function does not work for Bussines contacts
const list = [
    {
      title: "Pasta",
      rows: [
        {
          title: "Ravioli Lasagna",
          description: "Made with layers of frozen cheese",
        }
      ]
    },
    {
      title: "Dessert",
      rows: [
        {
          title: "Baked Ricotta Cake",
          description: "Sweets pecan baklava rolls",
        },
        {
          title: "Lemon Meringue Pie",
          description: "Pastry filled with lemonand meringue.",
        }
      ]
    }
  ];

await client.sendListMenu('000000000000@c.us', 'Title', 'subTitle', 'Description', 'menu', list)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send Messages with Buttons Reply
const buttons = [
  {
    "buttonText": {
      "displayText": "Text of Button 1"
      }
    },
  {
    "buttonText": {
      "displayText": "Text of Button 2"
      }
    }
  ]
await client.sendButtons('000000000000@c.us', 'Title', 'Description', buttons)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });
// Send audio file MP3
await client.sendVoice('000000000000@c.us', './audio.mp3').then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send audio file base64
await client.sendVoiceBase64('000000000000@c.us', base64MP3)
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send contact
await client
  .sendContactVcard('000000000000@c.us', '111111111111@c.us', 'Name of contact')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send a list of contact cards
await client
  .sendContactVcardList('000000000000@c.us', [
    '111111111111@c.us',
    '222222222222@c.us',
  ])
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send basic text
await client
  .sendText('000000000000@c.us', '👋 Hello from INCONNU-V2!')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send location
await client
  .sendLocation('000000000000@c.us', '-13.6561589', '-69.7309264', 'Brasil')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Automatically sends a link with the auto generated link preview. You can also add a custom message to be added.
await client
  .sendLinkPreview(
    '000000000000@c.us',
    'https://www.youtube.com/watch?v=V1bFr2SWP1I',
    'Kamakawiwo ole'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send image (you can also upload an image using a valid HTTP protocol)
await client
  .sendImage(
    '000000000000@c.us',
    'path/to/img.jpg',
    'image-name',
    'Caption text'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });


// Send image file base64
await client.sendImageFromBase64('000000000000@c.us', base64Image, "name file")
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Send file (INCONNU-V2 will take care of mime types, just need the path)
// you can also upload an image using a valid HTTP protocol
await client
  .sendFile(
    '000000000000@c.us',
    'path/to/file.pdf',
    'file_name',
    'See my file in pdf'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Sends file
// base64 parameter should have mime type already defined
await client
  .sendFileFromBase64(
    '000000000000@c.us',
    base64PDF,
    'file_name.pdf',
    'See my file in pdf'
  )
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Generates sticker from the provided animated gif image and sends it (Send image as animated sticker)
// image path imageBase64 A valid gif and webp image is required. You can also send via http/https (http://www.website.com/img.gif)
await client
  .sendImageAsStickerGif('000000000000@c.us', './image.gif')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Generates sticker from given image and sends it (Send Image As Sticker)
// image path imageBase64 A valid png, jpg and webp image is required. You can also send via http/https (http://www.website.com/img.jpg)
await client
  .sendImageAsSticker('000000000000@c.us', './image.jpg')
  .then((result) => {
    console.log('Result: ', result); //return object success
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
  });

// Forwards messages
await client.forwardMessages(
  '000000000000@c.us',
  ['false_000000000000@c.us_B70847EE89E22D20FB86ECA0C1B11609','false_000000000000@c.us_B70847EE89E22D20FB86ECA0C1B11777']
).then((result) => {
    console.log('Result: ', result); //return object success
})
.catch((erro) => {
    console.error('Error when sending: ', erro); //return object error
});

// Send @tagged message
await client.sendMentioned(
  '000000000000@c.us',
  'Hello @50936698203 and @50935662593!',
  ['50935662593', '50
