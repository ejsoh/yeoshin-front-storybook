"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var __1 = require("..");
var RootStore_1 = require("../../models/RootStore");
var useStore_1 = require("../useStore");
var mobx_react_lite_1 = require("mobx-react-lite");
// test dom render
var TestComponent = mobx_react_lite_1.observer(function () {
    var setPostData = __1.usePostDataApi().setPostData;
    react_1["default"].useEffect(function () {
        // setPostData({
        // 	url: "https://jsonplaceholder.typicode.com/posts",
        // 	body: { title: "foo", body: "bar", userId: "1" },
        // 	mapper: function () {
        // 		return "this is the test";
        // 	},
        // });
    }, []);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement("div", null, " post product hookww"),
        react_1["default"].createElement("div", null, "hellos")));
});
describe("postApiHook이 정확히 작동하는지 검증한다..", function () {
    test("store에 통신 상태가 정확한 값으로 업데이트 되는지 검증한다.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    react_2.render(react_1["default"].createElement(useStore_1.StoreProvider, { value: RootStore_1.rootStore },
                        react_1["default"].createElement(TestComponent, null)));
                    store = RootStore_1.rootStore;
                    return [4 /*yield*/, react_2.waitFor(function () { return expect(store.fetchStore.state).toBe("done"); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    test("store에 통신 성공한 데이터가 정확한 값으로 업데이트 되는지 검증한다.", function () { return __awaiter(void 0, void 0, void 0, function () {
        var store;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    store = RootStore_1.rootStore;
                    return [4 /*yield*/, react_2.waitFor(function () { return expect(store.fetchStore.response.title).toBe("foo"); })];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
