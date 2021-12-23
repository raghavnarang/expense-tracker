"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var auth_1 = require("firebase-admin/auth");
var serviceAccount = require("../fb-auth.json");
var app = firebase_admin_1["default"].initializeApp({
    credential: firebase_admin_1["default"].credential.cert(serviceAccount)
});
var auth = (0, auth_1.getAuth)(app);
var verifyAuth = function (req, res, next) {
    var token = Array.isArray(req.headers['x-id-token']) ? req.headers['x-id-token'][0] : req.headers['x-id-token'];
    if (!token) {
        return next(new Error('Invalid token'));
    }
    auth
        .verifyIdToken(token)
        .then(function (decodedToken) {
        console.log(decodedToken);
        res.locals.user = {
            email: decodedToken.email,
            userId: decodedToken.user_id
        };
        next();
    })["catch"](function (error) {
        next(error);
    });
};
exports["default"] = verifyAuth;
//# sourceMappingURL=validate-auth.js.map