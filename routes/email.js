const express = require('express')
let nodemailer = require("nodemailer")
const router = express.Router()
module.exports = router

let transporter = nodemailer.createTransport({
    host: 'smtp.163.com',
    service: "163", //邮箱类型 例如service:'163'
    secure: true, //是否使用安全连接，对https协议的
    // port: 465, //qq邮件服务所占用的端口
    auth: {
        user: "qq1041663097@163.com",//开启SMTP的邮箱，发件人
        pass: "MOPMZSYIUIEWDNHC"// qq授权码
    }
})

router.get('/sendEmail', function (req, resp) {
    if(req.query && req.query.text){
        let options = {
            from: 'qq1041663097@163.com', //发送方
            to: "1041663097@qq.com",//接收方
            subject: "【执行结束】",//邮件主题
            text: req.query.text,//邮件正文
        }
        transporter.sendMail(options, (err, info) => {
            if (err) {
                resp.send(err)
            } else {
                resp.send(info)
            }
        })
    }else{
        resp.send({msg: "缺少参数：text"})
    }
})
