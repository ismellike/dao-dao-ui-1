import * as _149 from "./ccv/consumer/v1/consumer";
import * as _150 from "./ccv/consumer/v1/genesis";
import * as _151 from "./ccv/consumer/v1/query";
import * as _152 from "./ccv/consumer/v1/tx";
import * as _153 from "./ccv/provider/v1/genesis";
import * as _154 from "./ccv/provider/v1/provider";
import * as _155 from "./ccv/provider/v1/query";
import * as _156 from "./ccv/provider/v1/tx";
import * as _157 from "./ccv/v1/shared_consumer";
import * as _158 from "./ccv/v1/wire";
import * as _495 from "./ccv/consumer/v1/tx.amino";
import * as _496 from "./ccv/provider/v1/tx.amino";
import * as _497 from "./ccv/consumer/v1/tx.registry";
import * as _498 from "./ccv/provider/v1/tx.registry";
import * as _499 from "./ccv/consumer/v1/query.rpc.Query";
import * as _500 from "./ccv/provider/v1/query.rpc.Query";
import * as _501 from "./ccv/consumer/v1/tx.rpc.msg";
import * as _502 from "./ccv/provider/v1/tx.rpc.msg";
import * as _684 from "./rpc.query";
import * as _685 from "./rpc.tx";
export namespace interchain_security {
  export namespace ccv {
    export namespace consumer {
      export const v1 = {
        ..._149,
        ..._150,
        ..._151,
        ..._152,
        ..._495,
        ..._497,
        ..._499,
        ..._501
      };
    }
    export namespace provider {
      export const v1 = {
        ..._153,
        ..._154,
        ..._155,
        ..._156,
        ..._496,
        ..._498,
        ..._500,
        ..._502
      };
    }
    export const v1 = {
      ..._157,
      ..._158
    };
  }
  export const ClientFactory = {
    ..._684,
    ..._685
  };
}