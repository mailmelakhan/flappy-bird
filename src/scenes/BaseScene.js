import Phaser from 'Phaser';

const WIDTH = 400;
const HEIGHT = 600;

const defaultConfig = {
	width : WIDTH,
	height : HEIGHT,
	center: [WIDTH/2, HEIGHT/2],
	bird : {
		x : WIDTH * 0.1,
		y : HEIGHT * 0.5,
		velocity : -200,
		gravity :  400
	},
	pipe : {
		vRange : [90,200],
		vGap : [80,350],
		hGap : [250,400],
		velocity : -100,
		rightMostX : 0
	}
}

class BaseScene extends Phaser.Scene {

	constructor (sceneName, config){
		super(sceneName);
		this.config = {...defaultConfig, ...config};
	}

	create(){
		this.add.image(0, 0, 'sky').setOrigin(0);
	}

}

export default BaseScene;