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
  constructor(public email: string,
              public password: string,
              public name: string,
              public surname: string,
              public permissionListDTO: Permissions) {
  }
}

export class Permissions {
  private readonly permissionValues: boolean[];

  constructor(can_read_users: boolean,
              can_create_users: boolean,
              can_update_users: boolean,
              can_delete_users: boolean) {
    this.permissionValues = [can_create_users, can_read_users, can_update_users, can_delete_users];
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
