// 1:加載相應模組 http express
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
let app = express();

// 創建web server 並監聽3000端口
http.createServer(app).listen(3000);
// 創建連接池
let pool = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'resumesql',
    port: 3306,
    connectionLimit: 5
});
//配置第三方模块
//配置跨域模块
//origin 允许来自哪个域名下跨域访问
app.use(cors({
    origin: ["http://127.0.0.1","http://127.0.0.1:3000","http://localhost"],
    credentials: true
}));
// 中間件要加上才可以使用post請求
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', function (req, res) {
    // console.log(req.body);
    var name = req.body.name;
    var mail = req.body.mail;
    var content = req.body.content;
    var id = null;
    pool.getConnection((err,conn)=>{
        // 如果連接有誤則拋出錯誤
        if(err)
            throw err.message;
        //創建sql語句
        var sql = "SELECT mail from message WHERE mail=?";
        //向database發送sql語句並獲取返回結果
        conn.query(sql,[mail],(err,result)=>{
            if (err)
              throw err.message;
            console.log(result);
            if(result){
                sql = "UPDATE message SET uname=?,mail=?,content=? WHERE mail=?";
                conn.query(sql,[name,mail,content,mail],(err,upres)=>{
                    if(err)
                        throw err.message;
                    if(upres){
                      res.json({code:1});
                    }
                });
                return;
            }
            if(result.length ==0){
                sql="INSERT INTO message VALUES(?,?,?,?)";
                conn.query(sql,[id,name,mail,content],(err,inres)=>{
                    if(err)
                        throw err.message;
                    if(inres){
                       res.json({code:2});
                    }
                });
                return;
            }
            // 釋放連接
            conn.release();
        });
    });
});

