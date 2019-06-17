cc.Class({
    extends: cc.Component,

    properties: {
        
    },


    onLoad () {
        this.node.on('set-obj-pool', (objPool)=>{
            this._objPool = objPool;
        });
        this.node.on("receive-to-pool", ()=>{
            this.node.removeFromParent();
            this.node.active = false;
            this._objPool.put(this.node);
        });
    },

    start () {

    },

    // update (dt) {},
});
