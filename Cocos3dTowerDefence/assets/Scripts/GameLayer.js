import global from "./global";

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        roadPath: cc.Node,
        baseLayer: cc.Node,
        touchLayer: cc.Node
    },

    onLoad() {
        global.controller.setGameLayer(this.node);
        this._enemyObjPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
            let node = cc.instantiate(this.enemyPrefab);
            this._enemyObjPool.put(node);
        }
        // let ray = cc.Camera.main.getRay(pos);
        // return cc.geomUtils.intersect.raycast(this.node, ray);
        this.node.on('player-shoot-ray', this.playerShootRay.bind(this));
    },
    playerShootRay(ray){
        //玩家发射了一条射线
        let result = cc.geomUtils.intersect.raycast(this.baseLayer, ray);
        // console.log("result.length", result.length);
        
    },

    start() {
        this._addEnemyTime = 0;
    },

    update(dt) {
        if (this._addEnemyTime > 0.2) {
            this._addEnemyTime = 0;
            this.addOneEnemy();
        } else {
            this._addEnemyTime += dt;
        }


    },
    addOneEnemy() {
        let node = undefined;
        if (this._enemyObjPool.size() > 0) {
            node = this._enemyObjPool.get();
        } else {
            node = cc.instantiate(this.enemyPrefab);
        }
        node.parent = this.node;
        node.active = true;
        node.emit("set-obj-pool", this._enemyObjPool);
        node.emit('set-path-data', this.roadPath.children);

    }
});
