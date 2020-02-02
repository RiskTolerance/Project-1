window.onload = function(){
    let config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
            }
        },
        parent: 'phaser-game',
        scene: [SceneMain]
    };

    game = new Phaser.Game(config);
}
var game = new Phaser.Game(config);