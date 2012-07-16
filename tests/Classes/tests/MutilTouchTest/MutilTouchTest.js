/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

var touchColors = [
    cc.YELLOW(),
    cc.BLUE(),
    cc.GREEN(),
    cc.RED(),
    cc.MAGENTA()
];

var TouchPoint = cc.Node.extend({
    _touchPoint:null,
    _tonchColor:null,
    _styleStr:null,

    ctor:function () {
        this._touchPoint = new cc.Point(0, 0);
        this._tonchColor = cc.Color3B(255, 255, 255);
        this._styleStr = "rgba(" + this._tonchColor.r + "," + this._tonchColor.g + "," + this._tonchColor.b + ", 1)";
        //this.setShaderProgram(cc.ShaderCache.sharedShaderCache().programForKey(kCCShader_PositionTextureColor));
    },

    draw:function () {
        var context = cc.renderContext;
        context.save();
        context.fillStyle = this._styleStr;
        context.lineWidth = "10";
        var size = this.getContentSize();
        cc.drawingUtil.drawLine(new cc.Point(0, this._touchPoint.y), new cc.Point(size.width, this._touchPoint.y));
        cc.drawingUtil.drawLine(new cc.Point(this._touchPoint.x, 0), new cc.Point(this._touchPoint.x, size.height));
        cc.drawingUtil.drawPoint(this._touchPoint, 30);
        context.restore();
    },

    setTouchPos:function (pt) {
        this._touchPoint = pt;
    },

    setTouchColor:function (color) {
        this._tonchColor = color;
        this._styleStr = "rgba(" + this._tonchColor.r + "," + this._tonchColor.g + "," + this._tonchColor.b + ", 1)";
    }
});

TouchPoint.touchPointWithParent = function (parent) {
    var ret = new TouchPoint();
    ret.setContentSize(parent.getContentSize());
    ret.setAnchorPoint(new cc.Point(0,0));
    return ret;
};

var MutilTouchTestLayer = cc.Layer.extend({
    init:function () {
        if(this._super()){
            this.setTouchEnabled(true);
            return true;
        }
        return false;
    },

    registerWithTouchDispatcher:function () {
        cc.Director.sharedDirector().getTouchDispatcher().addStandardDelegate(this,0);
    },

    ccTouchesBegan:function (touches, event) {
       if(!touches)
            return;

        for(var i = 0; i< touches.length;i++){
           var touch = touches[i];
            var touchPoint = TouchPoint.touchPointWithParent(this);
            var location = touch.locationInView();

            touchPoint.setTouchPos(location);
            touchPoint.setTouchColor(touchColors[i]);

            this.addChild(touchPoint);
        }
    },

    ccTouchesMoved:function (touches, event) {

    },

    ccTouchesEnded:function (touches, event) {

    },

    ccTouchesCancelled:function (touches, event) {

    }

});

MutilTouchTestLayer.create = function () {
    var ret = new MutilTouchTestLayer();
    if (ret && ret.init()) {
        return ret;
    }
    return null;
};

var MutilTouchTestScene = TestScene.extend({
    runThisTest:function () {

    }
});
