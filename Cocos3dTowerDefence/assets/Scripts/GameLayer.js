cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        roadPath:cc.Node
    },

    onLoad () {
    },

    start () {
        this._addEnemyTime = 0;
    },

    update (dt) {
        if (this._addEnemyTime > 0.2){
            this._addEnemyTime = 0;
            this.addOneEnemy();
        }else{
            this._addEnemyTime += dt;
        }
    },
    addOneEnemy(){
        let node = cc.instantiate(this.enemyPrefab);
        node.parent = this.node;
        node.emit('set-path-data', this.roadPath.children);

    }
});
