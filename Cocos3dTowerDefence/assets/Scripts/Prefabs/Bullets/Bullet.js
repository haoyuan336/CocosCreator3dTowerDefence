
cc.Class({
    extends: cc.Component,

    properties: {
        isRotation: {
            default: true
        }
    },
    onLoad() {

        this.node.on("set-tower", (node) => {
            let tower = node.getComponent('Tower');
            this._objPool = tower.getBulletPool();
            //获取到当前的子弹的移动方向以及旋转方向
            this._direction = tower.getDirector();
            this.node.setRotation(tower.getCurrentQuat());
        });
    },

    start() {

    },

    update(dt) {
        if (this._direction) {
            this.node.x -= this._direction.x * dt * 400;
            this.node.z -= this._direction.y * dt * 400;

            if (Math.abs(this.node.y) > 1000 || Math.abs(this.node.x) > 1000) {
                this._objPool.put(this.node);
                console.log('回收子弹');
            }
        }

    },
    setObjPool(pool) {
        this._objPool = pool;
    }
});
