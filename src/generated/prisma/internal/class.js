"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPrismaClientClass = getPrismaClientClass;
const runtime = require("@prisma/client/runtime/client");
const config = {
    "previewFeatures": [],
    "clientVersion": "7.8.0",
    "engineVersion": "3c6e192761c0362d496ed980de936e2f3cebcd3a",
    "activeProvider": "postgresql",
    "inlineSchema": "// This is your Prisma schema file,\n// learn more about it in the docs: https://pris.ly/d/prisma-schema\n\n// Get a free hosted Postgres database in seconds: `npx create-db`\n\ngenerator client {\n  provider = \"prisma-client\"\n  output   = \"../generated/prisma\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n}\n\nmodel Conversion {\n  id           String   @id @default(uuid())\n  originalName String\n  originalSize Int\n  fromFormat   String // jpg, png, webp\n  toFormat     String // jpg, png, webp, pdf\n  fileUrl      String // Supabase storage URL\n  createdAt    DateTime @default(now())\n  expiresAt    DateTime // createdAt + 1 hour\n}\n\nmodel User {\n  id       Int    @id @default(autoincrement())\n  username String\n}\n",
    "runtimeDataModel": {
        "models": {},
        "enums": {},
        "types": {}
    },
    "parameterizationSchema": {
        "strings": [],
        "graph": ""
    }
};
config.runtimeDataModel = JSON.parse("{\"models\":{\"Conversion\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"originalName\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"originalSize\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"fromFormat\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"toFormat\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"fileUrl\",\"kind\":\"scalar\",\"type\":\"String\"},{\"name\":\"createdAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"},{\"name\":\"expiresAt\",\"kind\":\"scalar\",\"type\":\"DateTime\"}],\"dbName\":null},\"User\":{\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"type\":\"Int\"},{\"name\":\"username\",\"kind\":\"scalar\",\"type\":\"String\"}],\"dbName\":null}},\"enums\":{},\"types\":{}}");
config.parameterizationSchema = {
    strings: JSON.parse("[\"where\",\"Conversion.findUnique\",\"Conversion.findUniqueOrThrow\",\"orderBy\",\"cursor\",\"Conversion.findFirst\",\"Conversion.findFirstOrThrow\",\"Conversion.findMany\",\"data\",\"Conversion.createOne\",\"Conversion.createMany\",\"Conversion.createManyAndReturn\",\"Conversion.updateOne\",\"Conversion.updateMany\",\"Conversion.updateManyAndReturn\",\"create\",\"update\",\"Conversion.upsertOne\",\"Conversion.deleteOne\",\"Conversion.deleteMany\",\"having\",\"_count\",\"_avg\",\"_sum\",\"_min\",\"_max\",\"Conversion.groupBy\",\"Conversion.aggregate\",\"User.findUnique\",\"User.findUniqueOrThrow\",\"User.findFirst\",\"User.findFirstOrThrow\",\"User.findMany\",\"User.createOne\",\"User.createMany\",\"User.createManyAndReturn\",\"User.updateOne\",\"User.updateMany\",\"User.updateManyAndReturn\",\"User.upsertOne\",\"User.deleteOne\",\"User.deleteMany\",\"User.groupBy\",\"User.aggregate\",\"AND\",\"OR\",\"NOT\",\"id\",\"username\",\"equals\",\"in\",\"notIn\",\"lt\",\"lte\",\"gt\",\"gte\",\"contains\",\"startsWith\",\"endsWith\",\"not\",\"originalName\",\"originalSize\",\"fromFormat\",\"toFormat\",\"fileUrl\",\"createdAt\",\"expiresAt\",\"set\",\"increment\",\"decrement\",\"multiply\",\"divide\"]"),
    graph: "UBUgCywAAEIAMC0AAAQAEC4AAEIAMC8BAAAAATwBAD0AIT0CADwAIT4BAD0AIT8BAD0AIUABAD0AIUFAAEMAIUJAAEMAIQEAAAABACABAAAAAQAgCywAAEIAMC0AAAQAEC4AAEIAMC8BAD0AITwBAD0AIT0CADwAIT4BAD0AIT8BAD0AIUABAD0AIUFAAEMAIUJAAEMAIQADAAAABAAgAwAABQAwBAAAAQAgAwAAAAQAIAMAAAUAMAQAAAEAIAMAAAAEACADAAAFADAEAAABACAILwEAAAABPAEAAAABPQIAAAABPgEAAAABPwEAAAABQAEAAAABQUAAAAABQkAAAAABAQgAAAkAIAgvAQAAAAE8AQAAAAE9AgAAAAE-AQAAAAE_AQAAAAFAAQAAAAFBQAAAAAFCQAAAAAEBCAAACwAwAQgAAAsAMAgvAQBJACE8AQBJACE9AgBKACE-AQBJACE_AQBJACFAAQBJACFBQABQACFCQABQACECAAAAAQAgCAAADgAgCC8BAEkAITwBAEkAIT0CAEoAIT4BAEkAIT8BAEkAIUABAEkAIUFAAFAAIUJAAFAAIQIAAAAEACAIAAAQACACAAAABAAgCAAAEAAgAwAAAAEAIA8AAAkAIBAAAA4AIAEAAAABACABAAAABAAgBRUAAEsAIBYAAEwAIBcAAE8AIBgAAE4AIBkAAE0AIAssAAA-ADAtAAAXABAuAAA-ADAvAQA1ACE8AQA1ACE9AgA0ACE-AQA1ACE_AQA1ACFAAQA1ACFBQAA_ACFCQAA_ACEDAAAABAAgAwAAFgAwFAAAFwAgAwAAAAQAIAMAAAUAMAQAAAEAIAUsAAA7ADAtAAAdABAuAAA7ADAvAgAAAAEwAQA9ACEBAAAAGgAgAQAAABoAIAUsAAA7ADAtAAAdABAuAAA7ADAvAgA8ACEwAQA9ACEAAwAAAB0AIAMAAB4AMAQAABoAIAMAAAAdACADAAAeADAEAAAaACADAAAAHQAgAwAAHgAwBAAAGgAgAi8CAAAAATABAAAAAQEIAAAiACACLwIAAAABMAEAAAABAQgAACQAMAEIAAAkADACLwIASgAhMAEASQAhAgAAABoAIAgAACcAIAIvAgBKACEwAQBJACECAAAAHQAgCAAAKQAgAgAAAB0AIAgAACkAIAMAAAAaACAPAAAiACAQAAAnACABAAAAGgAgAQAAAB0AIAUVAABEACAWAABFACAXAABIACAYAABHACAZAABGACAFLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhAwAAAB0AIAMAAC8AMBQAADAAIAMAAAAdACADAAAeADAEAAAaACAFLAAAMwAwLQAAMAAQLgAAMwAwLwIANAAhMAEANQAhDRUAADcAIBYAADoAIBcAADcAIBgAADcAIBkAADcAIDECAAAAATICAAAABDMCAAAABDQCAAAAATUCAAAAATYCAAAAATcCAAAAATsCADkAIQ4VAAA3ACAYAAA4ACAZAAA4ACAxAQAAAAEyAQAAAAQzAQAAAAQ0AQAAAAE1AQAAAAE2AQAAAAE3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA2ACEOFQAANwAgGAAAOAAgGQAAOAAgMQEAAAABMgEAAAAEMwEAAAAENAEAAAABNQEAAAABNgEAAAABNwEAAAABOAEAAAABOQEAAAABOgEAAAABOwEANgAhCDECAAAAATICAAAABDMCAAAABDQCAAAAATUCAAAAATYCAAAAATcCAAAAATsCADcAIQsxAQAAAAEyAQAAAAQzAQAAAAQ0AQAAAAE1AQAAAAE2AQAAAAE3AQAAAAE4AQAAAAE5AQAAAAE6AQAAAAE7AQA4ACENFQAANwAgFgAAOgAgFwAANwAgGAAANwAgGQAANwAgMQIAAAABMgIAAAAEMwIAAAAENAIAAAABNQIAAAABNgIAAAABNwIAAAABOwIAOQAhCDEIAAAAATIIAAAABDMIAAAABDQIAAAAATUIAAAAATYIAAAAATcIAAAAATsIADoAIQUsAAA7ADAtAAAdABAuAAA7ADAvAgA8ACEwAQA9ACEIMQIAAAABMgIAAAAEMwIAAAAENAIAAAABNQIAAAABNgIAAAABNwIAAAABOwIANwAhCzEBAAAAATIBAAAABDMBAAAABDQBAAAAATUBAAAAATYBAAAAATcBAAAAATgBAAAAATkBAAAAAToBAAAAATsBADgAIQssAAA-ADAtAAAXABAuAAA-ADAvAQA1ACE8AQA1ACE9AgA0ACE-AQA1ACE_AQA1ACFAAQA1ACFBQAA_ACFCQAA_ACELFQAANwAgGAAAQQAgGQAAQQAgMUAAAAABMkAAAAAEM0AAAAAENEAAAAABNUAAAAABNkAAAAABN0AAAAABO0AAQAAhCxUAADcAIBgAAEEAIBkAAEEAIDFAAAAAATJAAAAABDNAAAAABDRAAAAAATVAAAAAATZAAAAAATdAAAAAATtAAEAAIQgxQAAAAAEyQAAAAAQzQAAAAAQ0QAAAAAE1QAAAAAE2QAAAAAE3QAAAAAE7QABBACELLAAAQgAwLQAABAAQLgAAQgAwLwEAPQAhPAEAPQAhPQIAPAAhPgEAPQAhPwEAPQAhQAEAPQAhQUAAQwAhQkAAQwAhCDFAAAAAATJAAAAABDNAAAAABDRAAAAAATVAAAAAATZAAAAAATdAAAAAATtAAEEAIQAAAAAAAUMBAAAAAQVDAgAAAAFEAgAAAAFFAgAAAAFGAgAAAAFHAgAAAAEAAAAAAAFDQAAAAAEAAAAABRUABhYABxcACBgACRkACgAAAAAABRUABhYABxcACBgACRkACgAAAAUVABAWABEXABIYABMZABQAAAAAAAUVABAWABEXABIYABMZABQBAgECAwEFBgEGBwEHCAEJCgEKDAILDQMMDwENEQIOEgQREwESFAETFQIaGAUbGQscGwwdHAweHwwfIAwgIQwhIwwiJQIjJg0kKAwlKgImKw4nLAwoLQwpLgIqMQ8rMhU"
};
async function decodeBase64AsWasm(wasmBase64) {
    const { Buffer } = await Promise.resolve().then(() => require('node:buffer'));
    const wasmArray = Buffer.from(wasmBase64, 'base64');
    return new WebAssembly.Module(wasmArray);
}
config.compilerWasm = {
    getRuntime: async () => await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.js")),
    getQueryCompilerWasmModule: async () => {
        const { wasm } = await Promise.resolve().then(() => require("@prisma/client/runtime/query_compiler_fast_bg.postgresql.wasm-base64.js"));
        return await decodeBase64AsWasm(wasm);
    },
    importName: "./query_compiler_fast_bg.js"
};
function getPrismaClientClass() {
    return runtime.getPrismaClient(config);
}
//# sourceMappingURL=class.js.map