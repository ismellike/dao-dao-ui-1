import * as _369 from "./compute/v1beta1/genesis";
import * as _370 from "./compute/v1beta1/msg";
import * as _371 from "./compute/v1beta1/query";
import * as _372 from "./compute/v1beta1/types";
import * as _373 from "./emergencybutton/v1beta1/genesis";
import * as _374 from "./emergencybutton/v1beta1/params";
import * as _375 from "./emergencybutton/v1beta1/query";
import * as _376 from "./emergencybutton/v1beta1/tx";
import * as _377 from "./intertx/v1beta1/query";
import * as _378 from "./intertx/v1beta1/tx";
import * as _379 from "./registration/v1beta1/genesis";
import * as _380 from "./registration/v1beta1/msg";
import * as _381 from "./registration/v1beta1/query";
import * as _382 from "./registration/v1beta1/types";
import * as _654 from "./compute/v1beta1/msg.amino";
import * as _655 from "./emergencybutton/v1beta1/tx.amino";
import * as _656 from "./intertx/v1beta1/tx.amino";
import * as _657 from "./compute/v1beta1/msg.registry";
import * as _658 from "./emergencybutton/v1beta1/tx.registry";
import * as _659 from "./intertx/v1beta1/tx.registry";
import * as _660 from "./compute/v1beta1/query.rpc.Query";
import * as _661 from "./emergencybutton/v1beta1/query.rpc.Query";
import * as _662 from "./intertx/v1beta1/query.rpc.Query";
import * as _663 from "./registration/v1beta1/query.rpc.Query";
import * as _664 from "./compute/v1beta1/msg.rpc.msg";
import * as _665 from "./emergencybutton/v1beta1/tx.rpc.msg";
import * as _666 from "./intertx/v1beta1/tx.rpc.msg";
import * as _702 from "./rpc.query";
import * as _703 from "./rpc.tx";
export namespace secret {
  export namespace compute {
    export const v1beta1 = {
      ..._369,
      ..._370,
      ..._371,
      ..._372,
      ..._654,
      ..._657,
      ..._660,
      ..._664
    };
  }
  export namespace emergencybutton {
    export const v1beta1 = {
      ..._373,
      ..._374,
      ..._375,
      ..._376,
      ..._655,
      ..._658,
      ..._661,
      ..._665
    };
  }
  export namespace intertx {
    export const v1beta1 = {
      ..._377,
      ..._378,
      ..._656,
      ..._659,
      ..._662,
      ..._666
    };
  }
  export namespace registration {
    export const v1beta1 = {
      ..._379,
      ..._380,
      ..._381,
      ..._382,
      ..._663
    };
  }
  export const ClientFactory = {
    ..._702,
    ..._703
  };
}