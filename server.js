"use strict";

// модуль ноды для работы с путями
const path = require("path");

// импорт express
const express = require("express");

// создание веб сервера
const app = express();

// порт получаем из переменных окружения (могут быть заданы ключами при запуске ноды)
const port = process.env.PORT || 8080;

// включаем сервер
app.use(express.static(path.join(__dirname, "dist")));

// на все запосы get отвечаем содержимым index.html
// при обращении к несуществующим файлам - index.html
app.get("*", (req, res) => res.sendFile(path.join(__dirname, "dist/index.html")));

// запускаем сервер
app.listen(port, (err) =>{
    if (err) return console.error(err);
    return console.log(`Сервер запущен на ${port}`);
});