

BasicGame.Tutorial = function (game) {

	this.tutorialButton = null;
	this.tutorialStage="start";

};

BasicGame.Tutorial.prototype = {

	create: function () {

		//	We've already preloaded our assets, so let's kick right into the Main Menu itself.
		//	Here all we're doing is playing some music and adding a picture and button
		//	Naturally I expect you to do something significantly better :)
/**
		this.music = this.add.audio('titleMusic');
		this.music.play();
*/
alert("ss");
		this.add.sprite(0, 0, 'sky');
		//, 'buttonOver', 'buttonOut', 'buttonOver'
		this.playButton = this.add.button(400, 600, 'playButton', this.nextTutorial, this);
	},

	update: function () {

		//	Do some nice funky main menu effect here

	},

	nextTutorial: function (pointer) {	
		//	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
		//alert("play button");this.music.stop();

		//	And start the actual game
		if(this.tutorialStage == "start"){
			this.tutorialStage = "last";
			this.playButton.kill();
			this.playButton = this.add.button(400, 600, 'playButton', this.nextTutorial, this);
		}
		if(this.tutorialStage == "last")
		this.game.state.start('Game');
		

	}

};
