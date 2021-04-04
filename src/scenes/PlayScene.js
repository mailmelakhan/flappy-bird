import Phaser from 'Phaser';
import BaseScene from './BaseScene';

class PlayScene extends BaseScene {

	constructor (config){
		super('PlayScene', config);
		this.bird = null;
		this.pipes = null;

		this.score = null;
		this.bestScore = null;
		this.scoreValue = 0;
		this.bestScoreValue = 0;

    this.timer321 = null;
	}


    /*
    Creating game object and setup inputs.
    */
	create(){ 
	  super.create();
    this.createBirdAnimations();
	  this.createBird();
	  this.createPipes();
	  this.createScoreSection();
	  this.createCollider();
	  this.setupInputEvents();
	}

	createBird(){
      this.bird = this.physics.add.sprite(this.config.bird.x,this.config.bird.y,'bird')
      .setFlipX(true)
      .setScale(2)
      .setOrigin(0,0.5);
      this.bird.body.gravity.y=this.config.bird.gravity;
      this.bird.setCollideWorldBounds(true);
      this.bird.setBodySize(this.bird.width, this.bird.height - 10);
      this.bird.play('fly');
	}

	createBirdAnimations(){
    this.anims.create({
      key: 'fly',
      frames: this.anims.generateFrameNumbers('bird', {start:8, end:15}),
      frameRate: 8,
      repeat: -1
    });
    this.anims.create({
      key: 'crashed',
      frames: this.anims.generateFrameNumbers('bird', {start:17, end:18}),
      frameRate: 8,
      repeat: 1
    });
  }

	createPipes(){
      this.pipes = this.physics.add.group();

      let vGap = 0, vPos = 0, hPos = 0;
      for (var i = 1; i <= 4; i++) {
        vGap = Phaser.Math.Between(...this.config.pipe.vRange);
        vPos = Phaser.Math.Between(...this.config.pipe.vGap);
        hPos += Phaser.Math.Between(...this.config.pipe.hGap);

        this.pipes.create(hPos,vPos,"pipe").setImmovable(true).setScale(3).setFlipY(true).setOrigin(0,1);
        this.pipes.create(hPos,vPos+vGap,"pipe").setImmovable(true).setScale(3).setOrigin(0,0);
      }
      this.config.pipe.rightMostX = this.getRightMostPipeX(this.pipes);
      this.pipes.setVelocityX(this.config.pipe.velocity);
	}


	createScoreSection(){
		this.scoreValue = 0;
		this.bestScoreValue = localStorage.getItem("bestScore") || 0;
		this.score = this.add.text(16, 16, `Score: ${this.scoreValue}`, { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '28px'});
		this.bestScore = this.add.text(16, 56, `Best score: ${this.bestScoreValue}`, { fontFamily: 'Arial, Helvetica, sans-serif'});
	}


	createCollider(){
	  this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
	}


	setupInputEvents(){
	  this.input.on('pointerdown',this.flap, this);
    this.input.keyboard.on('keydown-SPACE',this.flap, this);
    this.input.keyboard.on('keydown-ESC',this.pause, this);
    this.input.keyboard.on('keydown-ENTER',function(){alert("we;;");this.scene.resume()}, this);

    this.events.on('resume',() => {
      this.countdown = 3;
      this.countDownText = this.add.text(...this.config.center, 'Flying in: ' + this.countdown, {color:'#fff'}).setFontSize(32).setOrigin(0.5,0.5);
      this.timer321 = this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          if(this.countdown <= 0){
            this.countDownText.destroy();
            this.physics.resume();
            this.timer321.remove();
          }else{
            //debugger
            this.countdown--;
            this.countDownText.setText('Flying in:' + this.countdown);
          }
        },
        callbackScope:this,
        loop:true
      })
    })
	}


	flap(){
      this.bird.body.velocity.y = this.config.bird.velocity;
    }


  getRightMostPipeX(pipes){
    let xPos = 0;
    this.pipes.getChildren().forEach(function(pipe){
      xPos = Math.max(xPos, pipe.x);
    });
    return xPos;
  }
	

	updateBestScore(){
		if(this.scoreValue > this.bestScoreValue){
			this.bestScoreValue = this.scoreValue;
			localStorage.setItem("bestScore", this.bestScoreValue);
		}
	}

	/*
	Update game screen and recycle pipes.
	*/
	update(){
      if(this.bird.getBounds().top <= 0 || this.bird.getBounds().bottom >= this.config.height)  {
        this.gameOver();
      }
      this.recyclePipes();
      this.updateBestScore();
	}

  recyclePipes(){
    let tempPipes = [];
    let that = this;

    this.pipes.getChildren().forEach(function(pipe){
      if(pipe.getBounds().right <= 0){
        tempPipes.push(pipe);
        if(tempPipes.length==2){
          let posX = that.config.pipe.rightMostX;
          let vRange = that.config.pipe.vRange;
          let vPos = that.config.pipe.vGap ;
          let vGap = Phaser.Math.Between(...vRange);

          tempPipes[0].setX(posX);
          tempPipes[0].setY(vGap);
          tempPipes[1].setX(posX);
          tempPipes[1].setY(vGap+Phaser.Math.Between(...vPos));
          tempPipes = [];

          that.scoreValue += 1;
          that.score.setText(`Score: ${that.scoreValue}`);
        }
      }
    });
  }

  gameOver(){
    this.physics.pause();
    this.bird.setTint(0xFF0000);
    this.updateBestScore();
    this.bird.setFlipY(true);
    this.bird.play('crashed');
    this.time.addEvent({
      delay: 1000,
      callback : () => {
        this.scene.start('MenuScene');
      },
      loop: false
    });
  }

  pause(){
    this.physics.pause();
    this.scene.pause();
    this.scene.launch('PauseScene');
  }
}

export default PlayScene;