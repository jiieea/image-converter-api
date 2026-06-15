"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMode = exports.SortOrder = exports.UserScalarFieldEnum = exports.ConversionScalarFieldEnum = exports.TransactionIsolationLevel = exports.ModelName = exports.AnyNull = exports.JsonNull = exports.DbNull = exports.NullTypes = exports.Decimal = void 0;
const runtime = require("@prisma/client/runtime/index-browser");
exports.Decimal = runtime.Decimal;
exports.NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
exports.DbNull = runtime.DbNull;
exports.JsonNull = runtime.JsonNull;
exports.AnyNull = runtime.AnyNull;
exports.ModelName = {
    Conversion: 'Conversion',
    User: 'User'
};
exports.TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
exports.ConversionScalarFieldEnum = {
    id: 'id',
    originalName: 'originalName',
    originalSize: 'originalSize',
    fromFormat: 'fromFormat',
    toFormat: 'toFormat',
    fileUrl: 'fileUrl',
    createdAt: 'createdAt',
    expiresAt: 'expiresAt'
};
exports.UserScalarFieldEnum = {
    id: 'id',
    username: 'username'
};
exports.SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
exports.QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map