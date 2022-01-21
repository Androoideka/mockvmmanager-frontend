import {AuthenticationResponse, UserResponse} from "./user-dto";
import {PermissionCarrier, PermissionList} from "./permission-model";

export class User {
  static fromLocalStorage(): User {
    const userId: string = localStorage.getItem('userId') ?? '';
    const email: string = localStorage.getItem('email') ?? '';
    const name: string = localStorage.getItem('name') ?? '';
    const surname: string = localStorage.getItem('surname') ?? '';
    const permissionList: PermissionCarrier = PermissionList.fromLocalStorage();
    return new User(Number(userId), email, '', name, surname, permissionList);
  }


  static fromResponse(userResponse: UserResponse): User {
    const permissionList: PermissionCarrier = PermissionList.fromResponse(userResponse.permissionListResponse);
    return new User(userResponse.userId, userResponse.email, userResponse.password, userResponse.name, userResponse.surname, permissionList);
  }

  static fromTemplate(userId: number, email: string, password: string, name: string, surname: string,
                      can_read_users: boolean,
                      can_create_users: boolean,
                      can_update_users: boolean,
                      can_delete_users: boolean): User {
    const permissionList: PermissionCarrier = PermissionList.fromValues(can_read_users, can_create_users, can_update_users, can_delete_users);
    return new User(userId, email, password, name, surname, permissionList);
  }

  constructor(public userId: number,
              public email: string,
              public password: string,
              public name: string,
              public surname: string,
              public permissionList: PermissionCarrier) {
  }

  toLocalStorage(): void {
    localStorage.setItem('userId', String(this.userId));
    localStorage.setItem('email', this.email);
    localStorage.setItem('name', this.name);
    localStorage.setItem('surname', this.surname);
    this.permissionList.toLocalStorage();
  }
}

export class Authentication {
  static fromLocalStorage(): Authentication {
    const token: string = localStorage.getItem('token') ?? '';
    const user: User = User.fromLocalStorage();
    return new Authentication(!!token, token, user);
  }

  static fromResponse(authenticationResponse: AuthenticationResponse) {
    return new Authentication(true,
      authenticationResponse.token,
      User.fromResponse(authenticationResponse.userResponse));
  }

  constructor(public authenticated: boolean,
              public token: string,
              public user: User) {
  }

  toLocalStorage(): void {
    localStorage.setItem('token', this.token);
    this.user.toLocalStorage();
  }
}

export interface UserPage {
  content: User[];
  totalPages: number;
}
