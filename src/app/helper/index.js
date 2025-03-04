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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
Object.defineProperty(exports, "__esModule", { value: true });
var ts_sdk_1 = require("@aptos-labs/ts-sdk");
var axios_1 = require("axios");
function swapTokens() {
    return __awaiter(this, void 0, void 0, function () {
        var aptos, privateKeyHex, user, srcAsset, dstAsset, amount, mosaicResponse, transaction, pendingTransactionResponse, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 4, , 5]);
                    aptos = new ts_sdk_1.Aptos(new ts_sdk_1.AptosConfig({
                        fullnode: "https://aptos.testnet.bardock.movementlabs.xyz/v1",
                    }));
                    privateKeyHex = ts_sdk_1.PrivateKey.formatPrivateKey("0x09b7c8121bc6df4d1e60d1d535be70b23f1c2e6a1e2c4031f20fd6028796c968", ts_sdk_1.PrivateKeyVariants.Ed25519);
                    user = ts_sdk_1.Account.fromPrivateKey({
                        privateKey: new ts_sdk_1.Ed25519PrivateKey(privateKeyHex),
                    });
                    srcAsset = "0xa";
                    dstAsset = "0xb89077cfd2a82a0c1450534d49cfd5f2707643155273069bc23a912bcfefdee7";
                    amount = 10000;
                    return [4 /*yield*/, axios_1.default.get("https://testnet.mosaic.ag/bardock/v1/quote", {
                            params: {
                                srcAsset: srcAsset,
                                dstAsset: dstAsset,
                                amount: amount.toString(),
                                sender: user.accountAddress.toString(),
                                slippage: 100,
                            },
                            headers: {
                                "X-API-KEY": "PWNpDllwqV7DdnKVThUhGF7i0F2FpDFm",
                            },
                        })];
                case 1:
                    mosaicResponse = _b.sent();
                    // Kiểm tra nếu API trả về lỗi
                    if (!mosaicResponse.data || !((_a = mosaicResponse.data.data) === null || _a === void 0 ? void 0 : _a.tx)) {
                        throw new Error("Lỗi dcm nhà m");
                    }
                    return [4 /*yield*/, aptos.transaction.build.simple({
                            sender: user.accountAddress,
                            data: {
                                function: mosaicResponse.data.data.tx.function,
                                typeArguments: mosaicResponse.data.data.tx.typeArguments || [],
                                functionArguments: mosaicResponse.data.data.tx.functionArguments || [],
                            },
                        })];
                case 2:
                    transaction = _b.sent();
                    return [4 /*yield*/, aptos.transaction.signAndSubmitTransaction({
                            signer: user,
                            transaction: transaction,
                        })];
                case 3:
                    pendingTransactionResponse = _b.sent();
                    // In URL giao dịch
                    console.log("Tx = https://explorer.movementnetwork.xyz/txn/".concat(pendingTransactionResponse.hash, "?network=testnet"));
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _b.sent();
                    console.error("Error swapping tokens:", error_1);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
swapTokens();
