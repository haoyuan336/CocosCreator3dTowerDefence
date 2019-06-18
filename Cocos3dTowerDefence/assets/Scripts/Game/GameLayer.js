import global from "./global";

cc.Class({
    extends: cc.Component,

    properties: {
        enemyPrefab: cc.Prefab,
        roadPath: cc.Node,
        baseLayer: cc.Node,
        touchLayer: cc.Node,
        towerPrefabList: [cc.Prefab]
    },

    onLoad() {
        this._enemyList = [];
        this._enemyIndex = 0;
        global.controller.setGameLayer(this.node);
        this._enemyObjPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
            let node = cc.instantiate(this.enemyPrefab);
            this._enemyObjPool.put(node);
        }
        // let ray = cc.Camera.main.getRay(pos);
        // return cc.geomUtils.intersect.raycast(this.node, ray);
        this.node.on('player-shoot-ray', this.playerShootRay.bind(this));
        this.node.on("build-tower", this.buildTower.bind(this));
        this.node.on("shoot-one-bullet", this.shootOneBullet.bind(this));
    },
    playerShootRay(ray, cb) {
        //玩家发射了一条射线
        let result = cc.geomUtils.intersect.raycast(this.baseLayer, ray);
        console.log("result.length", result.length);
        if (result.length !== 0) {
            let child = result[0];
            console.log("child", child);
            if (child.node.getComponent('TowerBase')) {
                let tower = child.node.getComponent("TowerBase").getTower();
                if (tower === undefined) {
                    if (cb) {
                        console.log('child node', child.node);
                        cb('TowerBase', child.node);
                    }
                } else {
                    if (cb) {
                        cb('Tower', tower);

                    }
                }
            }
        }
    },
    shootOneBullet(tower, bulletPrefab) {
        let bullet = cc.instantiate(bulletPrefab);
        bullet.parent = this.node;
        let startPos = tower.getComponent('Tower').getBulletStartPos();
        console.log('start pos', startPos);
        bullet.position = startPos;
    },
    buildTower(data, baseNode) {
        let index = Number(data[data.length - 1]);
        console.log("index", index, baseNode);
        let node = cc.instantiate(this.towerPrefabList[index - 1]);
        node.parent = this.node;
        node.x = baseNode.x;
        node.z = baseNode.z;
        //将当前的敌人的列表 发给 tower 
        node.emit("set-enemy-list", this._enemyList);
    },
    start() {
        this._addEnemyTime = 0;
    },

    update(dt) {
        if (this._addEnemyTime > 2) {
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
        this._enemyIndex++;
        node.emit("set-obj-pool", this._enemyObjPool);
        node.emit('set-path-data', this.roadPath.children);
        node.emit('set-index', this._enemyIndex);

        node.on('left-end', (enemyIndex) => {
            for (let i = 0; i < this._enemyList.length; i++) {
                let enemy = this._enemyList[i];
                if (enemy.getComponent('Enemy') && enemy.getComponent("Enemy").getIndex() === enemyIndex) {
                    console.log("将敌人从列表里面移除", this._enemyIndex);
                    this._enemyList.splice(i, 1);
                }
            }
        });

        this._enemyList.push(node);
    }
});
