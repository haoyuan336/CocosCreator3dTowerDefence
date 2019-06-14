cc.Class({
    extends: cc.Component,

    properties: {

    },
    onLoad() {
        this._currentTowerNode = undefined;
    },

    start() {

    },

    update(dt) { 

    },
    getTower(){
        return this._currentTowerNode;
    }
});
