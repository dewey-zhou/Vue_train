var express = require("express"); //express框架模块
var path = require("path"); //系统路径模块
var fs = require("fs"); //文件模块
var bodyParser = require("body-parser"); //对post请求的请求体进行解析模块
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); //bodyParser.urlencoded 用来解析request中body的 urlencoded字符，只支持utf-8的编码的字符，也支持自动的解析gzip和 zlib。返回的对象是一个键值对，当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。

//设置允许跨域请求
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); //访问控制允许来源：所有
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  ); //访问控制允许报头 X-Requested-With: xhr请求
  res.header("Access-Control-Allow-Metheds", "PUT, POST, GET, DELETE, OPTIONS"); //访问控制允许方法
  res.header("X-Powered-By", "nodejs"); //自定义头信息，表示服务端用nodejs
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

//创建get接口
function getApi(api, dirname) {
  app.get(api, function (req, res) {
    //console.log(req.body); //获取请求参数
    var file = path.join(".\\data\\", dirname);
    // var file = path.join('f:\\VUE_znywxt\\zd\\data\\status.json'); //文件路径，__dirname为当前运行js文件的目录
    //var file = 'f:\\nodejs\\data\\test.json'; //也可以用这种方式指定路径

    //读取json文件
    fs.readFile(file, "utf-8", function (err, data) {
      if (err) {
        res.send("文件读取失败");
      } else {
        res.send(data);
      }
    });
  });
}
getApi("/machine", "/machine.json");
getApi("/picture", "/picture.json");
getApi("/reason", "/reason.json");
getApi("/status", "/status.json");
app.get("/zd", (req, res) => {
  res.send("你好，zd");
});
app.get("/xym", (req, res) => {
  res.send("传统方式带参数的get请求" + req.query.id);
});
app.get("/yy/:id", (req, res) => {
  res.send("Restful方式带参数的get请求" + req.params.id);
});
// post形式
app.post("/post", (req, res) => {
  res.send("Post方式带参数的请求" + req.body.uname + "---" + req.body.pwd);
});
// put形式
// app.put("/put/:id", (req, res) => {
//   res.send("Put方式带参数的请求" + req.params.id + "---" + req.params.pwd);
// });

var hostName = "127.0.0.1"; //ip
var port = 8888; //端口
app.listen(port, hostName, function () {
  console.log(`服务器运行在http://${hostName}:${port}`);
});

// 运行  node server_json.js
