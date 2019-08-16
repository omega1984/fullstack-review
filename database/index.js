const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  login: String,
  url: String,
  description: String,
  created_at: Date
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (err, Repo) => {
  
  if (err){
    console.log(err);
  }
}

module.exports.save = save;