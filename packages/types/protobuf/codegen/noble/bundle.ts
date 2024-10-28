import * as _383 from "../tariff/genesis";
import * as _384 from "../tariff/params";
import * as _385 from "../tariff/query";
import * as _667 from "../tariff/query.rpc.Query";
import * as _704 from "./rpc.query";
export namespace noble {
  export const tariff = {
    ..._383,
    ..._384,
    ..._385,
    ..._667
  };
  export const ClientFactory = {
    ..._704
  };
}