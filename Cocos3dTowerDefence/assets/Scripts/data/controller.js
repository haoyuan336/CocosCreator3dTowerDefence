class Controller{
    constructor(){
        this._gameLayer = undefined;
    }
    setGameLayer(node){
        this._gameLayer = node;
    }
    playerTouchScreen(pos){
        console.log("玩家点击了屏幕", pos);
        //获取一条射线
        let ray = cc.Camera.main.getRay(pos);
        this._gameLayer.emit('player-shoot-ray', ray);
        
    }
}
export default Controller;