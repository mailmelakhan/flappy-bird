import Phaser from 'Phaser';
import BaseScene from './BaseScene';

class MenuScene extends BaseScene{
	constructor(config){
		super('MenuScene', config);
		this.menu = [{
				scene:'PlayScene',
				text: 'Play',
				obj: null
			},
			{
				scene:'ScoreScene',
				text: 'Score',
				obj: null
			},
			{
				scene:null,
				text: 'Exit',
				obj: null
			}];
	}

	create(){
		super.create();
		let offSet = 32;
		let xPos = this.config.width/2;
		let yPos = this.config.height/2 - offSet;
		let that = this;

		this.menu.forEach((menuItem) => {
			menuItem.obj = this.add.text(xPos, yPos, menuItem.text, {color:'#fff'}).setFontSize(32).setOrigin(0.5,0.5).setInteractive();

			yPos = yPos + offSet
		});

		this.menu.forEach((menuItem) => {
			menuItem.obj.on('pointerover', function(){
				menuItem.obj.setStyle({fill:'#ff0'});
			});
		})

		this.menu.forEach((menuItem) => {
			menuItem.obj.on('pointerout', function(){
				menuItem.obj.setStyle({fill:'#fff'});
			});
		})

		this.menu.forEach((menuItem) => {
			menuItem.obj.on('pointerup', function(){
				menuItem.scene && that.scene.start(menuItem.scene);

				if(menuItem.text === 'Exit'){
					that.game.destroy(true);
				}
			});
		})
		//this.scene.start('PlayScene');
	}
}

export default MenuScene;