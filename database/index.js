const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  login: {type: String, unique: true},
  url: String,
  description: String,
  created_at: Date,
  watchers_count: Number,
  forks_count: Number,
  stargazers_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repo) => {
  var file = new Repo(repo);

  file.save((err, file) =>{
    if (err){
      console.log("saving error", err);
    }else{
      console.log(`${file.login} added to the database`)
    }
  })
}

module.exports.save = save;