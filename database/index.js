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
  console.log(repo);
  var file = new Repo(repo);

  file.save((err, file) =>{
    if (err){
      console.log(err);
    }
  })
}

module.exports.save = save;