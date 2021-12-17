"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
require("../styles/globals.css");
var react_query_1 = require("react-query");
var Toast_1 = __importDefault(require("../components/global/Toast"));
var react_1 = require("react");
var utils_1 = require("../utils");
var queryClient = new react_query_1.QueryClient();
function MyApp(_a) {
    var Component = _a.Component, pageProps = _a.pageProps;
    var _b = (0, react_1.useState)(''), toastText = _b[0], setToastText = _b[1];
    var clearToast = function () {
        setToastText('');
        clearTimeout(timeout.current);
    };
    var timeout = (0, react_1.useRef)();
    (0, react_1.useEffect)(function () {
        if (!!toastText) {
            timeout.current = window.setTimeout(clearToast, 5000);
        }
    }, [toastText]);
    return <react_query_1.QueryClientProvider client={queryClient}>
    <utils_1.ToastContext.Provider value={{ showToast: setToastText }}>
      <Component {...pageProps}/>
      {!!toastText && <Toast_1["default"] text={toastText} onClick={clearToast}/>}
    </utils_1.ToastContext.Provider>
  </react_query_1.QueryClientProvider>;
}
exports["default"] = MyApp;
//# sourceMappingURL=_app.js.map