cc.Class({
    extends: cc.Component,

    properties: {
        rotationToNode: cc.Node,
        rotateByNode: cc.Node
    },

    onToClick: function () {
        var rotationTo = cc.rotateTo(1, 90);
        this.angleToNode.runAction(rotationTo);
    },

    onReverseToClick: function () {
        var rotationTo = cc.rotateTo(1, 180);
        this.angleToNode.runAction(rotationTo);
    },

    onToRecoverClick: function () {
        this.angleToNode.angle = 0;
    },

    onByClick: function () {
        var rotateBy = cc.rotateBy(1, 90);
        this.rotateByNode.runAction(rotateBy);
    },

    onReverseByClick: function () {
        var rotateBy = cc.rotateBy(1, 180);
        this.rotateByNode.runAction(rotateBy);
    },

    onByRecoverClick: function () {
        this.rotateByNode.angle = 0;
    }

});
