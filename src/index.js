// https://www.digitalocean.com/community/tutorials/how-to-launch-child-processes-in-node-js
const express = require('express');
const {fork} = require('child_process');
const app = express()
const port = 8888
const fs = require('fs')
module.exports = {port}

app.get('/api', (req, res) => {
  const child = fork(__dirname + '/child-process/slowFunction4.js');
  child.on('message', (message) => {
    console.log('message came back from child process');
  });

  res.status(200).send('Hello World!');  
  child.send('START');
  console.log('from /api')
});

app.get('/upload', async(req, res) => {
   res.status(200).send();
})

app.listen(port, () => {
  console.log(`%cExample app listening on port ${port}`, 'color:green')
})