const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  login: String,
  url: String,
  description: String,
  created_at: Date,
  watchers_count: Number,
  forks_count: Number,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var file = new Repo({
    login: repo.owner.login,
    url: repo.owner.url,
    description: repo.description,
    created_at: repo.created_at,
    watchers_count: repo.watchers_count,
    forks_count: repo.forks_count,
    stargazers_count: repo.stargazers_count
  })  
  file.save((err, file) =>{
    if (err){
      console.log(err);
    }
  })
}

module.exports.save = save;