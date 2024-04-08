const express = require('express');
const { append } = require('express/lib/response');
const router = express.Router();



router.get('/', (req,res)=>{
    res.send('All Shelties!')
})


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