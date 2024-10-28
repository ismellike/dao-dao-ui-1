import * as _167 from "./denom/authorityMetadata";
import * as _168 from "./denom/genesis";
import * as _169 from "./denom/params";
import * as _170 from "./denom/query";
import * as _171 from "./denom/tx";
import * as _172 from "./oracle/genesis";
import * as _173 from "./oracle/oracle";
import * as _174 from "./oracle/query";
import * as _175 from "./oracle/tx";
import * as _176 from "./scheduler/genesis";
import * as _177 from "./scheduler/hook";
import * as _178 from "./scheduler/params";
import * as _179 from "./scheduler/proposal";
import * as _180 from "./scheduler/query";
import * as _511 from "./denom/tx.amino";
import * as _512 from "./oracle/tx.amino";
import * as _513 from "./denom/tx.registry";
import * as _514 from "./oracle/tx.registry";
import * as _515 from "./denom/query.rpc.Query";
import * as _516 from "./oracle/query.rpc.Query";
import * as _517 from "./scheduler/query.rpc.Query";
import * as _518 from "./denom/tx.rpc.msg";
import * as _519 from "./oracle/tx.rpc.msg";
import * as _688 from "./rpc.query";
import * as _689 from "./rpc.tx";
export namespace kujira {
  export const denom = {
    ..._167,
    ..._168,
    ..._169,
    ..._170,
    ..._171,
    ..._511,
    ..._513,
    ..._515,
    ..._518
  };
  export const oracle = {
    ..._172,
    ..._173,
    ..._174,
    ..._175,
    ..._512,
    ..._514,
    ..._516,
    ..._519
  };
  export const scheduler = {
    ..._176,
    ..._177,
    ..._178,
    ..._179,
    ..._180,
    ..._517
  };
  export const ClientFactory = {
    ..._688,
    ..._689
  };
}