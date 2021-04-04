import Phaser from 'Phaser';
import BaseScene from './BaseScene';

class ScoreScene extends BaseScene {

	constructor (config){
		super('ScoreScene', config);
	}

	create(){
		super.create();
		let bestScoreValue = localStorage.getItem("bestScore") || 0;
		let scoreMessage = `Best score: ${bestScoreValue}`;
		let style = { fontFamily: 'Arial, Helvetica, sans-serif', fontSize: '28px'};
		let backButtonCoordinates = [this.config.width - 10, this.config.height - 10];
		this.add.text(...this.config.center, scoreMessage, style).setOrigin(0.5, 0.5);
		let backButton = this.add.image(...backButtonCoordinates , 'back', style).setOrigin(1).setInteractive();
		backButton.on('pointerup', (backButton)=>{
			this.scene.start('MenuScene')
		})
	}
}

export default ScoreScene;