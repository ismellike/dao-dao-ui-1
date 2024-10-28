import * as _121 from "./applications/interchain_accounts/controller/v1/controller";
import * as _122 from "./applications/interchain_accounts/controller/v1/query";
import * as _123 from "./applications/interchain_accounts/controller/v1/tx";
import * as _124 from "./applications/interchain_accounts/host/v1/host";
import * as _125 from "./applications/interchain_accounts/host/v1/query";
import * as _126 from "./applications/interchain_accounts/host/v1/tx";
import * as _127 from "./applications/interchain_accounts/v1/account";
import * as _128 from "./applications/interchain_accounts/v1/metadata";
import * as _129 from "./applications/interchain_accounts/v1/packet";
import * as _130 from "./applications/transfer/v1/authz";
import * as _131 from "./applications/transfer/v1/genesis";
import * as _132 from "./applications/transfer/v1/query";
import * as _133 from "./applications/transfer/v1/transfer";
import * as _134 from "./applications/transfer/v1/tx";
import * as _135 from "./core/channel/v1/channel";
import * as _136 from "./core/channel/v1/genesis";
import * as _137 from "./core/channel/v1/query";
import * as _138 from "./core/channel/v1/tx";
import * as _139 from "./core/client/v1/client";
import * as _140 from "./core/client/v1/genesis";
import * as _141 from "./core/client/v1/query";
import * as _142 from "./core/client/v1/tx";
import * as _143 from "./core/commitment/v1/commitment";
import * as _144 from "./core/connection/v1/connection";
import * as _145 from "./core/connection/v1/genesis";
import * as _146 from "./core/connection/v1/query";
import * as _147 from "./core/connection/v1/tx";
import * as _148 from "./lightclients/tendermint/v1/tendermint";
import * as _471 from "./applications/interchain_accounts/controller/v1/tx.amino";
import * as _472 from "./applications/interchain_accounts/host/v1/tx.amino";
import * as _473 from "./applications/transfer/v1/tx.amino";
import * as _474 from "./core/channel/v1/tx.amino";
import * as _475 from "./core/client/v1/tx.amino";
import * as _476 from "./core/connection/v1/tx.amino";
import * as _477 from "./applications/interchain_accounts/controller/v1/tx.registry";
import * as _478 from "./applications/interchain_accounts/host/v1/tx.registry";
import * as _479 from "./applications/transfer/v1/tx.registry";
import * as _480 from "./core/channel/v1/tx.registry";
import * as _481 from "./core/client/v1/tx.registry";
import * as _482 from "./core/connection/v1/tx.registry";
import * as _483 from "./applications/interchain_accounts/controller/v1/query.rpc.Query";
import * as _484 from "./applications/interchain_accounts/host/v1/query.rpc.Query";
import * as _485 from "./applications/transfer/v1/query.rpc.Query";
import * as _486 from "./core/channel/v1/query.rpc.Query";
import * as _487 from "./core/client/v1/query.rpc.Query";
import * as _488 from "./core/connection/v1/query.rpc.Query";
import * as _489 from "./applications/interchain_accounts/controller/v1/tx.rpc.msg";
import * as _490 from "./applications/interchain_accounts/host/v1/tx.rpc.msg";
import * as _491 from "./applications/transfer/v1/tx.rpc.msg";
import * as _492 from "./core/channel/v1/tx.rpc.msg";
import * as _493 from "./core/client/v1/tx.rpc.msg";
import * as _494 from "./core/connection/v1/tx.rpc.msg";
import * as _682 from "./rpc.query";
import * as _683 from "./rpc.tx";
export namespace ibc {
  export namespace applications {
    export namespace interchain_accounts {
      export namespace controller {
        export const v1 = {
          ..._121,
          ..._122,
          ..._123,
          ..._471,
          ..._477,
          ..._483,
          ..._489
        };
      }
      export namespace host {
        export const v1 = {
          ..._124,
          ..._125,
          ..._126,
          ..._472,
          ..._478,
          ..._484,
          ..._490
        };
      }
      export const v1 = {
        ..._127,
        ..._128,
        ..._129
      };
    }
    export namespace transfer {
      export const v1 = {
        ..._130,
        ..._131,
        ..._132,
        ..._133,
        ..._134,
        ..._473,
        ..._479,
        ..._485,
        ..._491
      };
    }
  }
  export namespace core {
    export namespace channel {
      export const v1 = {
        ..._135,
        ..._136,
        ..._137,
        ..._138,
        ..._474,
        ..._480,
        ..._486,
        ..._492
      };
    }
    export namespace client {
      export const v1 = {
        ..._139,
        ..._140,
        ..._141,
        ..._142,
        ..._475,
        ..._481,
        ..._487,
        ..._493
      };
    }
    export namespace commitment {
      export const v1 = {
        ..._143
      };
    }
    export namespace connection {
      export const v1 = {
        ..._144,
        ..._145,
        ..._146,
        ..._147,
        ..._476,
        ..._482,
        ..._488,
        ..._494
      };
    }
  }
  export namespace lightclients {
    export namespace tendermint {
      export const v1 = {
        ..._148
      };
    }
  }
  export const ClientFactory = {
    ..._682,
    ..._683
  };
}