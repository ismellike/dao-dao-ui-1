import { Rpc } from "../../../helpers";
import { BinaryReader } from "../../../binary";
import { MsgGrant, MsgGrantResponse, MsgExec, MsgExecResponse, MsgRevoke, MsgRevokeResponse } from "./tx";
/** Msg defines the authz Msg service. */
export interface Msg {
  /**
   * Grant grants the provided authorization to the grantee on the granter's
   * account with the provided expiration time. If there is already a grant
   * for the given (granter, grantee, Authorization) triple, then the grant
   * will be overwritten.
   */
  grant(request: MsgGrant): Promise<MsgGrantResponse>;
  /**
   * Exec attempts to execute the provided messages using
   * authorizations granted to the grantee. Each message should have only
   * one signer corresponding to the granter of the authorization.
   */
  exec(request: MsgExec): Promise<MsgExecResponse>;
  /**
   * Revoke revokes any authorization corresponding to the provided method name on the
   * granter's account that has been granted to the grantee.
   */
  revoke(request: MsgRevoke): Promise<MsgRevokeResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.grant = this.grant.bind(this);
    this.exec = this.exec.bind(this);
    this.revoke = this.revoke.bind(this);
  }
  grant(request: MsgGrant, useInterfaces: boolean = true): Promise<MsgGrantResponse> {
    const data = MsgGrant.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Msg", "Grant", data);
    return promise.then(data => MsgGrantResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  exec(request: MsgExec, useInterfaces: boolean = true): Promise<MsgExecResponse> {
    const data = MsgExec.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Msg", "Exec", data);
    return promise.then(data => MsgExecResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
  revoke(request: MsgRevoke, useInterfaces: boolean = true): Promise<MsgRevokeResponse> {
    const data = MsgRevoke.encode(request).finish();
    const promise = this.rpc.request("cosmos.authz.v1beta1.Msg", "Revoke", data);
    return promise.then(data => MsgRevokeResponse.decode(new BinaryReader(data), undefined, useInterfaces));
  }
}