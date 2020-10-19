module.exports = function (input) {
    console.log(input);
}
module.exports.pitch = function () {
    // 在此也能拿到 未构建玩的 this 对象，
    // 整个runLoader 过程只有一个this 指向 loaderContext
    console.log('loader-pitch');
}
