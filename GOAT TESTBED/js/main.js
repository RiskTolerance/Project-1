let game;
window.onload = function(){
    let config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 720,
        parent: 'phaser-game',
        scene: [ SceneMain ]
        };
        game = new Phaser.Game(config);
}