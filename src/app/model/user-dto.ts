import {PermissionListResponse} from "./permission-model";

export interface UserResponse {
  userId: number,
  email: string,
  password: string,
  name: string,
  surname: string,
  permissionListResponse: PermissionListResponse
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthenticationResponse {
  token: string;
  userResponse: UserResponse;
}

export interface UserPageResponse {
  content: UserResponse[],
  totalPages: number;
}
