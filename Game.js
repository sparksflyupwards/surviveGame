
BasicGame.Game = function (game) {

	//	When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;		//	a reference to the currently running game
    this.add;		//	used to add sprites, text, groups, etc
    this.camera;	//	a reference to the game camera
    this.cache;		//	the game cache
    this.input;		//	the global input manager (you can access this.input.keyboard, this.input.mouse, as well from it)
    this.load;		//	for preloading assets
    this.math;		//	lots of useful common math operations
    this.stage;		//	the game stage
    this.time;		//	the clock
    this.tweens;	//	the tween manager
    this.world;		//	the game world
    this.rnd;		//	the repeatable random number generator



    this.totalScore =0;
    //	You can use any of these from any function within this State.
    //	But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.
    this.speedPurchasedTotal = 0;
    this.livesPurchasedTotal =0;
    this.cheeseCake = "cake";
    this.cheesePurchasedTotal =0;
};

    var carFloInst;
    var speedPurchased = 0;
    var livesPurchased =0;
    var cheesePurchased = 0;
//platform variables
var gameWidth;
var platformWidths;
var platformStarts;
var platformSpeeds;
var currentPlatform;

var platforms, dropPlatforms, wasDropPlatform, makeRightPlatform = true;
// acceleratePlatforms, jumpPlatforms;
//stars 
var stars, starWidth = 50, starHeight = 50;
yellowScore = 500, pinkScore = 800, blueScore = 1500;
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
var lives = 1 + livesPurchased;
var xpTimer =0, xpTime =800;

//timers and scores
var platformTimer=0 , platformTime = 3000;
var restartTimer =0, restartTime = platformTime/6;
var score = 0, scoreRate = 1, bestScore =0, speedScore =0;
var naturalVelocity =0;
var speedModifier=1, platformSpeedNew;
var showRestart = false, show =0, one, two, three;
var gameIsNew = true;
//more sprites
var bricks;
var playerMaxSpeed;


function makeZero(value){
    if(!(value>=0)){
        value =0;
    }
    return value;
}

function changeScore (scoreChange){
    score += scoreChange;
    speedScore += scoreChange;
    console.log("score added: " + scoreChange + '  '+ score);
}

function dropPlatform (player, platform){
    platform.body.velocity.y=300;
    platform.body.acceleration.y=300;
    player.body.velocity.y = -300;
}


var platformCollision = function (player, platform){
if(platform.name == "accelerate"){
 
 player.body.acceleration.x = 0;
}
else if (platform.name == "jump"){
player.body.acceleration.x = 0;
player.body.velocity.y += -200;
}
else if (platform.name == "normal"){
player.body.acceleration.x = 0;
}

};



