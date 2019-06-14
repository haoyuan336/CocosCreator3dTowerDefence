cc.Class({
    extends: cc.Component,

    properties: {
       
    },


    onLoad () {
        let node = this.node.getChildByName('bg');
        if (node){
            node.on(cc.Node.EventType.TOUCH_START, ()=>{
                console.log("touch start");
                this.node.emit('close-menu');
            })
        }
    },

    start () {

    },

    update (dt) {

    }
});
