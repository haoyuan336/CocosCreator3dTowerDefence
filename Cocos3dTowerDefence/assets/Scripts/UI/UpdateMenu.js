cc.Class({
    extends: cc.Component,

    properties: {

    },


    onLoad() {
        this.node.on('close-menu', () => {
            this.node.active = false;
        })
    },

    onButtonClick(event, customData) {
        console.log("update menu", customData);
        switch (customData) {
            case 'update':
                break;
            case 'sell':
                break;
            default:
                break;
        }
        this.node.active = false;
    },
    start() {

    },

    // update (dt) {},
});
