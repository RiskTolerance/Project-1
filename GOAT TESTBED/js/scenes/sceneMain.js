let map;
let bg;
let structures;
let terrain;
let player;
let player2;
let structuresLayer;
let terrainLayer;
let lastDirectionCult = 1;
let lastDirectionGoat = 0;
let spacebar;
let Cee;
let Emm;
let leader = '';

//control variables
let keyboard;

class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    preload() {
        //load images or sounds
        this.load.image('background','/images/Backgrounds/cavebg.png');
        this.load.tilemapTiledJSON('map','/images/Environment/Tilesets/reset/mapv2.json');
        this.load.image('structuresPNG', '/images/Environment/Tilesets/reset/Structures.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('terrainPNG', '/images/Environment/Tilesets/reset/Terrain.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('cultistRun', '/images/Characters/cultist/cultist run_animation 12frames 40px.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('cultistIdle', '/images/Characters/cultist/rogue like idle_animation 6frames 40px.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('goatRun', '/images/Characters/goat/goat walk 6frames 40px.png', {frameWidth: 40, frameHeight: 40});
        this.load.spritesheet('goatIdle', '/images/Characters/goat/goat idle 4frames 40px.png', {frameWidth: 40, frameHeight: 40});
    }
    
    create() {
        //define objects
        console.log('Ready!');
        //console.log(this.cache.tilemap.get('map').data);
        this.map = this.make.tilemap({key:'map'});
    
        structures = this.map.addTilesetImage('TiledStructuresTileset','structuresPNG');
        terrain = this.map.addTilesetImage('TiledTerrainTileset','terrainPNG');
        
        //add the bg
        bg = this.add.image(this.map.widthInPixels/2, this.map.heightInPixels/4, 'background');

        //add the Tiled layers
        structuresLayer = this.map.createDynamicLayer('TiledStructuresLayer', structures, 0, 0);
        terrainLayer = this.map.createDynamicLayer('TiledTerrainLayer', terrain, 0, 0);
        
        //set the world bounds to the edge of the Tiled map
        this.physics.world.bounds.width = terrainLayer.width;
        this.physics.world.bounds.height = structuresLayer.height;

        //add the player
        player = this.physics.add.sprite(this.map.widthInPixels/1.5, this.map.heightInPixels - 150, 'cultistIdle');
        player.setCollideWorldBounds(true); 
        //add second player
        player2 = this.physics.add.sprite(this.map.widthInPixels/3, this.map.heightInPixels - 150, 'goatRun');
        player2.setCollideWorldBounds(true); 
        //make the player collide with the foreground layer
        terrainLayer.setCollisionByExclusion([-1]); //sets the entire terrainLayer as a collider?
        structuresLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(terrainLayer, player); //makes the player collide with the terrain layer
        this.physics.add.collider(structuresLayer, player);
        this.physics.add.collider(terrainLayer, player2); //makes the player collide with the terrain layer
        this.physics.add.collider(structuresLayer, player2);
        this.physics.add.collider(player, player2);

        //keyboard = this.input.keyboard.createCursorKeys();
        keyboard = this.input.keyboard.addKeys('RIGHT,LEFT,DOWN,UP,A,W,S,D');
        Cee = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        Emm = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

            this.anims.create({
                key: 'leftRun',
                frames: this.anims.generateFrameNumbers('cultistRun', { start: 0, end: 5}),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'rightRun',
                frames: this.anims.generateFrameNumbers('cultistRun', { start: 6, end: 11}),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'leftIdle',
                frames: this.anims.generateFrameNumbers('cultistIdle', { start: 0, end: 2}),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'rightIdle',
                frames: this.anims.generateFrameNumbers('cultistIdle', { start: 3, end: 5}),
                frameRate: 5,
                repeat: -1
            });

            //goat

            this.anims.create({
                key: 'goatLeftRun',
                frames: this.anims.generateFrameNumbers('goatRun', { start: 0, end: 2}),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'goatRightRun',
                frames: this.anims.generateFrameNumbers('goatRun', { start: 3, end: 5}),
                frameRate: 20,
                repeat: -1
            });

            this.anims.create({
                key: 'goatLeftIdle',
                frames: this.anims.generateFrameNumbers('goatIdle', { start: 0, end: 1}),
                frameRate: 3,
                repeat: -1
            });

            this.anims.create({
                key: 'goatRightIdle',
                frames: this.anims.generateFrameNumbers('goatIdle', { start: 2, end: 4}),
                frameRate: 3,
                repeat: -1
            });

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(player);
        // make the camera follow the player
        //this.cameras.main.startFollow(player);
        console.log('Done!');
    }
    update() {
        //game loop

        bg.y = this.cameras.main.scrollY + 300;
        //bg.setScrollFactor(0) // this might work better?
        
        if(player2.body.position.y > player.body.position.y) {
            this.cameras.main.stopFollow();
            this.cameras.main.startFollow(player);
            console.log('player 1 is winning!')
        } else {
            this.cameras.main.stopFollow();
            this.cameras.main.startFollow(player2);
            console.log('player 2 is winning!')
        }

        if (keyboard.LEFT.isDown)
        {
            lastDirectionCult = 0;
            player.body.setVelocityX(-300);
            player.anims.play('leftRun', true); // run left
        }
        else if (keyboard.RIGHT.isDown)
        {
            lastDirectionCult = 1;
            player.body.setVelocityX(300);
            player.anims.play('rightRun', true); //run right
        } else if (lastDirectionCult === 1)
        {
            player.body.setVelocityX(0);
            player.anims.play('rightIdle', true); //idle animation
        } else 
        {
            player.body.setVelocityX(0);
            player.anims.play('leftIdle', true); //idle animatinon
        }
        // jump 
        if (keyboard.UP.isDown && player.body.onFloor())
        {
            console.log(player.body.position.x); 
            player.body.setVelocityY(-400);
        }

        //goat controls

        if (keyboard.A.isDown)
        {
            lastDirectionGoat = 0;
            player2.body.setVelocityX(-300);
            player2.anims.play('goatLeftRun', true); // run left
        }
        else if (keyboard.D.isDown)
        {
            lastDirectionGoat = 1;
            player2.body.setVelocityX(300);
            player2.anims.play('goatRightRun', true); //run right
        } else if (lastDirectionGoat === 1)
        {
            player2.body.setVelocityX(0);
            player2.anims.play('goatRightIdle', true); //idle animation
        } else 
        {
            player2.body.setVelocityX(0);
            player2.anims.play('goatLeftIdle', true); //idle animatinon
        }
        // jump 
        if (keyboard.W.isDown && player2.body.onFloor())
        {
            console.log(player2.body.position.x); 
            player2.body.setVelocityY(-400);
        }
        // dash! Uhhh... Blink?
        
        if (keyboard.UP.isDown && Phaser.Input.Keyboard.JustDown(Cee))
        {
            //somehow check for collision?

            //blink
            player.setPosition((player.body.position.x + 20), (player.body.position.y - 100));
        }
        
        // if (Phaser.Input.Keyboard.JustDown(Cee))
        // {
        //     //window.p = player;
        //     //player.body.VelocityX()
        //     let vy = player.body.velocity.y;
        //     let vx = player.body.velocity.x;
        //     let velocity = player.body.velocity;
        //     player.body.setVelocityX(velocity.x * 3);
        //     player.body.setVelocityY(velocity.y * 3);
        //     setTimeout(() => {
        //         player.body.setVelocityX(vx);
        //         player.body.setVelocityY(vy);
        //     }, 200);
        // }
    }
}