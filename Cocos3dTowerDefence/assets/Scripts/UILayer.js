import global from './global'
cc.Class({
    extends: cc.Component,

    properties: {
        touchLayer: cc.Node
    },
    onLoad() { 
        this.touchLayer.on(cc.Node.EventType.TOUCH_START, (event)=>{
            let touchPos = event.touch.getLocation();
            console.log("touch pos", touchPos);
            global.controller.playerTouchScreen(touchPos);
        });
    },

    start() {

    },
    update(dt) { }
});
