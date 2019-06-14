class Controller {
    constructor() {
        this._gameLayer = undefined;
    }
    setGameLayer(node) {
        this._gameLayer = node;
    }
    playerTouchScreen(pos) {
        console.log("玩家点击了屏幕", pos);
        //获取一条射线
        return new Promise((resole, reject) => {
            let ray = cc.Camera.main.getRay(pos);
            this._gameLayer.emit('player-shoot-ray', ray, (type, node) => {
                console.log("player touch screen", type, node);
                if (resole) {
                    resole({ type: type, node: node });
                }
            });
        });
    }
    playerClickBuildTower(customData, baseNode) {
        this._gameLayer.emit('build-tower', customData, baseNode);
    }
}
export default Controller;