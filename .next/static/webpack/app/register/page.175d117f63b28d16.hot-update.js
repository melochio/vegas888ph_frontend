"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/register/page",{

/***/ "(app-client)/./src/api/bettor/auth.tsx":
/*!*********************************!*\
  !*** ./src/api/bettor/auth.tsx ***!
  \*********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   register: function() { return /* binding */ register; }\n/* harmony export */ });\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! axios */ \"(app-client)/./node_modules/axios/lib/axios.js\");\n/* harmony import */ var _config_headers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config/headers */ \"(app-client)/./src/api/config/headers.tsx\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sweetalert2 */ \"(app-client)/./node_modules/sweetalert2/dist/sweetalert2.all.js\");\n/* harmony import */ var sweetalert2__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sweetalert2__WEBPACK_IMPORTED_MODULE_1__);\n/* provided dependency */ var process = __webpack_require__(/*! process */ \"(app-client)/./node_modules/next/dist/build/polyfills/process.js\");\n\n\n\nconst register = (formData)=>{\n    const response = axios__WEBPACK_IMPORTED_MODULE_2__[\"default\"].post(process.env.API_URL + \"/api/bettor/users\", formData, _config_headers__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n    if (response === undefined) {\n        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire(\"Failed\", \"Something went wrong while processing your registration. Please try again.\", \"error\");\n    } else {\n        sweetalert2__WEBPACK_IMPORTED_MODULE_1___default().fire(\"Success\", \"Your account has successfully been registered.\", \"success\");\n    }\n};\n\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevExports = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevExports) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports on update so we can compare the boundary\n                // signatures.\n                module.hot.dispose(function (data) {\n                    data.prevExports = currentExports;\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevExports !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevExports, currentExports)) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevExports !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1jbGllbnQpLy4vc3JjL2FwaS9iZXR0b3IvYXV0aC50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQXlCO0FBQ2E7QUFFUjtBQUU5QixNQUFNRyxXQUFXLENBQUNDO0lBQ2IsTUFBTUMsV0FBV0wsNkNBQUtBLENBQUNNLElBQUksQ0FBQ0MsT0FBT0EsQ0FBQ0MsR0FBRyxDQUFDQyxPQUFPLEdBQUMscUJBQXFCTCxVQUFVSCx1REFBTUE7SUFDckYsSUFBR0ksYUFBYUssV0FBVTtRQUN2QlIsdURBQVMsQ0FDTCxVQUNBLDhFQUNBO0lBRVAsT0FBTTtRQUNIQSx1REFBUyxDQUNMLFdBQ0Esa0RBQ0E7SUFFUDtBQUNMO0FBSUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwaS9iZXR0b3IvYXV0aC50c3g/ODY2OSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXhpb3MgZnJvbSBcImF4aW9zXCJcclxuaW1wb3J0IGNvbmZpZyBmcm9tIFwiLi4vY29uZmlnL2hlYWRlcnNcIlxyXG5pbXBvcnQgTW9kZWxfVXNlciBmcm9tIFwiQC9tb2RlbHMvdXNlcnNcIlxyXG5pbXBvcnQgU3dhbCBmcm9tIFwic3dlZXRhbGVydDJcIlxyXG5cclxuY29uc3QgcmVnaXN0ZXIgPSAoZm9ybURhdGE6IE1vZGVsX1VzZXIpID0+IHtcclxuICAgICBjb25zdCByZXNwb25zZSA9IGF4aW9zLnBvc3QocHJvY2Vzcy5lbnYuQVBJX1VSTCsnL2FwaS9iZXR0b3IvdXNlcnMnLCBmb3JtRGF0YSwgY29uZmlnKVxyXG4gICAgIGlmKHJlc3BvbnNlID09PSB1bmRlZmluZWQpe1xyXG4gICAgICAgIFN3YWwuZmlyZShcclxuICAgICAgICAgICAgJ0ZhaWxlZCcsXHJcbiAgICAgICAgICAgICdTb21ldGhpbmcgd2VudCB3cm9uZyB3aGlsZSBwcm9jZXNzaW5nIHlvdXIgcmVnaXN0cmF0aW9uLiBQbGVhc2UgdHJ5IGFnYWluLicsXHJcbiAgICAgICAgICAgICdlcnJvcidcclxuICAgICAgICApXHJcbiAgICAgfSBlbHNle1xyXG4gICAgICAgIFN3YWwuZmlyZShcclxuICAgICAgICAgICAgJ1N1Y2Nlc3MnLFxyXG4gICAgICAgICAgICAnWW91ciBhY2NvdW50IGhhcyBzdWNjZXNzZnVsbHkgYmVlbiByZWdpc3RlcmVkLicsXHJcbiAgICAgICAgICAgICdzdWNjZXNzJ1xyXG4gICAgICAgIClcclxuICAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCB7XHJcbiAgICByZWdpc3RlclxyXG59Il0sIm5hbWVzIjpbImF4aW9zIiwiY29uZmlnIiwiU3dhbCIsInJlZ2lzdGVyIiwiZm9ybURhdGEiLCJyZXNwb25zZSIsInBvc3QiLCJwcm9jZXNzIiwiZW52IiwiQVBJX1VSTCIsInVuZGVmaW5lZCIsImZpcmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-client)/./src/api/bettor/auth.tsx\n"));

/***/ })

});