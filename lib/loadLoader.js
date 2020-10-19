var LoaderLoadingError = require("./LoaderLoadingError");

// 根据loader.paht这个绝对路径，取拿 normal pitch raw 并添加给loader对象
module.exports = function loadLoader(loader, callback) {
	try {
		var module = require(loader.path);
	} catch(e) {
		// it is possible for node to choke on a require if the FD descriptor 文件描述符
		// limit has been reached. give it a chance to recover.
		if(e instanceof Error && e.code === "EMFILE") {
			var retry = loadLoader.bind(null, loader, callback);
			if(typeof setImmediate === "function") {
				// node >= 0.9.0
				return setImmediate(retry);
			} else {
				// node < 0.9.0
				return process.nextTick(retry);
			}
		}
		return callback(e);
	}
	debugger;
	// loader 必须是一个函数 or es6 导出的函数
	if(typeof module !== "function" && typeof module !== "object") {
		return callback(new LoaderLoadingError(
			"Module '" + loader.path + "' is not a loader (export function or es6 module)"
		));
	}
	loader.normal = typeof module === "function" ? module : module.default;
	loader.pitch = module.pitch;
	loader.raw = module.raw;
	//  一个loader只有pitch方法也是可以的
	if(typeof loader.normal !== "function" && typeof loader.pitch !== "function") {
		return callback(new LoaderLoadingError(
			"Module '" + loader.path + "' is not a loader (must have normal or pitch function)"
		));
	}
	callback();
};
