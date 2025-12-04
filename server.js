const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Куда проксируем – можно поменять на любой сайт
// Для начала лучше взять что-то простое, например Википедию
const TARGET = "https://www.wikipedia.org";

// Страница-проверка: работает ли сервер
app.get("/health", (req, res) => {
  res.send("OK: proxy is running");
});

// Всё остальное проксируем на TARGET
app.use(
  "/",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    secure: false,
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});
