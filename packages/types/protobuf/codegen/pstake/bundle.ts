import * as _303 from "./liquidstake/v1beta1/genesis";
import * as _304 from "./liquidstake/v1beta1/liquidstake";
import * as _305 from "./liquidstake/v1beta1/query";
import * as _306 from "./liquidstake/v1beta1/tx";
import * as _307 from "./liquidstakeibc/v1beta1/genesis";
import * as _308 from "./liquidstakeibc/v1beta1/liquidstakeibc";
import * as _309 from "./liquidstakeibc/v1beta1/msgs";
import * as _310 from "./liquidstakeibc/v1beta1/params";
import * as _311 from "./liquidstakeibc/v1beta1/query";
import * as _312 from "./lscosmos/v1beta1/genesis";
import * as _313 from "./lscosmos/v1beta1/governance_proposal";
import * as _314 from "./lscosmos/v1beta1/lscosmos";
import * as _315 from "./lscosmos/v1beta1/msgs";
import * as _316 from "./lscosmos/v1beta1/params";
import * as _317 from "./lscosmos/v1beta1/query";
import * as _318 from "./ratesync/v1beta1/contract";
import * as _319 from "./ratesync/v1beta1/genesis";
import * as _320 from "./ratesync/v1beta1/params";
import * as _321 from "./ratesync/v1beta1/query";
import * as _322 from "./ratesync/v1beta1/ratesync";
import * as _323 from "./ratesync/v1beta1/tx";
import * as _603 from "./liquidstake/v1beta1/tx.amino";
import * as _604 from "./liquidstakeibc/v1beta1/msgs.amino";
import * as _605 from "./lscosmos/v1beta1/msgs.amino";
import * as _606 from "./ratesync/v1beta1/tx.amino";
import * as _607 from "./liquidstake/v1beta1/tx.registry";
import * as _608 from "./liquidstakeibc/v1beta1/msgs.registry";
import * as _609 from "./lscosmos/v1beta1/msgs.registry";
import * as _610 from "./ratesync/v1beta1/tx.registry";
import * as _611 from "./liquidstake/v1beta1/query.rpc.Query";
import * as _612 from "./liquidstakeibc/v1beta1/query.rpc.Query";
import * as _613 from "./lscosmos/v1beta1/query.rpc.Query";
import * as _614 from "./ratesync/v1beta1/query.rpc.Query";
import * as _615 from "./liquidstake/v1beta1/tx.rpc.msg";
import * as _616 from "./liquidstakeibc/v1beta1/msgs.rpc.msg";
import * as _617 from "./lscosmos/v1beta1/msgs.rpc.msg";
import * as _618 from "./ratesync/v1beta1/tx.rpc.msg";
import * as _696 from "./rpc.query";
import * as _697 from "./rpc.tx";
export namespace pstake {
  export namespace liquidstake {
    export const v1beta1 = {
      ..._303,
      ..._304,
      ..._305,
      ..._306,
      ..._603,
      ..._607,
      ..._611,
      ..._615
    };
  }
  export namespace liquidstakeibc {
    export const v1beta1 = {
      ..._307,
      ..._308,
      ..._309,
      ..._310,
      ..._311,
      ..._604,
      ..._608,
      ..._612,
      ..._616
    };
  }
  export namespace lscosmos {
    export const v1beta1 = {
      ..._312,
      ..._313,
      ..._314,
      ..._315,
      ..._316,
      ..._317,
      ..._605,
      ..._609,
      ..._613,
      ..._617
    };
  }
  export namespace ratesync {
    export const v1beta1 = {
      ..._318,
      ..._319,
      ..._320,
      ..._321,
      ..._322,
      ..._323,
      ..._606,
      ..._610,
      ..._614,
      ..._618
    };
  }
  export const ClientFactory = {
    ..._696,
    ..._697
  };
}