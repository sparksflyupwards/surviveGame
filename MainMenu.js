
var menuBackground;
var storeOpen
var cheeseCost = 1000, livesCost = 10000, speedCost = 5000;
var gameWidth, gameHeight;
var totalCheeseText;
var cheeseCostText, cheestTotalText;
var livesCostText, livesTotalText;
var speedCostText, speedTotalText;
BasicGame.MainMenu = function (game) {

	this.playButton = null;
	this.storeButton = null;

	this.buySpeedButton = null;
	this.buyLivesButton = null;
	this.buyCheeseButton = null;
	this.closeStoreButton = null;

	this.speedPurchased =0;
	this.livesPurchased =0;
	this.cheesePurchased =0;

	this.tutorialButton = null;
	this.tutorialStage="start";

	this.firstGame = true;

};

BasicGame.MainMenu.prototype = {

	create: function () {

	totalCheeseText = this.game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
	gameWidth = this.game.width;
	gameHeight = this.game.height;
	console.log("created menu");

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
/**
		this.music = this.add.audio('titleMusic');
		this.music.play();
*/
		
		this.makeMenu();

	},

	update: function () {
		//	Do some nice funky main menu effect here
	if(storeOpen){
			totalCheeseText.content = "Score: " + this.game.totalScore;
			speedTotalText.content = 'Total Bonus '+ this.game.speedPurchasedTotal;

			livesTotalText.content = 'Lives owned '+ this.game.livesPurchasedTotal;
 			cheestTotalText.content = 'Cheese bonus '+ this.game.cheesePurchasedTotal;


	}

	},

	nextTutorial: function (pointer) {	
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//alert("play button");this.music.stop();

		//	And start the actual game
		if(this.tutorialStage == "last"){
			menuBackground.kill();
		this.game.state.start('Game');
		}
	if(this.tutorialStage == "start"){
			this.tutorialStage = "last";
			this.playButton.kill();
			this.playButton = this.add.button(200, 200, 'playButton', this.nextTutorial, this);
		}

		

	},
	openStore: function(pointer){

	totalCheeseText = this.game.add.text(16, 16, '', { fontSize: '32px', fill: '#000' });
console.log(this.game.totalScore);
	
    if(!(this.game.speedPurchasedTotal>=0)){
    this.game.speedPurchasedTotal = 0;
    }
     if(!(this.game.livesPurchasedTotal>=0)){
    this.game.livesPurchasedTotal = 0;
    }
     if(!(this.game.cheesePurchasedTotal>=0)){
    this.game.cheesePurchasedTotal = 0;
    }



    console.log(speedPurchased + "  " + livesPurchased + "   " + cheesePurchased+ "food: "+this.game.cheeseCake);



		this.playButton.kill();
		this.storeButton.kill();
		storeOpen = true;
			var buttonWidth = 50;
			var buttonHeight = 50;
			this.buySpeedButton = this.add.button(200, 200, 'dude', this.buySpeed, this);
			this.buySpeedButton.width = buttonWidth;
			this.buySpeedButton.height = buttonHeight;
			speedCostText = this.add.text(this.buySpeedButton.x+this.buySpeedButton.width+20, this.buySpeedButton.y+20, 'Speed costs '+ speedCost, { fontSize: '32px', fill: '#FFFFFF' });
			speedTotalText = this.add.text(this.buySpeedButton.x+this.buySpeedButton.width+20, this.buySpeedButton.y+70, 'Total Bonus '+ this.game.speedPurchasedTotal, { fontSize: '32px', fill: '#FFFFFF' });


			this.buyLivesButton = this.add.button(200, 400, '<3', this.buyLives, this);
			this.buyLivesButton.width = buttonWidth;
			this.buyLivesButton.height = buttonHeight;
			livesCostText = this.add.text(this.buyLivesButton.x+this.buyLivesButton.width+20, this.buyLivesButton.y+20, 'Lives costs '+ livesCost, { fontSize: '32px', fill: '#FFFFFF' });
			livesTotalText = this.add.text(this.buyLivesButton.x+this.buyLivesButton.width+20, this.buyLivesButton.y+70, 'Lives owned '+ this.game.livesPurchasedTotal, { fontSize: '32px', fill: '#FFFFFF' });


			this.buyCheeseButton = this.add.button(200, 600, 'squareCheese', this.buyCheese, this);
			this.buyCheeseButton.width = buttonWidth;
			this.buyCheeseButton.height = buttonHeight;
			cheeseCostText = this.add.text(this.buyCheeseButton.x+this.buyCheeseButton.width+20, this.buyCheeseButton.y+20, 'Cheese costs '+ cheeseCost, { fontSize: '32px', fill: '#FFFFFF' });
			cheestTotalText = this.add.text(this.buyCheeseButton.x+this.buyCheeseButton.width+20, this.buyCheeseButton.y+70, 'Cheese bonus '+ this.game.cheesePurchasedTotal, { fontSize: '32px', fill: '#FFFFFF' });



			this.closeStoreButton = this.add.button(800, 600, 'playButton', this.closeStore, this);
		
		},
	buySpeed: function(pointer){
		if(this.game.totalScore>=speedCost){
		this.game.totalScore-=speedCost;
		this.game.speedPurchasedTotal +=100;
	}
		else {
			alert("You need more cheese!");
		}

	},
	buyLives: function(pointer){
		alert('buy lives');
		if(this.game.totalScore>=livesCost){
		if(this.game.livesPurchasedTotal<3){
		this.game.totalScore -= livesCost;
		this.game.livesPurchasedTotal +=1;
	}
	}
		else {
			alert("You need more cheese!");
		}

	},
	buyCheese: function(pointer){
		if(this.game.totalScore>=cheeseCost){
		this.game.totalScore -= cheeseCost;
		this.game.cheesePurchasedTotal +=100;
	}
		else {
			alert("You need more cheese!");
		}

	},
	closeStore: function(pointer) {
		//	totalCheeseText.kill();

			this.buySpeedButton.kill();
			this.buyLivesButton.kill();
			this.buyCheeseButton.kill();
			this.closeStoreButton.kill();
			this.makeMenu();
		
		this.storeOpen = false;
	},
	makeMenu: function(pointer) {
		menuBackground = this.add.sprite(0, 0, 'menuBack');
		menuBackground.width = this.game.width;
		menuBackground.height = this.game.height;
		//, 'buttonOver', 'buttonOut', 'buttonOver'
		this.playButton = this.add.button(gameWidth/3, gameHeight/3, 'newGameButton', this.nextTutorial, this);
		this.storeButton = this.add.button(gameWidth/3, gameHeight/3-this.playButton.height, 'storeButton', this.openStore, this);
		//this.storeButton.height = gameHeight/3;
		//this.storeButton.width = gameWidth/3;
		if(this.game.bestScore>0){
		var scoreText = this.add.text(200, 16, 'Your score: '+ score, { fontSize: '32px', fill: '#FFFFFF' });
		var bestScoreText = this.add.text(200, 160, 'Your best score: '+ this.game.bestScore, { fontSize: '32px', fill: '#FFFFFF' });
		score = 0;
		}
	}


};
