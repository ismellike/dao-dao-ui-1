import * as _224 from "./accum/v1beta1/accum";
import * as _225 from "./concentratedliquidity/params";
import * as _226 from "./cosmwasmpool/v1beta1/genesis";
import * as _227 from "./cosmwasmpool/v1beta1/gov";
import * as _228 from "./cosmwasmpool/v1beta1/model/instantiate_msg";
import * as _229 from "./cosmwasmpool/v1beta1/model/module_query_msg";
import * as _230 from "./cosmwasmpool/v1beta1/model/module_sudo_msg";
import * as _231 from "./cosmwasmpool/v1beta1/model/pool_query_msg";
import * as _232 from "./cosmwasmpool/v1beta1/model/pool";
import * as _233 from "./cosmwasmpool/v1beta1/model/transmuter_msgs";
import * as _234 from "./cosmwasmpool/v1beta1/model/tx";
import * as _235 from "./cosmwasmpool/v1beta1/params";
import * as _236 from "./cosmwasmpool/v1beta1/query";
import * as _237 from "./cosmwasmpool/v1beta1/tx";
import * as _238 from "./gamm/poolmodels/balancer/v1beta1/tx";
import * as _239 from "./gamm/poolmodels/stableswap/v1beta1/stableswap_pool";
import * as _240 from "./gamm/poolmodels/stableswap/v1beta1/tx";
import * as _241 from "./gamm/v1beta1/balancerPool";
import * as _242 from "./gamm/v1beta1/genesis";
import * as _243 from "./gamm/v1beta1/gov";
import * as _244 from "./gamm/v1beta1/params";
import * as _245 from "./gamm/v1beta1/query";
import * as _246 from "./gamm/v1beta1/shared";
import * as _247 from "./gamm/v1beta1/tx";
import * as _248 from "./incentives/gauge";
import * as _249 from "./incentives/genesis";
import * as _250 from "./incentives/gov";
import * as _251 from "./incentives/group";
import * as _252 from "./incentives/params";
import * as _253 from "./incentives/query";
import * as _254 from "./incentives/tx";
import * as _255 from "./lockup/genesis";
import * as _256 from "./lockup/lock";
import * as _257 from "./lockup/params";
import * as _258 from "./lockup/query";
import * as _259 from "./lockup/tx";
import * as _260 from "./poolincentives/v1beta1/genesis";
import * as _261 from "./poolincentives/v1beta1/gov";
import * as _262 from "./poolincentives/v1beta1/incentives";
import * as _263 from "./poolincentives/v1beta1/query";
import * as _264 from "./poolincentives/v1beta1/shared";
import * as _265 from "./poolmanager/v1beta1/genesis";
import * as _266 from "./poolmanager/v1beta1/gov";
import * as _267 from "./poolmanager/v1beta1/module_route";
import * as _268 from "./poolmanager/v1beta1/query";
import * as _269 from "./poolmanager/v1beta1/swap_route";
import * as _270 from "./poolmanager/v1beta1/taker_fee_share";
import * as _271 from "./poolmanager/v1beta1/tracked_volume";
import * as _272 from "./poolmanager/v1beta1/tx";
import * as _273 from "./protorev/v1beta1/genesis";
import * as _274 from "./protorev/v1beta1/gov";
import * as _275 from "./protorev/v1beta1/params";
import * as _276 from "./protorev/v1beta1/protorev";
import * as _277 from "./protorev/v1beta1/query";
import * as _278 from "./protorev/v1beta1/tx";
import * as _279 from "./smartaccount/v1beta1/genesis";
import * as _280 from "./smartaccount/v1beta1/models";
import * as _281 from "./smartaccount/v1beta1/params";
import * as _282 from "./smartaccount/v1beta1/query";
import * as _283 from "./smartaccount/v1beta1/tx";
import * as _284 from "./superfluid/genesis";
import * as _285 from "./superfluid/params";
import * as _286 from "./superfluid/query";
import * as _287 from "./superfluid/superfluid";
import * as _288 from "./superfluid/tx";
import * as _289 from "./tokenfactory/v1beta1/authorityMetadata";
import * as _290 from "./tokenfactory/v1beta1/genesis";
import * as _291 from "./tokenfactory/v1beta1/params";
import * as _292 from "./tokenfactory/v1beta1/query";
import * as _293 from "./tokenfactory/v1beta1/tx";
import * as _294 from "./txfees/v1beta1/feetoken";
import * as _295 from "./txfees/v1beta1/genesis";
import * as _296 from "./txfees/v1beta1/gov";
import * as _297 from "./txfees/v1beta1/params";
import * as _298 from "./txfees/v1beta1/query";
import * as _299 from "./txfees/v1beta1/tx";
import * as _300 from "./valsetpref/v1beta1/query";
import * as _301 from "./valsetpref/v1beta1/state";
import * as _302 from "./valsetpref/v1beta1/tx";
import * as _548 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.amino";
import * as _549 from "./concentratedliquidity/v1beta1/tx.amino";
import * as _550 from "./gamm/poolmodels/balancer/v1beta1/tx.amino";
import * as _551 from "./gamm/poolmodels/stableswap/v1beta1/tx.amino";
import * as _552 from "./gamm/v1beta1/tx.amino";
import * as _553 from "./incentives/tx.amino";
import * as _554 from "./lockup/tx.amino";
import * as _555 from "./poolmanager/v1beta1/tx.amino";
import * as _556 from "./protorev/v1beta1/tx.amino";
import * as _557 from "./smartaccount/v1beta1/tx.amino";
import * as _558 from "./superfluid/tx.amino";
import * as _559 from "./tokenfactory/v1beta1/tx.amino";
import * as _560 from "./txfees/v1beta1/tx.amino";
import * as _561 from "./valsetpref/v1beta1/tx.amino";
import * as _562 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.registry";
import * as _563 from "./concentratedliquidity/v1beta1/tx.registry";
import * as _564 from "./gamm/poolmodels/balancer/v1beta1/tx.registry";
import * as _565 from "./gamm/poolmodels/stableswap/v1beta1/tx.registry";
import * as _566 from "./gamm/v1beta1/tx.registry";
import * as _567 from "./incentives/tx.registry";
import * as _568 from "./lockup/tx.registry";
import * as _569 from "./poolmanager/v1beta1/tx.registry";
import * as _570 from "./protorev/v1beta1/tx.registry";
import * as _571 from "./smartaccount/v1beta1/tx.registry";
import * as _572 from "./superfluid/tx.registry";
import * as _573 from "./tokenfactory/v1beta1/tx.registry";
import * as _574 from "./txfees/v1beta1/tx.registry";
import * as _575 from "./valsetpref/v1beta1/tx.registry";
import * as _576 from "./concentratedliquidity/v1beta1/query.rpc.Query";
import * as _577 from "./cosmwasmpool/v1beta1/query.rpc.Query";
import * as _578 from "./gamm/v1beta1/query.rpc.Query";
import * as _579 from "./incentives/query.rpc.Query";
import * as _580 from "./lockup/query.rpc.Query";
import * as _581 from "./poolincentives/v1beta1/query.rpc.Query";
import * as _582 from "./poolmanager/v1beta1/query.rpc.Query";
import * as _583 from "./protorev/v1beta1/query.rpc.Query";
import * as _584 from "./smartaccount/v1beta1/query.rpc.Query";
import * as _585 from "./superfluid/query.rpc.Query";
import * as _586 from "./tokenfactory/v1beta1/query.rpc.Query";
import * as _587 from "./txfees/v1beta1/query.rpc.Query";
import * as _588 from "./valsetpref/v1beta1/query.rpc.Query";
import * as _589 from "./concentratedliquidity/poolmodel/concentrated/v1beta1/tx.rpc.msg";
import * as _590 from "./concentratedliquidity/v1beta1/tx.rpc.msg";
import * as _591 from "./gamm/poolmodels/balancer/v1beta1/tx.rpc.msg";
import * as _592 from "./gamm/poolmodels/stableswap/v1beta1/tx.rpc.msg";
import * as _593 from "./gamm/v1beta1/tx.rpc.msg";
import * as _594 from "./incentives/tx.rpc.msg";
import * as _595 from "./lockup/tx.rpc.msg";
import * as _596 from "./poolmanager/v1beta1/tx.rpc.msg";
import * as _597 from "./protorev/v1beta1/tx.rpc.msg";
import * as _598 from "./smartaccount/v1beta1/tx.rpc.msg";
import * as _599 from "./superfluid/tx.rpc.msg";
import * as _600 from "./tokenfactory/v1beta1/tx.rpc.msg";
import * as _601 from "./txfees/v1beta1/tx.rpc.msg";
import * as _602 from "./valsetpref/v1beta1/tx.rpc.msg";
import * as _694 from "./rpc.query";
import * as _695 from "./rpc.tx";
export namespace osmosis {
  export namespace accum {
    export const v1beta1 = {
      ..._224
    };
  }
  export const concentratedliquidity = {
    ..._225,
    poolmodel: {
      concentrated: {
        v1beta1: {
          ..._548,
          ..._562,
          ..._589
        }
      }
    },
    v1beta1: {
      ..._549,
      ..._563,
      ..._576,
      ..._590
    }
  };
  export namespace cosmwasmpool {
    export const v1beta1 = {
      ..._226,
      ..._227,
      ..._228,
      ..._229,
      ..._230,
      ..._231,
      ..._232,
      ..._233,
      ..._234,
      ..._235,
      ..._236,
      ..._237,
      ..._577
    };
  }
  export namespace gamm {
    export namespace poolmodels {
      export namespace balancer {
        export const v1beta1 = {
          ..._238,
          ..._550,
          ..._564,
          ..._591
        };
      }
      export namespace stableswap {
        export const v1beta1 = {
          ..._239,
          ..._240,
          ..._551,
          ..._565,
          ..._592
        };
      }
    }
    export const v1beta1 = {
      ..._241,
      ..._242,
      ..._243,
      ..._244,
      ..._245,
      ..._246,
      ..._247,
      ..._552,
      ..._566,
      ..._578,
      ..._593
    };
  }
  export const incentives = {
    ..._248,
    ..._249,
    ..._250,
    ..._251,
    ..._252,
    ..._253,
    ..._254,
    ..._553,
    ..._567,
    ..._579,
    ..._594
  };
  export const lockup = {
    ..._255,
    ..._256,
    ..._257,
    ..._258,
    ..._259,
    ..._554,
    ..._568,
    ..._580,
    ..._595
  };
  export namespace poolincentives {
    export const v1beta1 = {
      ..._260,
      ..._261,
      ..._262,
      ..._263,
      ..._264,
      ..._581
    };
  }
  export namespace poolmanager {
    export const v1beta1 = {
      ..._265,
      ..._266,
      ..._267,
      ..._268,
      ..._269,
      ..._270,
      ..._271,
      ..._272,
      ..._555,
      ..._569,
      ..._582,
      ..._596
    };
  }
  export namespace protorev {
    export const v1beta1 = {
      ..._273,
      ..._274,
      ..._275,
      ..._276,
      ..._277,
      ..._278,
      ..._556,
      ..._570,
      ..._583,
      ..._597
    };
  }
  export namespace smartaccount {
    export const v1beta1 = {
      ..._279,
      ..._280,
      ..._281,
      ..._282,
      ..._283,
      ..._557,
      ..._571,
      ..._584,
      ..._598
    };
  }
  export const superfluid = {
    ..._284,
    ..._285,
    ..._286,
    ..._287,
    ..._288,
    ..._558,
    ..._572,
    ..._585,
    ..._599
  };
  export namespace tokenfactory {
    export const v1beta1 = {
      ..._289,
      ..._290,
      ..._291,
      ..._292,
      ..._293,
      ..._559,
      ..._573,
      ..._586,
      ..._600
    };
  }
  export namespace txfees {
    export const v1beta1 = {
      ..._294,
      ..._295,
      ..._296,
      ..._297,
      ..._298,
      ..._299,
      ..._560,
      ..._574,
      ..._587,
      ..._601
    };
  }
  export namespace valsetpref {
    export const v1beta1 = {
      ..._300,
      ..._301,
      ..._302,
      ..._561,
      ..._575,
      ..._588,
      ..._602
    };
  }
  export const ClientFactory = {
    ..._694,
    ..._695
  };
}