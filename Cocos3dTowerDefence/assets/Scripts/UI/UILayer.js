import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        touchLayer: cc.Node,
        buildMenu: cc.Node,
        updateMenu: cc.Node
    },
    onLoad() {
        this.buildMenu.active = false;
        this.updateMenu.active = false;
        this.touchLayer.on(cc.Node.EventType.TOUCH_START, (event) => {
            let touchPos = event.touch.getLocation();
            console.log("touch pos", touchPos);
            global.controller.playerTouchScreen(touchPos)
                .then((data) => {
                    let type = data.type;
                    let node = data.node;
                    console.log("show menu", node);
                    if (type === 'TowerBase') {
                        this.buildMenu.active = true;
                        this.buildMenu.emit('set-tower-base',node);
                        this.updateMenu.active = false;
                    } else if (type === 'Tower') {
                        this.buildMenu.active = false;
                        this.updateMenu.active = true;
                    }
                });
        });
        this.node.on("show-build-menu", (value) => {
            this.buildMenu.active = value;
        });

    },

    start() {

    },
    update(dt) { }
});
