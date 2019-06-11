cc.Class({
    extends: cc.Component,

    properties: {
       
    },

    onLoad() {
        this.node.on("set-path-data", (pathList) => {
            this._pathList = [];
            for (let i = 0; i < pathList.length; i++) {
                this._pathList.push(pathList[i].position);
            }
        });
    },

    start() {
        this.node.y = 20;
        this._pathIndex = 0;

    },

    update (dt) {
        
    }
});
