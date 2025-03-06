const fs = require("fs")
const chalk = require("chalk")

// owner
global.owner = ["6283839357485"]
global.mode = false 
global.ownername = 'BagasDev
global.botname = 'AkemiBot
global.prem = ['6283839357485']
global.group = '' // isi link grupmu
global.ch = '' // isi link ch saluranmu
global.web = '' // isi link websitemu

// payment
global.dana = '6283839357485'
global.gopay = `false`
global.ovo = `false`
global.saweria = `false`

// watermark
global.packname = 'My Sticker By'
global.author = '${m.pushName}'

// global api
global.Key = ''
global.url = ''

// jangan di ubah nanti eror
global.limitawal = {
    premium: "Infinity",
    monayawal: 0,
    free: 100
}

//========= Setting Message =========//
global.msg = {
"error": "Error Kak:( ",
"done": "Donee Kak 🗿👍🏿 ", 
"wait": "Wait.....", 
"group": "Fitur ini Khusus Group", 
"private": "Fitur ini Khusus Pribadi", 
"admin": "Fitur ini Khusus Admin", 
"adminbot": "bot bukan Admin :(", 
"owner": "Fitur ini Khusus Ownerku Kak:)", 
"developer": "Fitur ini Khusus Developer Kak :)"
}


let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
