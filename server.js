const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// СЮДА ПИШЕМ САЙТ, КОТОРЫЙ ХОТИМ ОТКРЫВАТЬ ЧЕРЕЗ ПРОКСИ
// Можно поменять, например на https://www.youtube.com или https://t.me
const TARGET = "https://www.google.com";

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
