cc.Class({
    extends: cc.Component,

    properties: {
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
            
        }
    }
});
