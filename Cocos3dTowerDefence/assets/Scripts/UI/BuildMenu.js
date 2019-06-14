import global from "../global";

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() { 
        this._targetBaseNode = undefined;
        this.node.on('close-menu', ()=>{
            this.node.active = false;
        });
        this.node.on('set-tower-base', (baseNode)=>{
            this._targetBaseNode = baseNode;
        });
    },
    onButtonClick(event, customData){
        console.log("close button", customData);
        this.node.active = false;
        global.controller.playerClickBuildTower(customData, this._targetBaseNode);
    },
    start() {

    },

    update(dt) { }
});
