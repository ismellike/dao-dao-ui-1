import * as _342 from "./data/v1/events";
import * as _343 from "./data/v1/state";
import * as _344 from "./data/v1/tx";
import * as _345 from "./data/v1/types";
import * as _346 from "./data/v2/events";
import * as _347 from "./data/v2/state";
import * as _348 from "./data/v2/tx";
import * as _349 from "./data/v2/types";
import * as _350 from "./ecocredit/basket/v1/events";
import * as _351 from "./ecocredit/basket/v1/state";
import * as _352 from "./ecocredit/basket/v1/tx";
import * as _353 from "./ecocredit/basket/v1/types";
import * as _354 from "./ecocredit/marketplace/v1/events";
import * as _355 from "./ecocredit/marketplace/v1/state";
import * as _356 from "./ecocredit/marketplace/v1/tx";
import * as _357 from "./ecocredit/marketplace/v1/types";
import * as _358 from "./ecocredit/orderbook/v1alpha1/memory";
import * as _359 from "./ecocredit/v1/events";
import * as _360 from "./ecocredit/v1/state";
import * as _361 from "./ecocredit/v1/tx";
import * as _362 from "./ecocredit/v1/types";
import * as _363 from "./ecocredit/v1alpha1/events";
import * as _364 from "./ecocredit/v1alpha1/genesis";
import * as _365 from "./ecocredit/v1alpha1/tx";
import * as _366 from "./ecocredit/v1alpha1/types";
import * as _367 from "./intertx/v1/query";
import * as _368 from "./intertx/v1/tx";
import * as _632 from "./data/v1/tx.amino";
import * as _633 from "./data/v2/tx.amino";
import * as _634 from "./ecocredit/basket/v1/tx.amino";
import * as _635 from "./ecocredit/marketplace/v1/tx.amino";
import * as _636 from "./ecocredit/v1/tx.amino";
import * as _637 from "./ecocredit/v1alpha1/tx.amino";
import * as _638 from "./intertx/v1/tx.amino";
import * as _639 from "./data/v1/tx.registry";
import * as _640 from "./data/v2/tx.registry";
import * as _641 from "./ecocredit/basket/v1/tx.registry";
import * as _642 from "./ecocredit/marketplace/v1/tx.registry";
import * as _643 from "./ecocredit/v1/tx.registry";
import * as _644 from "./ecocredit/v1alpha1/tx.registry";
import * as _645 from "./intertx/v1/tx.registry";
import * as _646 from "./intertx/v1/query.rpc.Query";
import * as _647 from "./data/v1/tx.rpc.msg";
import * as _648 from "./data/v2/tx.rpc.msg";
import * as _649 from "./ecocredit/basket/v1/tx.rpc.msg";
import * as _650 from "./ecocredit/marketplace/v1/tx.rpc.msg";
import * as _651 from "./ecocredit/v1/tx.rpc.msg";
import * as _652 from "./ecocredit/v1alpha1/tx.rpc.msg";
import * as _653 from "./intertx/v1/tx.rpc.msg";
import * as _700 from "./rpc.query";
import * as _701 from "./rpc.tx";
export namespace regen {
  export namespace data {
    export const v1 = {
      ..._342,
      ..._343,
      ..._344,
      ..._345,
      ..._632,
      ..._639,
      ..._647
    };
    export const v2 = {
      ..._346,
      ..._347,
      ..._348,
      ..._349,
      ..._633,
      ..._640,
      ..._648
    };
  }
  export namespace ecocredit {
    export namespace basket {
      export const v1 = {
        ..._350,
        ..._351,
        ..._352,
        ..._353,
        ..._634,
        ..._641,
        ..._649
      };
    }
    export namespace marketplace {
      export const v1 = {
        ..._354,
        ..._355,
        ..._356,
        ..._357,
        ..._635,
        ..._642,
        ..._650
      };
    }
    export namespace orderbook {
      export const v1alpha1 = {
        ..._358
      };
    }
    export const v1 = {
      ..._359,
      ..._360,
      ..._361,
      ..._362,
      ..._636,
      ..._643,
      ..._651
    };
    export const v1alpha1 = {
      ..._363,
      ..._364,
      ..._365,
      ..._366,
      ..._637,
      ..._644,
      ..._652
    };
  }
  export namespace intertx {
    export const v1 = {
      ..._367,
      ..._368,
      ..._638,
      ..._645,
      ..._646,
      ..._653
    };
  }
  export const ClientFactory = {
    ..._700,
    ..._701
  };
}