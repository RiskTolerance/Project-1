window.onload = function(){
    var config = {
        type: Phaser.AUTO,
        width: 720,
        height: 480,
        parent: 'phaser-game',
        scene: [SceneMain]
    };
    game = new Phaser.Game(config);
}
var game = new Phaser.Game(config);