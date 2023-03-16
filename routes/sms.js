const express = require('express')
const request = require('request');
const multiparty = require('multiparty');
const fs = require('fs');
const speakeasy = require('speakeasy')
const router = express.Router()
module.exports = router

router.post('/identify', (req, resp) => {
    let formData = new multiparty.Form();
    formData.parse(req, function(err, fields, files) {
        let file = files.image[0];
        var options = {
            'method': 'POST',
            'url': 'http://api.ttshitu.com/predict',
            'headers': {
            },
            formData: {
                'image': {
                    'value': fs.createReadStream(file.path),
                    'options': {
                        'filename': file.originalFilename,
                        'contentType': null
                    }
                },
                'username': 'qq250221323',
                'password': 'asdasd123',
                'typeid': '1'
            }
        };
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resp.send(response.body)
        });
    });
});
router.get('/topt', function (req, resp) {
    if(req.query && req.query.userName){
        let code = '';
        let secret = '';
        switch (req.query.userName) {
            case 'zx_gongkr':
                secret = 'NM3GQZJVJB2DAVCEONJVI6JQN4ZU44D2';
                break;
            case 'zx_gongkr2':
                secret = 'NE3U43SBIZHUS5TZPF3G64JUNBFGG43R';
                break;
            case 'zx_huangxiuqin':
                secret = 'INFW25L2N53HIZKUNZAUUSJQNZ2TKUSS';
                break;
        }
        code = speakeasy.totp(
            {
                secret: secret,
                step: 60,
                encoding: 'base32',
                algorithm: 'sha512'
            }
        );
        resp.send({data: code})
    }else{
        resp.send({msg: "缺少参数：userName"})
    }
})
