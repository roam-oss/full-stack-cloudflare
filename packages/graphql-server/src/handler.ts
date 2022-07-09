import execute from "./execute";
import { ObjectRecordKeyType } from "./types";

const onRequest: API<ObjectRecordKeyType> = async (context) => {
  try {
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
      "Access-Control-Max-Age": "86400",
    };

    // Contents of context object
    const {
      request, // same as existing Worker API
      env, // same as existing Worker API
      params, // if filename includes [id] or [[path]]
      waitUntil, // same as ctx.waitUntil in existing Worker API
      next, // used for middleware or to fetch assets
      data, // arbitrary space for passing data between middlewares
    } = context;

    const body: GraphQLQueryRequest = await request.json();
    const res = await execute(body, env);
    return new Response(JSON.stringify(res), { headers });
  } catch (e) {
    return new Response(
      JSON.stringify({
        data: null,
        error: {
          message: e?.message,
          fileName: e?.fileName,
          lineNumber: e?.lineNumber,
        },
      })
    );
  }
};

export default onRequest;
