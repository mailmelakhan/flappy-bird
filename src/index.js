import Phaser from 'Phaser';
import PlayScene from './scenes/PlayScene';
import MenuScene from './scenes/MenuScene';
import PreloadScene from './scenes/PreloadScene';
import ScoreScene from './scenes/ScoreScene';
import PauseScene from './scenes/PauseScene';


const WIDTH = 400;
const HEIGHT = 600;

const sceneList = [PreloadScene, MenuScene, ScoreScene, PlayScene, PauseScene];
const sceneListInstances = sceneList.map(Scene => new Scene());

const config = {
  width: WIDTH,
  height: HEIGHT,
  type: Phaser.AUTO,
  pixelArt: true,
  physics: {
    default:'arcade',
    arcade: {
      //debug:true
    }
  },
  scene:sceneListInstances
};

new Phaser.Game(config)


