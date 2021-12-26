import {PermissionList, PermissionListResponse} from "./user-model";

export interface Login {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  identifier: string;
  permissionListResponse: PermissionListResponse;
}

export class Authentication {
  static fromResponse(authenticationResponse: AuthenticationResponse) {
    return new Authentication(true,
      authenticationResponse.token,
      authenticationResponse.identifier,
      PermissionList.fromResponse(authenticationResponse.permissionListResponse));
  }

  constructor(public authenticated: boolean,
              public token: string,
              public identifier: string,
              public permissionList: PermissionList) {
  }
}
