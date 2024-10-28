import * as _159 from "./feeshare/v1/feeshare";
import * as _160 from "./feeshare/v1/genesis";
import * as _161 from "./feeshare/v1/query";
import * as _162 from "./feeshare/v1/tx";
import * as _163 from "./mint/genesis";
import * as _164 from "./mint/mint";
import * as _165 from "./mint/query";
import * as _166 from "./mint/tx";
import * as _503 from "./feeshare/v1/tx.amino";
import * as _504 from "./mint/tx.amino";
import * as _505 from "./feeshare/v1/tx.registry";
import * as _506 from "./mint/tx.registry";
import * as _507 from "./feeshare/v1/query.rpc.Query";
import * as _508 from "./mint/query.rpc.Query";
import * as _509 from "./feeshare/v1/tx.rpc.msg";
import * as _510 from "./mint/tx.rpc.msg";
import * as _686 from "./rpc.query";
import * as _687 from "./rpc.tx";
export namespace juno {
  export namespace feeshare {
    export const v1 = {
      ..._159,
      ..._160,
      ..._161,
      ..._162,
      ..._503,
      ..._505,
      ..._507,
      ..._509
    };
  }
  export const mint = {
    ..._163,
    ..._164,
    ..._165,
    ..._166,
    ..._504,
    ..._506,
    ..._508,
    ..._510
  };
  export const ClientFactory = {
    ..._686,
    ..._687
  };
}