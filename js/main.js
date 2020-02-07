let game;
window.onload = function(){
    let config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 600 },
                debug: false
            }
        },
        parent: 'phaser-game',
        scene: [ SceneMain ]
        };
        game = new Phaser.Game(config);
};