
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.sound;		//	the sound manager - add a sound, play one, set-up markers, etc
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.particles;	//	the particle manager
    this.physics;	//	the physics manager
    this.rnd;		//	the repeatable random number generator

    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
};


//platform variables
var platformStarts = [0, 524];
var platformSpeeds = [-40, -40, -40, -40];
var platformWidths = [500, 500];
var platforms, acceleratePlatforms;
//stars 
var stars;
//more sprites
var hearts;
var player;
var heart1, heart2, heart3;
var spikeBars;
//input
var cursors;
//text variables
var scoreText;
var timeText;
var livesText;
//game data
var isDesktop;
var gameRef;
var lives = 3;
var xpTimer =0, xpTime =800;
var platformTimer=0 , platformTime = 7000;
var score = 0, scoreRate = 1;


function acceleratePlayer (player, platform){
 
        player.body.acceleration.x = 0.5;

}

var newPlatform = function (player, platforms,gameRef){
    var posX = platformStarts[Math.floor(Math.random() * platformStarts.length)]
    var posY = gameRef.height-90;
   
    var ledge = platforms.create(posX, posY, 'plate');
    ledge.body.immovable = true;
    ledge.width = platformWidths[Math.floor(Math.random() *platformWidths.length)];
    ledge.body.velocity.y = platformSpeeds[Math.floor(Math.random() * platformSpeeds.length)];
    
    
    var numStars = Math.floor(Math.random()*4+1);
     for (var i = 0; i < numStars ; i++)
    {
       
        var star = stars.create(0,0, 'star');
        star.body.x = (ledge.width/numStars*i +posX);
        star.body.y = (posY-star.height-10);
        star.body.gravity.y = 6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

 
}

function destroyPlatform (platform, bar){

    platform.kill();
 
}


 
function loseLife(player, spike){
    lives --;

    if (lives <0){
        BasicGame.Game.prototype.quitGame(this);
    }
    else{
       console.log(hearts.getAt((lives)).kill()); 
    }

    livesText.content = "Lives: " + lives;
    BasicGame.Game.prototype.restartGame(this);
  

}

function drawHearts(player, spike){
    console.log(heart1.kill());
  
}

function collectStar (player, star){
        
    star.kill();

    score += 10;
    scoreText.content = 'Score: ' + score;
}

BasicGame.Game.prototype = {
    
	create: function () {
    isDesktop = this.game.device.desktop;
    platformTimer = this.time.now+platformTime;
    xpTimer = this.time.now+xpTime;
       
    
        gameRef = this.game;
        // A simple background for our game
        var skyS = this.add.sprite(0, 0, 'sky');
        skyS.body.immovable = true;
    
    // The platforms group contains the ground and the 2 ledges we can jump on
    
    spikeBars = this.add.group();
    platforms = this.add.group();
    //acceleratePlatforms = this.add.group(); 
    var botBar = spikeBars.create(0, this.world.height - 32, 'spikesbot');
    botBar.scale.setTo(2,2);
    botBar.body.immovable = true;
    var topBar = spikeBars.create(0,0, 'spikes');
    topBar.scale.setTo(2,2);
    topBar.body.immovable = true;
    

    // Create the ground the player stands on.
    var ground = platforms.create(0, this.world.height - 64, 'plate');
    ground.body.immovable = true;
    ground.body.velocity.y = -80;


    // Now let's create two ledges
    var ledge = platforms.create(400, 400, 'plate');
    ledge.body.immovable = true;
    ledge.width = 200;
    ledge.body.velocity.y = -80;
    ledge = platforms.create(-150, 250, 'plate');
    ledge.body.immovable = true;
    ledge.body.velocity.y = -80;
   
    // The player and its settings
    player = this.add.sprite(32, this.world.height - 150, 'dude');
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 6;

    player.body.collideWorldBounds = true;
    //animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    
    //hearts and their settings
    hearts = this.add.group();
    heart1 = hearts.create (16+32, 150, '<3');
    heart1.width = 32;
    heart1.height = 32;
    heart1.immovable = true;

    heart2 = hearts.create (16+32*2, 150, '<3');
    heart2.width = 32;
    heart2.height = 32;
    heart2.immovable = true;

    heart3 = hearts.create (16+32*3, 150, '<3');
    heart3.width = 32;
    heart3.height = 32;
    heart3.immovable = true;
    


    // Starting stars
    stars = this.add.group();

    
    for (var i = 0; i < 12; i++)
    {
        var star = stars.create(i * 70, 0, 'star');
        star.body.gravity.y = 6;
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    
    // The text variables
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    timeText = this.add.text(16, 100, 'time: 0', { fontSize: '32px', fill: '#000' });
    livesText = this.add.text(16, 150, 'lives:' +lives, { fontSize: '32px', fill: '#000' });
 

    // Our controls.
           if(isDesktop){
            cursors = this.input.keyboard.createCursorKeys();
            }
            else{
                aler("ok");
            cursors = this.input.pointer1;
        }

	},

	update: function () {
   
   // experience counting
   if(this.time.now>=xpTimer){
    scoreRate +=0.1;
    score +=50*scoreRate;
    scoreText.content = 'Score: ' + score;
    xpTimer = this.time.now + xpTime;
   }
    
    //platform making
    if(this.time.now>platformTimer){
    timeText.content = player.body.velocity.x + "   "+player.body.velocity.y;
    platformTimer = this.time.now + platformTime;
    newPlatform(player, platforms, gameRef);
    }

   
	

        
    // collide settings
    this.physics.collide(player, platforms);
    this.physics.collide(stars, platforms);
    this.physics.collide(player, platforms, acceleratePlayer, null, gameRef);
   
    // overlap settings
    this.physics.overlap(player, stars, collectStar, null, this);
    this.physics.overlap(platforms, spikeBars, destroyPlatform, null, gameRef);
    this.physics.overlap(player, spikeBars, loseLife, null, gameRef);


  
if(Math.abs(player.body.velocity.x)>=250){
    console.log("trippy");
        player.body.acceleration.x=0;
    }
       
        
if(!isDesktop){
    // mobile inputs

        if(cursors.pointer.isDown){

            if(this.input.x < (player.body.x-10)){
            timeText.content = 'left';
            player.animations.play('left');
            player.body.velocity.x += -150;
            }
            else if (this.input.x >(player.body.x +10)){
            timeText.content = 'right';
            player.animations.play('right');
            player.body.velocity.x += 150;
            }

            else{
            player.body.velocity.x =Math.abs(player.body.velocity.x)-150;
            }
        }
}
else {

    // desktop inputs
    if (cursors.left.isDown)
    {
        //move left
        player.body.acceleration.x -= 15;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //move right
        player.body.acceleration.x += 15;
        player.animations.play('right');
    }
    else
    {
        // Stand still
        player.animations.stop();
        player.body.velocity.x = 0
        //Math.abs(player.body.velocity.x)-150;
        player.frame = 4;
    }



}
 
 //jump
if (cursors.up.isDown && player.body.touching.down)
{
player.body.velocity.y = -200;
}
   

	},

	quitGame: function (gameRef) {

        lives =3;

		gameRef.state.start('MainMenu');

	},

    restartGame: function (gameRef) {
     player.body.x = 500;
     player.body.y = 100;
    }

    

};




