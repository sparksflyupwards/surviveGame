
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

var platformStarts = [0, 100, 200, 400, 600, 800, 900];
// game = this;




};
var player;
var platforms;
var cursors;
var rocket;
var stars;
var score = 0;
var scoreText;
var timeText;
var spikeBars;
var platformWidths = [200,200, 200, 200];
//[-40, -80, -50, -100];
var platformSpeeds = [-40, -40, -40, -60];
var platformStarts = [0, 100, 200, 400, 600, 800, 900];
function collectStar (player, star){
        
    // Removes the star from the screen
    star.kill();

    // Add and update the score
    score += 10;
    scoreText.content = 'Score: ' + score;
}
function newPlatform (platform, bar){

    platform.kill();

    var posX = platformStarts[Math.floor(Math.random() * platformStarts.length)];
    var posY = this.height-90;

   // alert(posY);
  // platforms.create(posX, posY, 'plate');
   //
    //var ledge = platforms.create(posX, posY, 'plate');
    /**
    ledge.body.immovable = true;
   // alert("width:"+ Math.floor(Math.random() *platformWidths.length)+" speed:"+Math.floor(Math.random() * platformSpeeds.length))
     
    ledge.width = platformWidths[Math.floor(Math.random() *platformWidths.length)];
   
    ledge.body.velocity.y = platformSpeeds[Math.floor(Math.random() * platformSpeeds.length)];
    
    var numStars = Math.floor(Math.random()*4+1);
   
     for (var i = 0; i < numStars ; i++)
    {
        // Create a star inside of the 'stars' group
        //var star = stars.create( ledge.width/i+ledge.x, ledge.height+50, 'star');
        //ledge.width/(i+1) +posX
        //posY+star.height
        var star = stars.create(0,0, 'star');
        star.body.x = (ledge.width/numStars*i +posX);
        star.body.y = (posY-star.height-10);
        // Let gravity do its thing
        star.body.gravity.y = 6;

        // This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;

      // timeText.content = (ledge.width/(i+1) +posX) + " " + (posY+star.height);

        timeText.content = (ledge.width/(i+1) +posX-ledge.width)+ " "+ (posY+star.height);
    }
 */
}
BasicGame.Game.prototype = {
	create: function () {
        // A simple background for our game
    this.add.sprite(0, 0, 'sky');
    
    // The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.add.group();
   
    spikeBars = this.add.group();
    var botBar = spikeBars.create(0, this.world.height - 32, 'spikesbot');
    botBar.scale.setTo(2,2);
    botBar.body.immovable = true;
    var topBar = spikeBars.create(0,0, 'spikes');
    topBar.scale.setTo(2,2);
    topBar.body.immovable = true;
    

    // Here we create the ground.
    var ground = platforms.create(0, this.world.height - 64, 'plate');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    //ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    ground.body.velocity.y = -80;
   // ground.play('disapear', 3, false, true);
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

    // Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 6;
   // player.body.collideWorldBounds = true;
     // Our two animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Finally some stars to collect
    stars = this.add.group();

    // Here we'll create 12 of them evenly spaced apart
    for (var i = 0; i < 12; i++)
    {
        // Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        // Let gravity do its thing
        star.body.gravity.y = 6;

        // This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    // The score
    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
    timeText = this.add.text(16, 100, 'time: 0', { fontSize: '32px', fill: '#000' });
    // Our controls.
    cursors = this.input.keyboard.createCursorKeys();


		//	Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

	},

	update: function () {
		// game.stage.scale.startFullScreen();
   // var timeCheck = new Device();
        //timeText.content = 'time: ' + 2;
    // Collide the player and the stars with the platforms
    this.physics.collide(player, platforms);
    this.physics.collide(stars, platforms);
    //game.physics.collide(rocket, platforms);
   // game.physics.collide(stars, rocket);
    // Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.overlap(player, stars, collectStar, null, this);
   // game.physics.collide(player, rocket);
   // this.physics.overlap(platforms, spikeBars, newPlatform, null, this);
    

/**
if (game.input.onDown){
game.stage.scale.startFullScreen();
timeText.content = 'down';
timeText.content = "DOWN";
if(game.input.x < player.body.x){
timeText.content = 'left';
player.animations.play('left');
player.body.velocity.x = -150;
}
else if (game.input.x >player.body.x ){
timeText.content = 'right';
player.animations.play('right');
player.body.velocity.x = 150;
}
else{
player.body.velocity.x = 0;
}
}

*/
    // Reset the players velocity (movement)
    player.body.velocity.x = 0;
   
   

    if (cursors.left.isDown)
    {
        // Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        // Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        // Stand still
        player.animations.stop();

        player.frame = 4;
    }
    /**
// Allow the player to jump if they are touching the ground.
if (cursors.up.isDown && player.body.touching.down)
{
player.body.velocity.y = -350;
}
*/
	},

	quitGame: function (pointer) {

		//	Here you should destroy anything you no longer need.
		//	Stop music, delete sprites, purge caches, free resources, all that good stuff.

		//	Then let's go back to the main menu.
        
		this.game.state.start('MainMenu');

	}

};
