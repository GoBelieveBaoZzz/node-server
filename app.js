const express = require('express')
const app = express()

app.listen(3001, function () {
    console.log('app listening on port 3001')
})

//引入路由器模块
const emailRouter = require('./routes/email.js')
const lbsRouter = require('./routes/lbs.js')
const smsRouter = require('./routes/sms.js')

//托管路由器
app.use('/v1/email', emailRouter)
app.use('/v1/lbs', lbsRouter)
app.use('/v1/sms', smsRouter)
