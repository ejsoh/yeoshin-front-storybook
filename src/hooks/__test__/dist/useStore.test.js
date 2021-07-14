"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@testing-library/react");
var __1 = require("..");
var RootStore_1 = require("../../models/RootStore");
var useStore_1 = require("../useStore");
var mobx_react_lite_1 = require("mobx-react-lite");
var mapState = function (_a) {
    var fetchStore = _a.fetchStore;
    return ({
        fetchStore: fetchStore
    });
};
var TestComponent = mobx_react_lite_1.observer(function () {
    var fetchStore = __1.useInjection(mapState).fetchStore;
    return react_1["default"].createElement("div", null, fetchStore.state);
});
describe("useInjection을 통해 제대로 된 값이 전달되는지 검증한다.", function () {
    test("provider값을 검증한다.", function () {
        var teest = react_2.render(react_1["default"].createElement(useStore_1.StoreProvider, { value: RootStore_1.rootStore },
            react_1["default"].createElement(TestComponent, null)));
        teest.getByText("pending");
    });
});
