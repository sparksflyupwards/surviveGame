
var menuBackground;
var storeOpen
BasicGame.MainMenu = function (game) {

	this.playButton = null;
	this.storeButton = null;
	this.tutorialButton = null;
	this.tutorialStage="start";


};

BasicGame.MainMenu.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
/**
		this.music = this.add.audio('titleMusic');
		this.music.play();
*/
		
		menuBackground = this.add.sprite(0, 0, 'menuBack');
		menuBackground.width = this.game.width;
		menuBackground.height = this.game.height;
		//, 'buttonOver', 'buttonOut', 'buttonOver'
		
		this.playButton = this.add.button(400, 600, 'playButton', this.nextTutorial, this);
		this.storeButton = this.add.button(200, 200, 'playButton', this.openStore, this);
		if(bestScore>0){
		var scoreText = this.add.text(200, 16, 'Your score: '+ score, { fontSize: '32px', fill: '#FFFFFF' });
		var bestScoreText = this.add.text(200, 160, 'Your best score: '+ bestScore, { fontSize: '32px', fill: '#FFFFFF' });
		score = 0;
		}
	},

	update: function () {
		//	Do some nice funky main menu effect here
		if(storeOpen){
			this.game.speedUpper = 200;
			this.playButton = this.add.button(400, 600, 'playButton', this.nextTutorial, this);
			this.storeButton = this.add.button(200, 200, 'playButton', this.openStore, this);
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
		this.playButton.kill();
		this.storeButton.kill();
		storeOpen = true;
			}

};
