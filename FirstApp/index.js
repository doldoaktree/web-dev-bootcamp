const express = require('express');
const res = require('express/lib/response');
const app = express();

// app.use((req, res) =>{
//     console.log('we got new request')
//     // res.send('halo, got your request babe, this is response')
//     res.send('<h1>Good morning, JennY! from Mo</h1>')
// })
app.get('/', (req,res)=>{
    res.send('Welcome! This is my home page. You may enter!')

})

app.get('/r/:subreddit', (req,res)=>{
    const {subreddit} =req.params;
    res.send(`<h1>browsing on the ${subreddit} subreddit<h1>`);
})

app.get('/r/:subreddit/:postId', (req,res)=>{
    const {subreddit, postId} =req.params;
    res.send(`<h1>browsing ${postId} on the ${subreddit} subreddit<h1>`);
})


app.get('/cats', (req,res) =>{
    res.send('Meow');
})
app.post('/cats', (req,res) =>{
    res.send('post request from cat')

})

app.get('/search', (req,res)=>{
    const {q}=(req.query);
    if (!q){
        res.send('NOTHING FOUND IF NOTHING SEARCHED');
    }
    nod// const {color}=(req.query);ls

    // const {weight}=(req.query);
    // res.send(`<h1>Search results for:${q}<h1>`);
    // console.log(`Print out, this is ${q}`)
    res.send('hello, this is you and me');
    console.log(req.query);

});  

app.get('/wind', (req,res) =>{
    res.send('Whoosh');
});

app.listen(3000, () =>{
console.log('listening on port 3000')
});


app.get('*', (req,res)=>{
    res.send('Me dont know');
});