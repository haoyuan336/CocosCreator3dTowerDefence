import global from "../../global";

cc.Class({
    extends: cc.Component,
    properties: {
        bulletStartPos: cc.Node,
        bulletPrefab: cc.Prefab,
        attackRange: [cc.Float],
        attackDamage: [cc.Float],
        attackDuraction: [cc.Float]
    },
    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this._currentLevel = 0;
        this._enemyList = undefined;
        this._targetEnemy = undefined;
        this._attackRange = 0;
        this._attackDamage = 0;
        this._attackDuraction = 0;
        this.node.on("set-enemy-list", (enemyList) => {
            this._enemyList = enemyList;
        });
        this.reSetTowerData();
        this._bulletPool = new cc.NodePool();
        for (let i = 0; i < 10; i++) {
            let node = cc.instantiate(this.bulletPrefab);
            this._bulletPool.put(node);
        }
    },
    updateLevel() {
        if (this._currentLevel < 4) {
            this._currentLevel++;
            this.reSetTowerData();
            return true;
        } else {
            return false;
        }

    },
    reSetTowerData() {
        this._attackRange = this.attackRange[this._currentLevel];
        this._attackDamage = this.attackDamage[this._currentLevel];
        this._attackDuraction = this.attackDuraction[this._currentLevel];
        this._shootTime = this._attackDuraction;
    },
    start() {

    },

    update(dt) {
        if (this._targetEnemy === undefined) {
            if (this._enemyList !== undefined) {
                for (let i = 0; i < this._enemyList.length; i++) {
                    let enemy = this._enemyList[i];
                    let dis = cc.v2(enemy.x, enemy.z).sub(cc.v2(this.node.x, this.node.z)).mag();
                    if (dis < this._attackRange) {
                        console.log("找到了可以攻击的敌人");
                        this._targetEnemy = enemy;
                    }
                }
            }
        }
        if (this._targetEnemy) {
            //获取tower 的坐标与目标左边的 2d平面内的 单位向量
            let direction = cc.v2(this.node.x, this.node.y).sub(cc.v2(this._targetEnemy.x, this._targetEnemy.z)).normalize();
            this._direction = direction;
            //获取向量与物体起始向量的 夹角
            let angle = direction.signAngle(cc.v2(-1, 0));
            let quat = new cc.Quat();
            //改变四元数的数值，通过旋转的角度
            quat.fromEuler(new cc.Vec3(0, angle * 180 / Math.PI, 0));
            //将调整后的 四元数付给tower，从而旋转成功
            this.node.setRotation(quat);
            if (this._shootTime >= this._attackDuraction) {
                this._shootTime = 0;
                this.shootOneBullet(direction);
            } else {
                this._shootTime += dt;
            }
        }
    },
    shootOneBullet() {
        //发射一枚子弹
        let node = undefined;
        if (this._bulletPool.size() > 0) {
            node = this._bulletPool.get();
        } else {
            node = cc.instantiate(node);
        }
        let bullet = node.getComponent('Bullet')
        if (bullet){
            bullet.setObjPool(this._bulletPool);
        }
        global.controller.shootOneBullet(this.node, node);
    },
    getBulletStartPos() {
        let dis = cc.v2(this.bulletStartPos.x, this.bulletStartPos.z).mag();
        // let director = cc.v2(this.node.x, this.node.z).sub(cc.v2(this._targetEnemy.x, this._targetEnemy.z)).normalize();
        let direction = this._direction;
        let pos = direction.mul(-dis);
        return this.node.position.add(new cc.Vec3(pos.x, this.bulletStartPos.y + this.node.y, pos.y));

    }
});
