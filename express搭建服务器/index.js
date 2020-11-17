const express = require("express");
const path = require("path");
const router = require("./router.js");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

//设置允许跨域请求
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //访问控制允许来源：所有
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //访问控制允许报头 X-Requested-With: xhr请求
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS"); //访问控制允许方法
  res.header("X-Powered-By", "nodejs"); //自定义头信息，表示服务端用nodejs
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});
// 启动静态资源服务
app.use(express.static("public"));

// 处理请求参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 配置路由
app.use(router);
// 监听端口
app.listen(3000, () => {
  console.log("running...");
});
