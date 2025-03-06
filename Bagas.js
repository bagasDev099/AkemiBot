const {
  BufferJSON,
  WA_DEFAULT_EPHEMERAL,
  generateWAMessageFromContent,
  proto,
  generateWAMessageContent,
  generateWAMessage,
  prepareWAMessageMedia,
  areJidsSameUser,
  getContentType,
} = require("@whiskeysockets/baileys");
const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const { exec } = require("child_process");
const axios = require("axios")
const cheerio = require("cheerio")
const syntaxerror = require("syntax-error")

const { generateProfilePicture, getBuffer, fetchJson, fetchText, getRandom, getGroupAdmins, runtime, sleep, makeid } = require("./lib/myfunc");

let prefix = ".",",","/"; // Prefix
let mode = false; // Mode publik, true yang berarti public, false self

module.exports = async (conn, m) => {
  try {
    const body = m.mtype === "conversation" ? m.message.conversation : m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text : "";
    const budy = typeof m.text === "string" ? m.text : "";
    const command = body.startsWith(prefix) ? body.replace(prefix, "").trim().split(/ +/).shift().toLowerCase() : "";
    const commands = command.replace(prefix, "");
    const args = body.trim().split(/ +/).slice(1);
    const q = (question = args.join(" "));
    const quoted = m.quoted ? m.quoted : m
    const message = m;
    const messageType = m.mtype;
    const messageKey = message.key;
    const pushName = m.pushName || "Undefined";
    const itsMe = m.key.fromMe;
    const chat = (from = m.chat);
    const sender = m.sender;
    const userId = sender.split("@")[0];
    const reply = m.reply;
    const botNumber = conn.user.id.split(':')[0] + '@s.whatsapp.net'
    
    const isGroup = m.key.remoteJid.endsWith('@g.us')
    const groupMetadata = isGroup ? await conn.groupMetadata(from) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const groupId = isGroup ? groupMetadata.id : ''
    const groupMembers = isGroup ? groupMetadata.participants : ''
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    const isGroupAdmins = groupAdmins.includes(sender)

    if (body.startsWith("$")) {
      if (!itsMe) return;
      await m.reply("_Executing..._");
      exec(q, async (err, stdout) => {
        if (err) return m.reply(`${err}`);
        if (stdout) {
          await m.reply(`${stdout}`);
        }
      });
    }

    if (body.startsWith(">")) {
      if (!itsMe) return;
      try {
      	var txtt = util.format(await eval(`(async()=>{ ${q} })()`));
      	m.reply(txtt)
      } catch (e) {
      	let _syntax = "";
          let _err = util.format(e);
          let err = syntaxerror(q, "EvalError", {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: "module",
          });
          if (err) _syntax = err + "\n\n";
          m.reply(util.format(_syntax + _err))
      }
    }

    if (body.startsWith("=>")) {
      if (!itsMe) return;
      try {
      	var txtt = util.format(await eval(`(async()=>{ return ${q} })()`));
      	m.reply(txtt)
      } catch (e) {
      	let _syntax = "";
          let _err = util.format(e);
          let err = syntaxerror(q, "EvalError", {
            allowReturnOutsideFunction: true,
            allowAwaitOutsideFunction: true,
            sourceType: "module",
          });
          if (err) _syntax = err + "\n\n";
          m.reply(util.format(_syntax + _err))
      }
    }

    if (!mode) {
      if (!m.key.fromMe) return;
    }

    if (m.message) {
    	console.log(chalk.bgMagenta(" [===>] "), chalk.cyanBright("Time: ") + chalk.greenBright(new Date()) + "\n", chalk.cyanBright("Message: ") + chalk.greenBright(budy || m.mtype) + "\n" + chalk.cyanBright("From:"), chalk.greenBright(pushName), chalk.yellow("- " + m.sender) + "\n" + chalk.cyanBright("Chat Type:"), chalk.greenBright(!m.isGroup ? "Private Chat" : "Group Chat - " + chalk.yellow(m.chat)));
    }

    if (!body.startsWith(prefix)) {
      return;
    }

    switch (commands) {
      case "menu": {
      	let menu = `Hai, ${m.pushName}\n\n`
      	  + `${prefix + command} tiktok\n`
      	  + `${prefix + command} ytmp4\n`
      	  + `${prefix + command} ytmp3\n`
      	  + `${prefix + command} sticker\n`
      	  + `${prefix + command} antilink\n`
      	  + `${prefix + command} addcase\n`
      	  + `${prefix + command} delcase\n`
      	  + `Copyright © 2025 BagasDev`
      	reply(menu)  
      } 	
      break
      case 'ig':
case 'instagram': {
const qs = require('qs');
async function instanav(url) {
    const data = qs.stringify({
        'q': url,
        't': 'media',
        'lang': 'en'
    });

    const config = {
        method: 'POST',
        url: 'https://nstanavigation.app/api/ajaxSearch',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Android 10; Mobile; rv:131.0) Gecko/131.0 Firefox/131.0',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'id-ID',
            'referer': 'https://instanavigation.app/',
            'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'x-requested-with': 'XMLHttpRequest',
            'origin': 'https://instanavigation.app',
            'alt-used': 'instanavigation.app',
            'sec-fetch-dest': 'empty',
            'sec-fetch-mode': 'cors',
            'sec-fetch-site': 'same-origin',
            'priority': 'u=0',
            'te': 'trailers',
        },
        data: data
    };

    const api = await axios.request(config);
    const html = api.data.data;

    const $ = cheerio.load(html);
    const downloadUrls = [];
    $('.download-items__btn a').each((index, element) => {
        const href = $(element).attr('href');
        if (href) {
            downloadUrls.push(href);
        }
    });

    const urlParams = new URLSearchParams(downloadUrls[0]?.split('?')[1]); // Ambil filename dari URL pertama
    let filename = urlParams.get('filename');
    if (filename && filename.endsWith('.mp4')) {
        filename = filename.slice(0, -4);
    }

    return {
        title: filename || 'Title not found',
        downloadUrls: downloadUrls.length > 0 ? downloadUrls : ['Download URL not found']
    };
}

    if (args.length == 0) {
        reply(`Contoh: ${prefix + command} <link Instagram>`);
        DinzBotz.sendMessage(m.chat, { react: { text: `⏱️`, key: m.key }})
        break;
    }
    const url = args[0];
    if (!url.match(/instagram\.com\/(reel|p|tv)/gi)) {
        reply('URL yang Anda masukkan salah! Pastikan URL adalah link Instagram Reel, Post, atau TV.');
        break;
    }
    try {
        const result = await instanav(url);
        const caption = `乂 *I N S T A G R A M  D O W N L O A D*

• *ɴᴀᴍᴀ ᴠɪᴅᴇᴏ:* 
${result.title}

${global.botname}`;
        if (result.downloadUrls[0] !== 'Download URL not found') {
            await DinzBotz.sendMessage(m.chat, { 
                video: { url: result.downloadUrls[0] }, 
                caption: caption 
            });
        } else {
            reply('Maaf, video tidak ditemukan. Pastikan URL valid.');
        }
    } catch (e) {
        console.log(e);
        reply('Terjadi kesalahan saat memproses URL. Pastikan URL benar.');
    }
    }
    break
      case 'antilink': {
if (!m.isGroup) return m.reply(mess.group)
if (!isAdmins && !isGroupOwner && !isOwner) return m.reply(mess.admin)
if (!isBotAdmins) return m.reply(mess.botAdmin)
if (args[0] === "on") {
if (db.data.chats[m?.chat].antilink) return m?.reply(`Sudah Aktif Sebelumnya 🕊️`)
db.data.chats[m?.chat].antilink = true
m?.reply(`Antilink Group WhatsApp Aktif 🕊️`)
} else if (args[0] === "off") {
if (!db.data.chats[m?.chat].antilink) return m?.reply(`Sudah Nonaktif Sebelumnya 🕊`)
db.data.chats[m?.chat].antilink = false
m?.reply(`Antilink Group WhatsApp Nonaktif 🕊️`)
} else {
m?.reply(`Mode ${command}\n\n\nKetik ${prefix + command} on/off`)
}
}
break
      case 'delcase': {
if (!isOwner) return m.reply(`*Access Denied ❌*\n\n*Owners only*`)
if (!q) return m.reply('*Masukan nama case yang akan di hapus*')

dellCase('./Arifzyn.js', q)
m.reply('*Dellcase Successfully*\n\n© BagasDev')
}
break

case 'editinfo': {
if (!m.isGroup) return m.reply(mess.group)
if (!isAdmins && !isGroupOwner && !isOwner) return m.reply(mess.admin)
if (!isBotAdmins) return m.reply(mess.botAdmin)
 if (args[0] === 'open'){
await kyami.groupSettingUpdate(m.chat, 'unlocked').then((res) => m?.reply(`Sukses Membuka Edit Info Group`)).catch((err) => m?.reply(jsonformat(err)))
 } else if (args[0] === 'close'){
await kyami.groupSettingUpdate(m.chat, 'locked').then((res) => m?.reply(`Sukses Menutup Edit Info Group`)).catch((err) => m?.reply(jsonformat(err)))
 } else {
 m?.reply(`Silahkan Ketik ${prefix + command} open/ ${prefix + command} close`)
}
}
break
      case 'addcase': {
  await kyami.sendMessage(m.chat, { react: { text: "🕛",key: m.key,}
  })
  await kyami.sendMessage(m.chat, { react: { text: "🕒",key: m.key,}
  })
  await kyami.sendMessage(m.chat, { react: { text: "🕕",key: m.key,}
  })
  await kyami.sendMessage(m.chat, { react: { text: "🕘",key: m.key,}
  })
  await kyami.sendMessage(m.chat, { react: { text: "✅️",key: m.key,}
  })
 if (!isOwner) return m.reply('Khusus Pembuat Bot')
 if (!text) return m.reply('Mana case nya');
const fs = require('fs');
const namaFile = 'Bagas.js';
const caseBaru = `${text}`;
fs.readFile(namaFile, 'utf8', (err, data) => {
if (err) {
console.error('Terjadi kesalahan saat membaca file:', err);
retn;
}
const posisiAwalGimage = data.indexOf("case 'addcase':");

if (posisiAwalGimage !== -1) {
const kodeBaruLengkap = data.slice(0, posisiAwalGimage) + '\n' + caseBaru + '\n' + data.slice(posisiAwalGimage);
fs.writeFile(namaFile, kodeBaruLengkap, 'utf8', (err) => {
if (err) {
m.reply('Terjadi kesalahan saat menulis file:', err);
} else {
m.reply('Case baru berhasil ditambahkan.');
}
});
} else {
m.reply('Tidak dapat menambahkan case dalam file.');
}
});
}
break
      case 'hidetag': {
        if (!isGroup) return
        let teks = quoted.text ? quoted.text : q ? q : ''
        let mem = [];
        groupMembers.map( i => mem.push(i.id) )
        conn.sendMessage(m.chat, { text: teks, mentions: mem }, { quoted: m })
      }  
      break
      case "tiktok","tt": {
      	if (!q) return reply("[!] Masukan URL TikTok !")
      	let res = await fetchJson("https://api.arifzyn.xyz/download/tiktok?url=" + q)
      	res = res.result
      	let txt = ``
      	if (res.type == "image") {
      		
      	} else {
      		conn.sendMessage(m.chat, { video: { url: res.video["no-watermark"] }, caption: res.title }, { quoted: m })
      	}
      }
      break
      case "ytmp4": 
      case "ytmp3": {
      	if (!q) return reply("[!] Masukan URL YouTube!")
      	if (commands == "ytmp4") {
      		const anu = await fetchJson("https://api.arifzyn.xyz/download/ytmp4?url=" + q)
      		conn.sendMessage(m.chat, { video: { url: anu.result.result }, caption: anu.result.title }, { quoted: m })
      	} else {
      		const anu = await fetchJson("https://api.arifzyn.xyz/download/ytmp3?url=" + q)
      		conn.sendMessage(m.chat, { audio: { url: anu.result.result }, mimetype: "audio/mp4" }, { quoted: m })
      	}
      }
      default: 
    }
  } catch (err) {
    m.reply(util.format(err));
  }
};

let file = require.resolve(__filename);
fs.watchFile(file, () => {
  fs.unwatchFile(file);
  console.log(chalk.redBright(`Update ${__filename}`));
  delete require.cache[file];
  require(file);
});
