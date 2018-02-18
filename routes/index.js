var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://characters:123321@ds133558.mlab.com:33558/characters').then(function () {
    console.log("Connected");
}).catch(function (error) {
    console.log(error.message)
});

var Character= mongoose.model('Character',{
    name:String,
    story : String,
    birthday : String,
    age : String,
    gender: String,
    image:String,
    link:String
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/characters', function(req, res) {
    res.render('characters');
});


router.get('/api/anime', function(req, res) {
  var animeApi={
      title:"Detective Conan",
      aired_string:"Aired: Jan 8, 1996 to ?",
      synopsis:"Shinichi Kudou, a great mystery expert at only seventeen, is already well known for having solved several challenging cases. One day, when Shinichi sees two suspicious men and decides to follow them, he inadvertently becomes witness to a disturbing illegal activity. When the men catch Shinichi, they dose him with an experimental drug formulated by their criminal organization and abandon him to die. However, to his own astonishment, Shinichi is still alive and soon wakes up, but now, he has the body of a seven-year-old, perfectly preserving his original intelligence. He hides his real identity from everyone, including his childhood friend Ran Mouri and her father, private detective Kogorou Mouri, and takes on the alias of Conan Edogawa (inspired by the mystery writers Arthur Conan Doyle and Ranpo Edogawa). Animated by TMS and adapted from the manga by Gosho Aoyama, Detective Conan follows Shinichi who, as Conan, starts secretly solving the senior Mouri's cases from behind the scenes with his still exceptional sleuthing skills, while covertly investigating the organization responsible for his current state, hoping to reverse the drug's effects someday. ",
      link_canonical:"https://myanimelist.net/anime/235/Detective_Conan",
      broadcast:"Saturdays at 18:00 (JST)",
      duration:"25 min.",
      rating:"PG-13 - Teens 13 or older",
      score:"8.25",
      image_url:"https://myanimelist.cdn-dena.com/images/anime/7/75199l.jpg"
  };
    res.json(animeApi);
});

router.get('/api/characters', function(req, res) {
    Character.find(function(error,characters){
        res.json(characters)
    })
});


router.post('/api/characters',function (req,res) {
    var object = req.param('character');
    var newCharacter = new Character(object);
    newCharacter.save().then(function () {
        console.log( "Saved!")
    }).catch(function (error) {
        console.log(error.message);
    });

});

router.get('/api/others', function(req, res) {
    var images=[
        "https://d3ieicw58ybon5.cloudfront.net/full/u/b02957a1b7124accb7e68c8a4942221e.jpg",
        "https://i.pinimg.com/564x/3e/e4/90/3ee490ec47d9a4c006d369e38431177a.jpg",
        "https://i.pinimg.com/564x/54/02/51/540251b608adeee1acdbcd7d3661573b.jpg",
        "https://i.pinimg.com/564x/d4/0d/4a/d40d4a38f8a729332223342821181fe6.jpg",
        "https://i.pinimg.com/564x/24/32/11/243211af1786bf229cd84001c9b3185b.jpg",
        "https://i.pinimg.com/564x/19/db/cb/19dbcb46ba7545ccf87fde613e844e02.jpg",
        "https://i.pinimg.com/564x/33/58/cc/3358ccb76cddb3325c7c2e7063d9e783.jpg",
        "https://i.pinimg.com/564x/ea/2a/5c/ea2a5c8b7b5d3285f0503da800d22cc5.jpg",
        "https://i.pinimg.com/564x/2e/e6/79/2ee6792e1eb96e73fbf5cedf3ce7bf66.jpg"
    ];
    Character.find(function(error,characters){
        res.json(images)
    })
});


router.get('/others', function(req, res) {
    res.render('others');
});




module.exports = router;
