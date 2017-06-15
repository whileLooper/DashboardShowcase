webpackJsonpac__name_([15],{

/***/ 473:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(44);
var core_1 = __webpack_require__(10);
var router_1 = __webpack_require__(56);
var index_ts_1 = __webpack_require__(719);
exports.routes = [
    { path: '', component: index_ts_1.MockupComponent, pathMatch: 'full' }
];
var MockupModule = (function () {
    function MockupModule() {
    }
    return MockupModule;
}());
MockupModule.routes = exports.routes;
MockupModule = __decorate([
    core_1.NgModule({
        declarations: [
            // Components / Directives/ Pipes
            index_ts_1.MockupComponent
        ],
        imports: [
            common_1.CommonModule,
            router_1.RouterModule.forChild(exports.routes)
        ]
    })
], MockupModule);
exports.MockupModule = MockupModule;


/***/ },

/***/ 719:
/***/ function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__(720));
__export(__webpack_require__(473));


/***/ },

/***/ 720:
/***/ function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var MockupComponent = (function () {
    function MockupComponent() {
    }
    return MockupComponent;
}());
MockupComponent = __decorate([
    core_1.Component({
        selector: 'mockup-cmp',
        template: __webpack_require__(847)
    })
], MockupComponent);
exports.MockupComponent = MockupComponent;


/***/ },

/***/ 847:
/***/ function(module, exports) {

module.exports = "<h1>测试版本<small>(正在开发中...)</small></h1>"

/***/ }

});
//# sourceMappingURL=15.map