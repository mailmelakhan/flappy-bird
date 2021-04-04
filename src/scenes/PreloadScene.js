import Phaser from 'Phaser';
import BaseScene from './BaseScene';

class PreloadScene extends BaseScene {

	constructor (config){
		super('PreloadScene', config);
	}

	preload(){
      this.load.image("sky","assets/sky.png");
      this.load.spritesheet('bird','assets/birdSprite.png', {
		  frameWidth: 16, frameHeight: 16
	  });
      this.load.image('pipe','assets/pipe2.png');
      this.load.image('back','assets/back.png');
	}

	create(){
		super.create();
		this.scene.start('MenuScene');
	}
}

export default PreloadScene;