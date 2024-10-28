import * as _219 from "./onft/v1beta1/genesis";
import * as _220 from "./onft/v1beta1/onft";
import * as _221 from "./onft/v1beta1/params";
import * as _222 from "./onft/v1beta1/query";
import * as _223 from "./onft/v1beta1/tx";
import * as _544 from "./onft/v1beta1/tx.amino";
import * as _545 from "./onft/v1beta1/tx.registry";
import * as _546 from "./onft/v1beta1/query.rpc.Query";
import * as _547 from "./onft/v1beta1/tx.rpc.msg";
import * as _692 from "./rpc.query";
import * as _693 from "./rpc.tx";
export namespace OmniFlix {
  export namespace onft {
    export const v1beta1 = {
      ..._219,
      ..._220,
      ..._221,
      ..._222,
      ..._223,
      ..._544,
      ..._545,
      ..._546,
      ..._547
    };
  }
  export const ClientFactory = {
    ..._692,
    ..._693
  };
}