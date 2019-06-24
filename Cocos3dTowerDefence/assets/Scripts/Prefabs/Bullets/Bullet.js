
cc.Class({
    extends: cc.Component,

    properties: {
        isRotation: {
            type: cc.Boolean,
            default: true
        }
    },
    onLoad() { },

    start() {

    },

    update(dt) { 

    },
    setObjPool(pool){
        this._objPool = pool;
    }
});
