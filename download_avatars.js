
var request = require('request');
var secrets = require('./secrets.js')
var fs = require('fs')

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authotization' : secrets.GITHUB_TOKEN,
    }
  };
  
  request(options, function(err, res, body) {
    cb(err, body);
  });
}

function downloadImageByURL(url, filePath) {
  request.get('https://avatars2.githubusercontent.com/u/2741?v=3&s=466')               
  .on('error', function (err) {                                   
    throw err; 
  })
  .on('response', function (response) {  
         
    console.log('Response Status Code: ', response.statusMessage);
    console.log('Content Type: ', response.headers['content-type']);
  })
  .pipe(fs.createWriteStream(filePath));          
}


getRepoContributors("jquery", "jquery", function(err, results) {

  
  if (err) {
    console.log('errors:', err) 
    process.exit();
  } 
  if (typeof results === 'object' && !Array.isArray(results)){
    console.log('errors', err)
    process.exit();
  }
    console.log(typeof parseResult)
    var parseResult = JSON.parse(results);
    parseResult.forEach(function(result){
         
    downloadImageByURL(result.avatar_url, `avatars/${result.login}.jpg`)

    });
  
});

console.log('Welcome to the GitHub Avatar Downloader!');






