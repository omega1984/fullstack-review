const express = require('express');
let app = express();
const github = require('../helpers/github.js')
const db = require('../database/index.js')

app.use(express.urlencoded({extended: false}));
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) { 
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  console.log(req.body)
  github.getReposByUsername(req.body.username, (err, data) =>{
    if (err) {
      console.log('helper function error')
    }else{
      data.forEach(repo => {
        return db.save({
          login: repo.owner.login,
          url: repo.owner.url,
          description: repo.description,
          created_at: repo.created_at,
          watchers_count: repo.watchers_count,
          forks_count: repo.forks_count,
          stargazers_count: repo.stargazers_count
        })
      })
    }
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

