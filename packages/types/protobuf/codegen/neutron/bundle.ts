import * as _181 from "./contractmanager/v1/failure";
import * as _182 from "./cron/genesis";
import * as _183 from "./cron/params";
import * as _184 from "./cron/query";
import * as _185 from "./cron/schedule";
import * as _186 from "./cron/tx";
import * as _187 from "./dex/deposit_record";
import * as _188 from "./dex/genesis";
import * as _189 from "./dex/limit_order_expiration";
import * as _190 from "./dex/limit_order_tranche_user";
import * as _191 from "./dex/limit_order_tranche";
import * as _192 from "./dex/pair_id";
import * as _193 from "./dex/params";
import * as _194 from "./dex/pool_metadata";
import * as _195 from "./dex/pool_reserves";
import * as _196 from "./dex/pool";
import * as _197 from "./dex/query";
import * as _198 from "./dex/tick_liquidity";
import * as _199 from "./dex/trade_pair_id";
import * as _200 from "./dex/tx";
import * as _201 from "./feeburner/genesis";
import * as _202 from "./feeburner/params";
import * as _203 from "./feeburner/query";
import * as _204 from "./feeburner/total_burned_neutrons_amount";
import * as _205 from "./feeburner/tx";
import * as _206 from "./feerefunder/fee";
import * as _207 from "./feerefunder/genesis";
import * as _208 from "./feerefunder/params";
import * as _209 from "./feerefunder/query";
import * as _210 from "./feerefunder/tx";
import * as _211 from "./interchainqueries/genesis";
import * as _212 from "./interchainqueries/params";
import * as _213 from "./interchainqueries/query";
import * as _214 from "./interchainqueries/tx";
import * as _215 from "./interchaintxs/v1/genesis";
import * as _216 from "./interchaintxs/v1/params";
import * as _217 from "./interchaintxs/v1/query";
import * as _218 from "./interchaintxs/v1/tx";
import * as _520 from "./cron/tx.amino";
import * as _521 from "./dex/tx.amino";
import * as _522 from "./feeburner/tx.amino";
import * as _523 from "./feerefunder/tx.amino";
import * as _524 from "./interchainqueries/tx.amino";
import * as _525 from "./interchaintxs/v1/tx.amino";
import * as _526 from "./cron/tx.registry";
import * as _527 from "./dex/tx.registry";
import * as _528 from "./feeburner/tx.registry";
import * as _529 from "./feerefunder/tx.registry";
import * as _530 from "./interchainqueries/tx.registry";
import * as _531 from "./interchaintxs/v1/tx.registry";
import * as _532 from "./cron/query.rpc.Query";
import * as _533 from "./dex/query.rpc.Query";
import * as _534 from "./feeburner/query.rpc.Query";
import * as _535 from "./feerefunder/query.rpc.Query";
import * as _536 from "./interchainqueries/query.rpc.Query";
import * as _537 from "./interchaintxs/v1/query.rpc.Query";
import * as _538 from "./cron/tx.rpc.msg";
import * as _539 from "./dex/tx.rpc.msg";
import * as _540 from "./feeburner/tx.rpc.msg";
import * as _541 from "./feerefunder/tx.rpc.msg";
import * as _542 from "./interchainqueries/tx.rpc.msg";
import * as _543 from "./interchaintxs/v1/tx.rpc.msg";
import * as _690 from "./rpc.query";
import * as _691 from "./rpc.tx";
export namespace neutron {
  export namespace contractmanager {
    export const v1 = {
      ..._181
    };
  }
  export const cron = {
    ..._182,
    ..._183,
    ..._184,
    ..._185,
    ..._186,
    ..._520,
    ..._526,
    ..._532,
    ..._538
  };
  export const dex = {
    ..._187,
    ..._188,
    ..._189,
    ..._190,
    ..._191,
    ..._192,
    ..._193,
    ..._194,
    ..._195,
    ..._196,
    ..._197,
    ..._198,
    ..._199,
    ..._200,
    ..._521,
    ..._527,
    ..._533,
    ..._539
  };
  export const feeburner = {
    ..._201,
    ..._202,
    ..._203,
    ..._204,
    ..._205,
    ..._522,
    ..._528,
    ..._534,
    ..._540
  };
  export const feerefunder = {
    ..._206,
    ..._207,
    ..._208,
    ..._209,
    ..._210,
    ..._523,
    ..._529,
    ..._535,
    ..._541
  };
  export const interchainqueries = {
    ..._211,
    ..._212,
    ..._213,
    ..._214,
    ..._524,
    ..._530,
    ..._536,
    ..._542
  };
  export namespace interchaintxs {
    export const v1 = {
      ..._215,
      ..._216,
      ..._217,
      ..._218,
      ..._525,
      ..._531,
      ..._537,
      ..._543
    };
  }
  export const ClientFactory = {
    ..._690,
    ..._691
  };
}