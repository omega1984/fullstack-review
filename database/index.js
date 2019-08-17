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

let save = (repo, callback) => {
  var file = new Repo(repo);

  Repo.remove({}, (err)=>{
    if (err) console.log(err);
    else{
      file.save((err, file) =>{
        if (err){
          console.log("saving error", err);
        }else{
          console.log(`${file.login} added to the database`)
        }
      })
      callback();
    }
  })  
}

let get = (callback) =>{
  // Repo below is the Repo model
  Repo.find({}, (err, data) =>{
    const sortedRepo = data.sort((a, b) => a.watchers_count - b.watchers_count);
    if (err){
      console.log(err)
    }else{
      callback(err, sortedRepo);
    }
  })
}

module.exports.get = get;
module.exports.save = save;