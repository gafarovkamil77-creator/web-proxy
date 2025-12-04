const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Сайт, который хотим открывать через прокси
const TARGET = "https://www.google.com";

// Просто проверка, что сервер жив
app.get("/", (req, res) => {
  res.send(
    "<h1>Сервер работает ✅</h1>" +
      "<p>Чтобы зайти через прокси, перейди по <a href=\"/proxy/\">/proxy/</a></p>"
  );
});

// Всё, что по пути /proxy/ → отправляем на TARGET
app.use(
  "/proxy",
  createProxyMiddleware({
    target: TARGET,
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/proxy": "", // убираем /proxy из пути
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Proxy running on port", PORT);
});
