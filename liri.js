require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var inquirer = require("inquirer");
var fs = require("fs");

//Make it so liri.js can take in one of the following commands:
// concert-this
// spotify-this-song
// movie-this
// do-what-it-says
var liriCommand = process.argv[2];
var input = process.argv[3];


function startLiri (liriCommand, input){
    if (liriCommand == "spotify-this-song"){
        getSong();
    }
    
    
}
startLiri();

function getSong(songName) {
    var spotify = new Spotify(keys.spotify);

    //If no song is provided then your program will default to "The Sign" by Ace of Base.
        if (!songName) {
            songName = "The Sign";
        };        

        console.log(songName);

        
        spotify.search({ type: 'track', query: songName}, function(err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            } 
            console.log("Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url); 
            
           
            var logSong = "Artist: " + data.tracks.items[0].artists[0].name + "\nSong name: " + data.tracks.items[0].name +
            "\nAlbum Name: " + data.tracks.items[0].album.name + "\nPreview Link: " + data.tracks.items[0].preview_url + "\n";
            
         
            fs.appendFile('log.txt', logSong, function (err) {
                if (err) throw err;
              });
            
            logResults(data);
        });
};