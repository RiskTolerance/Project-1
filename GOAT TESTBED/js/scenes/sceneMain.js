let map;
let tileSetA;
let tileSetB;
let layerA
let layerB;

class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        //load images or sounds
        //this.load.tilemapTiledJSON('map','/images/Environment/Maps/TestMap1_Background.csv');
        this.load.image('background','/images/Backgrounds/cavebg.png');
        this.load.tilemapTiledJSON('map','/images/Environment/Maps/TestMap1.json');
        this.load.image('tilesA', '/images/Environment/pixelplatformer/main_lev_buildB32x32.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('tilesB', '/images/Environment/pixelplatformer/main_lev_buildB32x32.png', {frameWidth: 32, frameHeight: 32});
    }
    create() {
        //define objects
        console.log('Ready!');
        //console.log(this.cache.tilemap.get('map').data);
        this.map = this.make.tilemap({key:'map'});
        
        this.tileSetA = this.map.addTilesetImage('PixelPlatformerA32x32', 'tilesA');
        
        this.tileSetB = this.map.addTilesetImage('PixelPlatformerB32x32', 'tilesB');
        
        //this.add.image(this.map.widthInPixels/2, this.map.widthInPixels/4, 'background');

        this.map.createDynamicLayer('Background', tileSetA, 0, 0);
        this.map.createDynamicLayer('Foreground', tileSetB, 0, 0);

        console.log('Done!');
        //layer1.setCollisionByExclusion([-1]);
        //this.layer2.setCollisionByExclusion([-1]);
        //this.physics.world.bounds.width = groundLayer.width;
        //this.physics.world.bounds.height = groundLayer.height;

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        
        // make the camera follow the player
        //this.cameras.main.startFollow(player);

        // set background color, so the sky is not black    
        //this.cameras.main.setBackgroundColor('#ccccff');
    }
    update() {
        //game loop
    }
}