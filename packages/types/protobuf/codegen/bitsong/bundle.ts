import * as _11 from "./fantoken/v1beta1/tx";
import * as _400 from "./fantoken/v1beta1/tx.amino";
import * as _401 from "./fantoken/v1beta1/tx.registry";
import * as _402 from "./fantoken/v1beta1/query.rpc.Query";
import * as _403 from "./fantoken/v1beta1/tx.rpc.msg";
import * as _670 from "./rpc.query";
import * as _671 from "./rpc.tx";
export namespace bitsong {
  export const fantoken = {
    ..._11,
    ..._400,
    ..._401,
    ..._403,
    v1beta1: {
      ..._402
    }
  };
  export const ClientFactory = {
    ..._670,
    ..._671
  };
}