
BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

	preload: function () {

		//	Here we load the assets required for our preloader (in this case a background and a loading bar)
		this.load.image('preloaderBackground', 'assets/backgroundCupcake3.png');
		this.load.image('preloaderBar', 'assets/preloadr_bar.png');
		this.load.image('orientationImage', 'assets/orientationimage.png');
	},

	create: function () {

		//	Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
		this.game.input.maxPointers = 1;

		//	Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
		this.game.stage.disableVisibilityChange = true;

	    if (this.game.device.desktop)
	    {
			//	If you have any desktop specific settings, they can go in here
			
		    this.game.stage.scale.pageAlignHorizontally = true;
		        this.game.stage.scale.minWidth = window.innerWidth* window.devicePixelRatio;
		    this.game.stage.scale.minHeight = window.innerHeight* window.devicePixelRatio;
		
	    }
	    else
	    {
			//	Same goes for mobile settings.
			//	In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"






	    


		    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
		   
		    //* window.devicePixelRatio;
		    this.game.stage.scale.minWidth = window.innerWidth;
		    this.game.stage.scale.minHeight = window.innerHeight;

       // alert(this.game.stage.scale.minWidth + "  " + this.game.stage.scale.minHeight);
		    this.game.stage.scale.forceOrientation(false, true, 'orientationImage');
		   //  this.game.stage.scale.pageAlignVertically = true;
		   // this.game.stage.scale.pageAlignHorizontally = true;
		    this.game.stage.scale.setScreenSize(true);
                   


               /**
                 this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
                    this.game.stage.scale.minWidth = 480;
                    this.game.stage.scale.minHeight = 260;
                    this.game.stage.scale.maxWidth = 1024;
                    this.game.stage.scale.maxHeight = 768;
                    this.game.stage.scale.forcePortrait = true;
                     this.game.stage.scale.pageAlignVertically = true;
                    this.game.stage.scale.pageAlignHorizontally = true;
                    */    

                    /**
                    //	Same goes for mobile settings.
+			//	In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
+		    this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
+		    this.game.stage.scale.minWidth = 480;
+		    this.game.stage.scale.minHeight = 260;
+		    this.game.stage.scale.maxWidth = 1024;
+		    this.game.stage.scale.maxHeight = 768;
+		    this.game.stage.scale.forceLandscape = true;
+		    this.game.stage.scale.pageAlignHorizontally = true;
+		    this.game.stage.scale.setScreenSize(true);
*/
                    //this.game.stage.scale.checkOrientationState;
	    }

	    //	By this point the preloader assets have loaded to the cache, we've set the game settings
	    //	So now let's start the real preloader going
	    
		this.game.state.start('Preloader');

	},

};
