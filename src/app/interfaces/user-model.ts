import {AuthenticationResponse, PermissionListResponse, UserResponse} from "./user-dto";

export var PERMISSION_REPRESENTATIONS: string[] = [
  'can_create_users',
  'can_read_users',
  'can_update_users',
  'can_delete_users'
]

export var PERMISSION_SHORT_VALUES: string[] = [
  'c',
  'r',
  'u',
  'd'
]

export class User {
  static fromLocalStorage(): User {
    const userId: string = localStorage.getItem('userId') ?? '';
    const email: string = localStorage.getItem('email') ?? '';
    const name: string = localStorage.getItem('name') ?? '';
    const surname: string = localStorage.getItem('surname') ?? '';
    const can_read_users: boolean = localStorage.getItem('can_read_users') === 'true';
    const can_create_users: boolean = localStorage.getItem('can_create_users') === 'true';
    const can_update_users: boolean = localStorage.getItem('can_update_users') === 'true';
    const can_delete_users: boolean = localStorage.getItem('can_delete_users') === 'true';
    const permissionList = PermissionList.fromValues(can_read_users, can_create_users, can_update_users, can_delete_users);
    return new User(Number(userId), email, '', name, surname, permissionList);
  }


  static fromResponse(userResponse: UserResponse): User {
    const permissionList = PermissionList.fromResponse(userResponse.permissionListResponse);
    return new User(userResponse.userId, userResponse.email, userResponse.password, userResponse.name, userResponse.surname, permissionList);
  }

  constructor(public userId: number,
              public email: string,
              public password: string,
              public name: string,
              public surname: string,
              public permissionList: PermissionList) {
  }

  toLocalStorage(): void {
    localStorage.setItem('userId', String(this.userId));
    localStorage.setItem('email', this.email);
    localStorage.setItem('name', this.name);
    localStorage.setItem('surname', this.surname);
    localStorage.setItem('can_read_users', String(this.permissionList.can_read_users));
    localStorage.setItem('can_create_users', String(this.permissionList.can_create_users));
    localStorage.setItem('can_update_users', String(this.permissionList.can_update_users));
    localStorage.setItem('can_delete_users', String(this.permissionList.can_delete_users));
  }
}

export class PermissionList {
  private readonly permissionValues: boolean[];

  static fromResponse(permissionResponse: PermissionListResponse): PermissionList {
    return new PermissionList(permissionResponse.permissionValues);
  }

  static fromValues(can_read_users: boolean,
                    can_create_users: boolean,
                    can_update_users: boolean,
                    can_delete_users: boolean): PermissionList {
    const permissionValues = [can_create_users, can_read_users, can_update_users, can_delete_users];
    return new PermissionList(permissionValues);
  }

  constructor(permissionValues: boolean[]) {
    this.permissionValues = permissionValues;
  }

  get can_read_users(): boolean {
    return this.permissionValues[1];
  }

  get can_create_users(): boolean {
    return this.permissionValues[0];
  }

  get can_update_users(): boolean {
    return this.permissionValues[2];
  }

  get can_delete_users(): boolean {
    return this.permissionValues[3];
  }

  set can_read_users(value: boolean) {
    this.permissionValues[1] = value;
  }

  set can_create_users(value: boolean) {
    this.permissionValues[0] = value;
  }

  set can_update_users(value: boolean) {
    this.permissionValues[2] = value;
  }

  set can_delete_users(value: boolean) {
    this.permissionValues[3] = value;
  }

  get shortDisplay(): string {
    let display: string = '';
    for (let i = 0; i < this.permissionValues.length; i++) {
      if (this.permissionValues[i]) {
        display += PERMISSION_SHORT_VALUES[i];
      } else {
        display += '-';
      }
    }
    return display;
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
