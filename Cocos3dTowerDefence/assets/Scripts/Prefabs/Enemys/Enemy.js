cc.Class({
    extends: cc.Component,

    properties: {

    },

    onLoad() {
        this._index = 0;
        this.node.on("set-path-data", (pathList) => {
            this._pathList = [];
            for (let i = 0; i < pathList.length; i++) {
                this._pathList.push(cc.v2(pathList[i].x, pathList[i].z));
            }
            let pos = this._pathList[0];
            this.node.x = pos.x;
            this.node.z = pos.y;
            this._pathIndex = 0;
        });
        this.node.on(cc.Node.EventType.TOUCH_START, ()=>{
            console.log("touch start");
        });
        this.node.on("set-index", (index)=>{
            this._index = index;
        });
    },

    start() {
        this.node.y = 20;
        this._pathIndex = 0;

    },
    getIndex(){
        return this._index;
    },
    update(dt) {
        if (this._pathIndex < this._pathList.length) {
            let currentPos = this._pathList[this._pathIndex];
            let direction = currentPos.sub(cc.v2(this.node.x, this.node.z));
            let dis = direction.mag();
            if (dis > 10) {
                this.node.x += direction.normalize().x * dt * 100;
                this.node.z += direction.normalize().y * dt * 100;
            }else{
                this._pathIndex ++;
            }
            if (this._pathIndex === this._pathList.length){
                this._pathList = undefined;
                this.node.emit("life-end", this._index);
                this.node.emit('receive-to-pool');
            }
        }
    }
});
