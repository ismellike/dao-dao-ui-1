import * as _324 from "./stargaze/alloc/v1beta1/genesis";
import * as _325 from "./stargaze/alloc/v1beta1/params";
import * as _326 from "./stargaze/alloc/v1beta1/query";
import * as _327 from "./stargaze/alloc/v1beta1/tx";
import * as _328 from "./stargaze/cron/v1/cron";
import * as _329 from "./stargaze/cron/v1/genesis";
import * as _330 from "./stargaze/cron/v1/proposal";
import * as _331 from "./stargaze/cron/v1/query";
import * as _332 from "./stargaze/cron/v1/tx";
import * as _333 from "./stargaze/globalfee/v1/genesis";
import * as _334 from "./stargaze/globalfee/v1/globalfee";
import * as _335 from "./stargaze/globalfee/v1/proposal";
import * as _336 from "./stargaze/globalfee/v1/query";
import * as _337 from "./stargaze/globalfee/v1/tx";
import * as _338 from "./stargaze/mint/v1beta1/genesis";
import * as _339 from "./stargaze/mint/v1beta1/mint";
import * as _340 from "./stargaze/mint/v1beta1/query";
import * as _341 from "./stargaze/mint/v1beta1/tx";
import * as _619 from "./stargaze/alloc/v1beta1/tx.amino";
import * as _620 from "./stargaze/cron/v1/tx.amino";
import * as _621 from "./stargaze/globalfee/v1/tx.amino";
import * as _622 from "./stargaze/alloc/v1beta1/tx.registry";
import * as _623 from "./stargaze/cron/v1/tx.registry";
import * as _624 from "./stargaze/globalfee/v1/tx.registry";
import * as _625 from "./stargaze/alloc/v1beta1/query.rpc.Query";
import * as _626 from "./stargaze/cron/v1/query.rpc.Query";
import * as _627 from "./stargaze/globalfee/v1/query.rpc.Query";
import * as _628 from "./stargaze/mint/v1beta1/query.rpc.Query";
import * as _629 from "./stargaze/alloc/v1beta1/tx.rpc.msg";
import * as _630 from "./stargaze/cron/v1/tx.rpc.msg";
import * as _631 from "./stargaze/globalfee/v1/tx.rpc.msg";
import * as _698 from "./rpc.query";
import * as _699 from "./rpc.tx";
export namespace publicawesome {
  export namespace stargaze {
    export namespace alloc {
      export const v1beta1 = {
        ..._324,
        ..._325,
        ..._326,
        ..._327,
        ..._619,
        ..._622,
        ..._625,
        ..._629
      };
    }
    export namespace cron {
      export const v1 = {
        ..._328,
        ..._329,
        ..._330,
        ..._331,
        ..._332,
        ..._620,
        ..._623,
        ..._626,
        ..._630
      };
    }
    export namespace globalfee {
      export const v1 = {
        ..._333,
        ..._334,
        ..._335,
        ..._336,
        ..._337,
        ..._621,
        ..._624,
        ..._627,
        ..._631
      };
    }
    export namespace mint {
      export const v1beta1 = {
        ..._338,
        ..._339,
        ..._340,
        ..._341,
        ..._628
      };
    }
  }
  export const ClientFactory = {
    ..._698,
    ..._699
  };
}