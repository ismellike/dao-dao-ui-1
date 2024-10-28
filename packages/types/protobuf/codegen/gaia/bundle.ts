import * as _109 from "./globalfee/v1beta1/genesis";
import * as _110 from "./globalfee/v1beta1/query";
import * as _111 from "./globalfee/v1beta1/tx";
import * as _112 from "./metaprotocols/extensions";
import * as _467 from "./globalfee/v1beta1/tx.amino";
import * as _468 from "./globalfee/v1beta1/tx.registry";
import * as _469 from "./globalfee/v1beta1/query.rpc.Query";
import * as _470 from "./globalfee/v1beta1/tx.rpc.msg";
import * as _680 from "./rpc.query";
import * as _681 from "./rpc.tx";
export namespace gaia {
  export namespace globalfee {
    export const v1beta1 = {
      ..._109,
      ..._110,
      ..._111,
      ..._467,
      ..._468,
      ..._469,
      ..._470
    };
  }
  export const metaprotocols = {
    ..._112
  };
  export const ClientFactory = {
    ..._680,
    ..._681
  };
}