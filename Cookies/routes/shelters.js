const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();



router.get('/', (req,res)=>{
    res.send('All Shelties!')
})


router.get('/setname', (req,res)=>{
    console.log(req.cookies)
    const {name = 'unassigned'} = req.cookies;
    res.send(`hi there, ${name}`);
});

router.get('/getsignedcookie', (req,res)=>{
    res.cookie('fruit','grape', { signed: true })
    res.send('OK!!!!!!!')
});

router.get('/verify', (req,res)=>{
    console.log(req.signedCookies)
    res.send(req.signedCookies)
});







router.post('/', (req,res)=>{
    res.send('creating Shelties!')
})

router.get('/:id', (req,res)=>{
    res.send('viewing Shelties!')
})

router.get('/:id/edit', (req,res)=>{
    res.send('EDITING Shelties!')
})


module.exports = router;