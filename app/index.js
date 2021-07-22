(function (win) {
    Function.applyXX = function applyXX(thisArg) {
    };

    Function.prototype.applyX = function applyX(thisArg) {

    }

    let func = new Function();

    function say() {

    }
    let p = say.__proto__;
    debugger;
    var funcProto = Function.prototype;
    var objProto = Object.prototype;

    let a = {
        x: 1,
        y: 2,
        z: 3
    };
    let b = a;
    b.x = 33;

})(window);