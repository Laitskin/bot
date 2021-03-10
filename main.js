//SETUP
require('dotenv').config();
const express = require("express");
const app = express();
const listener = app.listen(process.env.PORT, () => {
    console.log("Your app is listening on port " + listener.address().port);
  });

const Discord = require("discord.js");
const mysql = require("mysql");
const client = new Discord.Client();
const db_config = { connectionLimit : 10, host : process.env.DB_HOST, user : process.env.DB_USER, password : process.env.DB_PASS, database : process.env.DB_NAME,};
var mysql_pool = mysql.createPool(db_config);

const botId = 717157826505736252;

client.on("ready", () => {
    console.log("I am ready!");
    client.user.setActivity( "-help", {type: "LISTENING"} );
  });

//BEGIN
client.on("message", message => {
if (message.content.startsWith("-") && message.author.id != botId) {
if (message.content.slice(1, 5) === "help"){
    message.channel.send("-help: comando de ayuda.\n-leaderboard: quién es el más pete.\n-pete @mention: sumarle un petepunto a alguien.\n-sacar <cantidad> @mention: saca una determinada cantidad de petepuntos a alguien.\n-limpiar <cantidad: 2-99>: borra una determinada cantidad de mensajes.\n-roll: arroja un dado aleatorio entre 1 y 100.\n\nImportante: abusar del comando -pete te banea y no lo podés usar más.");
}
if (message.content.slice(1, 12) === "leaderboard"){
mysql_pool.getConnection(function(err, con) {
    if (err) {
        console.log('Error getting mysql_pool connection: ' + err);
        con.release();
      }
    con.query("SELECT * FROM petepuntos ORDER BY score DESC", function (err, result, fields) {
        if (err) console.log(err);
        let temp = "¿Quién es el más pete del server?\n";
        for (let i = 0; i < result.length; i++) {
            temp += result[i].user + ": " + result[i].score + " - $: " + result[i].credits + "\n";
        }
        message.react("724423138808561704");
        message.channel.send(temp);
        con.release();
    });
});
}
if (message.content.slice(1, 5) === "pete") {
    if (message.author.id == "127586025856827392") //Ban a diablo
return;
    if (message.mentions.users.first() == undefined) {
    message.channel.send("Te faltó mencionar quién es el pete.");
    return;
    }

    if (message.mentions.users.first().id === "172111502612889601") {
        if (message.author.id === "172111502612889601") {
            message.channel.send("Lula vos sos inmune a los petepuntos.");
            return;
        }
        AddPoint(message.author.id, message.author.username);
        message.channel.send("Qué le pones un petepunto a lula nabo, +1 petepunto para " + message.author.username + ".");
        return;
}
        AddPoint(message.mentions.users.first().id, message.mentions.users.first().username);
        message.channel.send("+1 petepunto para " + message.mentions.users.first().username + ".");
}

if (message.content.slice(1, 6) === "sacar") {
    if (message.author.id == "127608465525833728") {
        if (message.mentions.users.first() == undefined) {
            message.channel.send("Te faltó mencionar a quién sacarle los petepuntos.");
            return;
        }
    let temp = parseInt(message.content.slice(7));
    if (temp > 0) {
        RemovePoint(message.mentions.users.first().id, temp);
        message.channel.send("Le saqué " +temp+ " petepuntos a " + message.mentions.users.first().username + ".");
    } else {
        message.channel.send("Cantidad inválida o formato inválido (!!sacar <cantidad> @<mention>)");
    }
} else {
    message.channel.send("Solamente lait tiene permiso para sacar petepuntos.");
}
}

if (message.content.slice(1, 8) === "limpiar") {
if (message.author.id == "127608465525833728" || message.author.id == "127584559016443904") {
    let temp = parseInt(message.content.slice(9));
    if (temp > 0 && temp <= 99) {
        async function clear() {
            await message.channel.messages.fetch({ limit: temp }).then(messages => {
            message.channel.bulkDelete(messages)
                .catch(error => message.channel.send("No tengo permisos para borrar esos mensajes :pepehands:"));
            });
        }
        message.delete();
        clear();
    } else {
        message.channel.send("Cantidad inválida o formato inválido (-limpiar <cantidad: 2-99>");
    }
} else {
    message.channel.send("Solamente lait y LoaP tienen permiso para borrar mensajes.");
}
}

if (message.content.slice(1, 5) === "roll") {
    message.channel.send(Math.floor(Math.random() * 100) + 1);
}

//Gamble game

if (message.content.slice(1, 7) === "gamble") {
    firstMention = message.mentions.users.first();
    if (!isGambling) {
        isGambling = true;
        gambleAuthor = message.author.id;
        if (firstMention) {
            AddCredits(message.author.id, message.author.username, -100);
        } else {
            AddCredits(message.author.id, message.author.username, 10);
        }
        roll = Math.floor(Math.random() * 100) + 1;
        pool[message.author.id] = Math.floor(Math.random() * 100) + 1;
        message.channel.send("Empezó una ruleta rusa. 5 minutos para unirse.");
        
        timeoutId = setTimeout(() => FinishGamble(message), 60000 * 5);
    } else {
        if (pool[message.author.id]) {
            message.channel.send(message.author.username + " ya jugaste.");
            return;
        }
        pool[message.author.id] = Math.floor(Math.random() * 100) + 1;
        AddCredits(message.author.id, message.author.username, 10);
        message.channel.send(message.author.username + " se unió al juego.");
    }
}

if (message.content.slice(1, 7) === "finish") {
    if (gambleAuthor === message.author.id) {
        clearTimeout(timeoutId);
        FinishGamble(message);
    }
        
}

//Lait private commands
if (message.author.id == "127608465525833728") {
    
if (message.content.slice(1, 6) === "mimic") {
    if(message.channel.type === 'dm') {
    client.channels.cache.get('508818378182623242').send(message.content.slice(7));
    } else {
    message.channel.send(message.content.slice(7));
    message.delete();
    }
}

if (message.content.slice(1, 6) === "timer") {
    let parsed = parseFloat(message.content.slice(7));
    if (typeof(parsed) === "number" && parsed > 0 && parsed < 100) {
    message.channel.send("Tiempo de operación actualizado.");
    time = parsed;
    }
}

if (message.content.slice(1, 8) === "execute") {
    message.channel.send("Roger, roger!");
    Repeat (message.content.slice(9));
}

if (message.content.slice(1, 5) === "stop") {
    message.channel.send("Roger, roger!");
    clearInterval(repeatVar);
}
}

}});

