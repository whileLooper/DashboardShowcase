webpackJsonpac__name_([1],{

/***/ 1115:
/***/ (function(module, exports) {

module.exports = "/***********************************/\n/**             LOGIN             **/\n/***********************************/\n.login-page {\n  background-color: #ddd; }\n\n.login-page .page-footer {\n  margin-bottom: 25px;\n  font-size: 13px;\n  color: #636c72;\n  text-align: center; }\n  @media (min-height: 600px) {\n    .login-page .page-footer {\n      position: fixed;\n      bottom: 0;\n      left: 0;\n      right: 0; } }\n\n.widget-login-container {\n  padding-top: 10%; }\n\n.widget-login-logo {\n  margin-top: 15px;\n  margin-bottom: 15px;\n  text-align: center;\n  font-weight: normal; }\n  .widget-login-logo .fa-circle {\n    font-size: 13px;\n    margin: 0 20px; }\n\n.widget-login {\n  padding: 30px; }\n  .widget-login > header h1, .widget-login > header h2, .widget-login > header h3, .widget-login > header h4, .widget-login > header h5, .widget-login > header h6 {\n    font-weight: normal;\n    text-align: center; }\n\n.widget-login-info {\n  font-size: 13px;\n  color: #888;\n  margin-top: 1px;\n  margin-bottom: 0;\n  text-align: center; }\n  .widget-login-info.abc-checkbox {\n    margin-left: -25px; }\n\n.login-form .form-control {\n  font-size: 13px;\n  border: none;\n  background-color: #eceeef; }\n  .login-form .form-control:focus {\n    background-color: #ddd; }\n"

/***/ }),

/***/ 1145:
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <main id=\"content\" class=\"widget-login-container\" role=\"main\">\r\n    <div class=\"row\">\r\n      <div class=\"col-xl-4 col-md-6 col-10 offset-xl-4 offset-md-3 offset-1\">\r\n        <h5 class=\"widget-login-logo animated fadeInUp\">\r\n          <i class=\"fa fa-circle text-gray\"></i>\r\n          sing\r\n          <i class=\"fa fa-circle text-warning\"></i>\r\n        </h5>\r\n        <section class=\"widget widget-login animated fadeInUp\">\r\n          <header>\r\n            <h3>Login to your Sing App</h3>\r\n          </header>\r\n          <div class=\"widget-body\">\r\n            <p class=\"widget-login-info\">\r\n              Use Facebook, Twitter or your email to sign in.\r\n            </p>\r\n            <p class=\"widget-login-info\">\r\n              Don't have an account? Sign up now!\r\n            </p>\r\n            <form class=\"login-form mt-lg\">\r\n              <div class=\"form-group\">\r\n                <input type=\"text\" class=\"form-control\" id=\"exampleInputEmail1\" placeholder=\"Username\">\r\n              </div>\r\n              <div class=\"form-group\">\r\n                <input class=\"form-control\" id=\"pswd\" type=\"text\" placeholder=\"Password\">\r\n              </div>\r\n              <div class=\"clearfix\">\r\n                <div class=\"btn-toolbar float-right m-t-1\">\r\n                  <button type=\"button\" class=\"btn btn-secondary btn-sm\">Create an Account</button>\r\n                  <a class=\"btn btn-inverse btn-sm\" [routerLink]=\"['/app', 'dashboard'] \">Login</a>\r\n                </div>\r\n              </div>\r\n              <div class=\"row m-t-1\">\r\n                <div class=\"col-md-6 push-md-6\">\r\n                  <div class=\"clearfix\">\r\n                    <div class=\"abc-checkbox widget-login-info float-right\">\r\n                      <input type=\"checkbox\" id=\"checkbox1\" value=\"1\">\r\n                      <label for=\"checkbox1\">Keep me signed in </label>\r\n                    </div>\r\n                  </div>\r\n                </div>\r\n\r\n                <div class=\"col-md-6 pull-md-6\">\r\n                  <a class=\"mr-n-lg\" href=\"#\">Trouble with account?</a>\r\n                </div>\r\n              </div>\r\n            </form>\r\n          </div>\r\n        </section>\r\n      </div>\r\n    </div>\r\n  </main>\r\n  <footer class=\"page-footer\">\r\n    2017 &copy; Sing. Admin Dashboard Template.\r\n  </footer>\r\n</div>\r\n"

/***/ }),

/***/ 370:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var common_1 = __webpack_require__(44);
var forms_1 = __webpack_require__(71);
var core_1 = __webpack_require__(10);
var router_1 = __webpack_require__(57);
var login_component_1 = __webpack_require__(972);
exports.routes = [
    { path: '', component: login_component_1.Login, pathMatch: 'full' }
];
var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule.routes = exports.routes;
LoginModule = __decorate([
    core_1.NgModule({
        declarations: [
            login_component_1.Login
        ],
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule,
            router_1.RouterModule.forChild(exports.routes),
        ]
    })
], LoginModule);
exports.LoginModule = LoginModule;


/***/ }),

/***/ 972:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(10);
var Login = (function () {
    function Login() {
    }
    return Login;
}());
Login = __decorate([
    core_1.Component({
        selector: 'login',
        styles: [__webpack_require__(1115)],
        template: __webpack_require__(1145),
        encapsulation: core_1.ViewEncapsulation.None,
        host: {
            class: 'login-page app'
        }
    }),
    __metadata("design:paramtypes", [])
], Login);
exports.Login = Login;


/***/ })

});
//# sourceMappingURL=1.map