var newPlatform = function (player, platformGroupRef,platformName,gameRef){
    //var posX = platformStarts[Math.floor(Math.random() * platformStarts.length)]
    var posX = platformStarts[currentPlatform];
    var posY = gameRef.height-90;
   
    var ledge = platformGroupRef.create(posX, posY, platformName);
    ledge.body.immovable = true;
    /**
    ledge.width = platformWidths[Math.floor(Math.random() *platformWidths.length)];
    ledge.body.velocity.y = platformSpeeds[Math.floor(Math.random() * platformSpeeds.length)]*speedModifier;
    */
    ledge.width = platformWidths[currentPlatform];
    ledge.body.velocity.y = platformSpeeds[currentPlatform]*speedModifier;
    platformSpeedNew =  ledge.body.velocity.y *speedModifier;
    ledge.name = platformName;
    
    var numStars = Math.floor(Math.random()*8+1);
     var randStar;
     for (var i = 0; i < numStars ; i++)
    {
        randStar = Math.floor(Math.random()*(10+speedModifier*3/2));
  
        if(randStar<=5){
            var star = stars.create(0,0, 'squareCheese');
                star.name = "yellow";
        }
        else if (randStar <=8){

            var star = stars.create(0,0, 'triangleCheese');
                star.name = "pink";
                 console.log("randStar " + randStar+ star.name);
        }
            else {
            var star = stars.create(0,0, 'circleCheese');
                star.name = "blue";
        }
        star.body.width = 50;
        star.body.height = 50;
        star.body.x = (ledge.width/numStars*i +posX);
        star.body.y = (posY-star.body.height-10);
        star.width = 50;
        star.height = 50;
        star.body.gravity.y = 20;
      

       // star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }
    //alert("newPlatform: "+ledge.name);
    /**
    var brick = bricks.create(0,0, 'brick');
    brick.body.moves = false;
    brick.height = 50;
    brick.width = 100;
    brick.body.gravity.y = 0.6;
        brick.body.x = posX + ledge.width/2;
        brick.body.y = (posY-brick.height-10);
        */

        if(Math.floor(Math.random()*10)>5){
            makeRightPlatform = false;
        }
        else {
            makeRightPlatform = true;
        }



        
    if(makeRightPlatform&&currentPlatform<3){
    currentPlatform++;
    if(currentPlatform>=3){
        makeRightPlatform = false;
    }
    }
    else if (currentPlatform<=0){
        currentPlatform++;
    }
    else if (!makeRightPlatform){
        currentPlatform--;
        if(currentPlatform<=0){
            makeRightPlatform = true;
        }
    }
    
}

function destroyPlatform (platformRef, bar){
   
    platformRef.kill();
 
}
function destroyStar(starRef, bar){
    starRef.kill();
 
}

 
function loseLife(player, spike){
    lives --;
    alert(lives+"  ");
    if (lives <0){
        BasicGame.Game.prototype.quitGame(this);
    }
    else{
       hearts.getAt(lives).kill(); 
       livesText.content = "Lives: " + lives;
       showRestart = true;
       BasicGame.Game.prototype.restartGame(this);
    }
    
    

}


function collectStar (player, star){
   
    console.log("cheese collected:"+ cheesePurchased);
    if(star.name == "yellow"){
    changeScore(yellowScore+cheesePurchased);   
    console.log("yeellow" + yellowScore);
    }
    else if (star.name == "pink"){
       changeScore(pinkScore+cheesePurchased);  
       console.log("pink" + pinkScore);
    }
    else if (star.name == "blue"){
       changeScore(blueScore+cheesePurchased); 
       console.log("blue score:" + blueScore);

    }
   
    scoreText.content = 'Score: ' + score;
     star.kill();
}


function destroyGame (gameRef){
    //destroy player
    player.kill();
    //destroy platforms
    platforms.removeAll();
    dropPlatforms.removeAll();
    //destroy stars
    stars.removeAll();
    bricks.removeAll();
}


function createGame (gameRef){
    gameIsNew = true;
     platformTimer = gameRef.time.now+platformTime/2;
     playerMaxSpeed = 250 + makeZero(speedPurchased);
     console.log("max speed" + playerMaxSpeed);
     var botBar = spikeBars.create(0, gameRef.world.height - 32, 'spikesbot');
    botBar.scale.setTo(2,2);
    botBar.body.height=botBar.body.height*2;
    botBar.body.immovable = true;
    var topBar = spikeBars.create(0,0, 'spikes');
    topBar.scale.setTo(2,2);
    topBar.body.immovable = true;
    

    // Create the ground the player stands on.
    var ground = platforms.create(0, gameRef.world.height - 64, 'plate');
   
    ground.body.immovable = true;
    ground.body.velocity.y = -80;
    ground.width = gameRef.world.height/4;

    // Now let's create two ledges
    var ledge = platforms.create(400, 400, 'plate');
    ledge.body.immovable = true;
    ledge.width = 200;
    ledge.body.velocity.y = -80*speedModifier;
    ledge = platforms.create(-150, 250, 'plate');
    ledge.body.immovable = true;
    ledge.body.velocity.y = -80*speedModifier;
   

       // The player and its settings
    player = null;
    player = gameRef.add.sprite(-150, 250, 'dude');
    //player.body.bounce.y = 0.2;
    player.body.gravity.y = 6;

    player.body.collideWorldBounds = true;
    //animations, walking left and right.
    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);


    player.x = -150;
    player.y = 250;

    

    
    
   


    // Starting stars

    
    for (var i = 0; i < 12; i++)
    {
         switch(Math.floor(Math.random()*3)){
            case 1:
            var star = stars.create(i * 70,0, 'squareCheese');
            break;
            case 2: 
            var star = stars.create(i * 70,0, 'circleCheese');
            break;
            default:
            var star = stars.create(i * 70,0, 'triangleCheese');

        }
        star.body.gravity.y = 6;
        star.width = starWidth;
        star.height = starHeight;
      //  star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    


      
    // Our controls.
           if(isDesktop){
            cursors = gameRef.input.keyboard.createCursorKeys();
            }
            else{
           // cursors = this.input.pointer1;
        }
}
BasicGame.Game.prototype = {
    
	create: function () {

;
    
    speedPurchased = makeZero(this.game.speedPurchasedTotal);
    livesPurchased = makeZero(this.game.livesPurchasedTotal);
    cheesePurchased = makeZero(this.game.cheesePurchasedTotal);


    console.log(speedPurchased + "  " + livesPurchased + "   " + cheesePurchased);

 // alert(livesPurchased + "  "+ speedPurchased+"  "+cheesePurchased);
gameWidth = this.game.width;
platformWidths = [gameWidth/4, gameWidth/8, gameWidth/8, gameWidth/4];
platformStarts = [0, (gameWidth/5+gameWidth/15),(gameWidth/4+gameWidth/8+ 2*gameWidth/15), (gameWidth/4+2*gameWidth/8+3*gameWidth/15)];
platformSpeeds = [-40, -40, -40, -40];
currentPlatform =0;
    isDesktop = this.game.device.desktop;
    xpTimer = this.time.now+xpTime;
        
           
        gameRef = this.game;
        // A simple background for our game
        var skyS = this.add.sprite(0, 0, 'sky');
        skyS.body.immovable = true;
        skyS.width = this.game.width;
        skyS.height = this.game.height;

    
    spikeBars = this.add.group();
    platforms = this.add.group();
    bricks = this.add.group();
    hearts = gameRef.add.group();
    dropPlatforms = this.add.group();
    stars = gameRef.add.group();
   // acceleratePlatforms = this.add.group(); 
    jumpPlatforms = this.add.group(); 

    


    //hearts and their settings
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



    // The text variables
    scoreText = gameRef.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
    timeText = gameRef.add.text(16, 100, '', { fontSize: '32px', fill: '#000' });
    livesText = gameRef.add.text(16, 150, '', { fontSize: '32px', fill: '#000' });
   createGame(gameRef);


	},

	update: function () {
if(showRestart){

   
    if(this.time.now>=restartTimer){
    if(gameIsNew){
        gameIsNew = false;
        restartTimer = this.time.now + restartTime/2;
    }
    else{
    restartTimer = this.time.now + restartTime;
    }
    if(show ==0){
    one = gameRef.add.sprite(gameRef.world.width/2, gameRef.world.height/2, 'imageof1');
    show++;
    }
    else if (show ==1){
    one.kill();
    show++;
    }
    else if (show ==2){
    two = gameRef.add.sprite(gameRef.world.width/2, gameRef.world.height/2, 'imageof2');
    show++;
    }
    else if (show ==3){
    two.kill();
    show++;
    }
    else if (show == 4){
    three  = gameRef.add.sprite(gameRef.world.width/2, gameRef.world.height/2, 'imageof3');
    show++;
    }
    else if (show == 5){

    three.kill();
    showRestart = false;
    show =0;
    }
    }
}
  
   if(score/1000>1){
   speedModifier = 1+speedScore/30000;
    }
   
   player.body.gravity.y = 6*speedModifier;

   // experience counting
   /**
   if((this.time.now>=xpTimer)&&!showRestart){
    scoreRate +=0.1;
    score +=50*scoreRate;
   // scoreText.content = 'Score: ' + score+ 'speedModifier: ' + speedModifier + "\n platform speed: " + platformSpeedNew + " platformTimer: " + platformTime/speedModifier;
    xpTimer = this.time.now + xpTime;
   }
   */
   //  timeText.content = this.game.scale.width+"   "+ this.game.scale.height;
    //platform making
    if(!showRestart){
    if(this.time.now>platformTimer){
   
    platformTimer = this.time.now + platformTime/speedModifier;
    if(Math.random()*10<2&&!wasDropPlatform){
    wasDropPlatform = true;
    newPlatform(player, dropPlatforms, "dropPlatform", gameRef); 
    }
    else { 
    wasDropPlatform = false;
    newPlatform(player, platforms, "plate", gameRef); 
    }
    /**
    switch (Math.floor(Math.random()*3.99)){
   case 0: newPlatform(player, acceleratePlatforms, "accelerate", gameRef);
    break;
   case 1: newPlatform(player, jumpPlatforms, "jump", gameRef); 
   break;
   case 2: newPlatform(player, platforms, "normal", gameRef); 
   break;
    }
*/
    }
}
   


        
    // collide settings
    this.physics.collide(player, platforms);
    //this.physics.collide(player, acceleratePlatforms);
    this.physics.collide(stars, platforms);
    this.physics.collide(stars, dropPlatforms);
   // this.physics.collide(player, jumpPlatforms, platformCollision, null, gameRef);
   // this.physics.collide(player, acceleratePlatforms, platformCollision, null, gameRef);
   
    // overlap settings
    this.physics.overlap(player, dropPlatforms, dropPlatform, null, gameRef);
    this.physics.overlap(player, stars, collectStar, null, this);
    this.physics.overlap(platforms, spikeBars, destroyPlatform, null, gameRef);
   // this.physics.overlap(dropPlatforms, spikeBars, destroyPlatform, null, gameRef);
    this.physics.overlap(stars, spikeBars, destroyStar, null, gameRef);


   // this.physics.overlap(dropPlatforms, spikeBars, destroyPlatform, null, gameRef);
  
   // this.physics.overlap(acceleratePlatforms, spikeBars, destroyPlatform, null, gameRef);
    this.physics.collide(player, spikeBars, loseLife, null, gameRef);


  
if(Math.abs(player.body.velocity.x)>=playerMaxSpeed){
        player.body.acceleration.x=0;
    }
       
        
if(!isDesktop){
 
    // mobile inputs
    //onTap onDown isDown
     
timeText.content = "touching";
  /**
            if(this.input.x < (player.body.x-10)){
            timeText.content = 'left';
            player.animations.play('left');
            player.body.velocity.x = -150;
            }
            else if (this.input.x >(player.body.x +10)){
            timeText.content = 'right';
            player.animations.play('right');
            player.body.velocity.x = 150;
            }
            */

            if (this.input.x <= this.game.width/2){
                   timeText.content = "left";
            player.animations.play('left');
            player.body.velocity.x = -150*speedModifier;
            }
            else if (this.input.x >= this.game.width*1/2){
                timeText.content = "right";
            player.animations.play('right');
            player.body.velocity.x = 150*speedModifier;
            }
            else{
            player.body.velocity.x =0;
              player.frame = 4;
            //Math.abs(player.body.velocity.x)-150;
            }
            /**
               if(!(this.input.pointer1.isDown||this.input.pointer2.isDown)){
             timeText.content = "NOT touching";

               player.body.velocity.x =0;
                 player.frame = 4;
        }
        */
        
}  
else {
    // desktop inputs
    if (cursors.left.isDown)
    {
        //move left
        player.body.velocity.x = -150*speedModifier;
        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //move right
        player.body.velocity.x = 150*speedModifier;
        player.animations.play('right');
    }
    else
    {
        // Stand still
        player.animations.stop();
        player.body.velocity.x = 0;
        // Math.abs(player.body.velocity.x)-150;
        player.frame = 4;
    }

if (cursors.up.isDown && player.body.touching.down)
{
player.body.velocity.y = -200*speedModifier;
if(player.body.velocity.x<0){
player.body.velocity.x-=300*speedModifier;
}
else if (player.body.velocity.x>0){
player.body.velocity.x+=300*speedModifier;
}
}

} 

 //jump

  
	},

	quitGame: function (gameRef) {
        alert("ere");
        lives =1;
        if(score>bestScore){
            bestScore = score;
        }
        currentPlatform = 0;
        speedModifier =1;
        gameRef.totalScore = makeZero(gameRef.totalScore);
    console.log(gameRef.totalScore+"before adding "+ score);
        gameRef.totalScore +=score;
     console.log(gameRef.totalScore+"after adding  "+ score);

        destroyGame(gameRef);
		gameRef.state.start('MainMenu');
       
	},

    restartGame: function (gameRef) {
 
     //pause game
     //show 3-2-1
    speedModifier =1;
    currentPlatform =0;
    speedScore = 0;
    destroyGame(gameRef);
    createGame(gameRef);
    }

    

};