//Gamble
let firstMention;
let timeoutId;
let gambleAuthor;
let isGambling = false;
let pool = {};
let roll;

let time = 1;
let repeatVar;
function Repeat (text) {
    repeatVar = setInterval(() => { 
    client.channels.cache.get('508818378182623242').send(text);
}, 3600000 * time); 
}

function AddPoint (id, name) {
    mysql_pool.getConnection(function(err, con) {
        if (err) {
            console.log("Error getting mysql_pool connection: " + err);
            con.release();
          }
        con.query("SELECT * FROM petepuntos WHERE userid ="+ id, function (err, result, fields) {
            if (err) console.log(err);
            if (result.length === 0) {
                con.query("INSERT INTO petepuntos (userid, user, score) VALUES (" + id + ", '" + name + "', 1)");
                console.log("Agregué un punto, creando un valor nuevo.");
            }else{
                con.query("UPDATE petepuntos SET score = score + 1 WHERE userid =" + id);
                console.log("Agregué un punto, en un valor existente.");
            }
        });
        con.release();
    });
}

function RemovePoint (id, amount) {
    mysql_pool.getConnection(function(err, con) {
        if (err) {
            console.log("Error getting mysql_pool connection: " + err);
            con.release();
          }
        con.query("SELECT * FROM petepuntos WHERE userid ="+ id, function (err, result, fields) {
            if (err) console.log(err);
            if (result.length === 0) {
                console.log("No hice ningún cambio porque ese usuario no existe en la base de datos.");
            }else{
                con.query("UPDATE petepuntos SET score = score - "+ amount +" WHERE userid =" + id);
                console.log("Saqué " + amount + " puntos del id " + id + ".");
            }
        });
        con.release();
    });
}

function AddCredits (id, name, amount) {
    mysql_pool.getConnection(function(err, con) {
        if (err) {
            console.log("Error getting mysql_pool connection: " + err);
            con.release();
          }
        con.query("SELECT * FROM petepuntos WHERE userid ="+ id, function (err, result, fields) {
            if (err) console.log(err);
            if (result.length === 0) {
                con.query("INSERT INTO petepuntos (userid, user, credits) VALUES (" + id + ", '" + name + "', " + amount + ")");
                console.log("Agregué "+ amount +" créditos, creando un valor nuevo.");
            }else{
                con.query("UPDATE petepuntos SET credits = credits + " + amount + " WHERE userid =" + id);
                console.log("Agregué "+ amount +" créditos, en un valor existente.");
            }
        });
        con.release();
    });
}
//falta agregar un check si tenés 100 creditos para hacer mention
//falta agregar un cooldown de al menos 24 horas
//falta agregar que saque petepuntos si el kick es a lula
async function FinishGamble (message) {
    let kick = false;
    let players = Object.keys(pool);
    let randomPlayer = players[Math.floor(Math.random() * players.length)];
    const target = firstMention ? firstMention.id : randomPlayer;
    message.channel.send("El roll fue " + roll.toString());
    for (const property in pool) {
        const user = await client.users.fetch(property);
        message.channel.send(user.username + " rolleó " + pool[property].toString());
        if (pool[property] === roll)
        kick = true;
    }
    const user = firstMention ? firstMention : await client.users.fetch(randomPlayer);
    if (kick) {
        //message.guild.members.get(temp).kick("Perdiste la ruleta rusa :(");
        message.channel.send(user.username + " perdió la ruleta rusa 👋 (+1 petepunto)");
        AddPoint(randomPlayer, user.username);
    } else {
        message.channel.send(user.username + " safaste del kick.");
    }
    isGambling = false;
    pool = {};
}

client.login(process.env.TOKEN);
