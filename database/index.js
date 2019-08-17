const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  login: String,
  url: {type: String, unique: true},
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

let get = (callback) =>{
  // Repo below is the Repo model
  Repo.find({}, (err, data) =>{
    const sortedRepo = data.sort((a, b) => a.watchers_count - b.watchers_count);
    if (err){
      console.log("db.get error")
    }else{
      console.log(sortedRepo);
      callback(err, sortedRepo);
    }
  })
}

module.exports.get = get;
module.exports.save = save;