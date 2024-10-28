import * as _386 from "./abci/types";
import * as _387 from "./crypto/keys";
import * as _388 from "./crypto/proof";
import * as _389 from "./p2p/types";
import * as _390 from "./types/block";
import * as _391 from "./types/evidence";
import * as _392 from "./types/params";
import * as _393 from "./types/types";
import * as _394 from "./types/validator";
import * as _395 from "./version/types";
export namespace tendermint {
  export const abci = {
    ..._386
  };
  export const crypto = {
    ..._387,
    ..._388
  };
  export const p2p = {
    ..._389
  };
  export const types = {
    ..._390,
    ..._391,
    ..._392,
    ..._393,
    ..._394
  };
  export const version = {
    ..._395
  };
}