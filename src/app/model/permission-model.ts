export const PERMISSION_REPRESENTATIONS: string[] = [
  'can_create_users',
  'can_read_users',
  'can_update_users',
  'can_delete_users',
  'can_search_machines',
  'can_start_machines',
  'can_stop_machines',
  'can_restart_machines',
  'can_create_machines',
  'can_destroy_machines'
]

export const PERMISSION_NUMBER: number = PERMISSION_REPRESENTATIONS.length;

const PERMISSION_SHORT_VALUES: string[] = [
  'c',
  'r',
  'u',
  'd'
]

export interface PermissionListResponse {
  permissionValues: boolean[];
}

export class PermissionList {
  public readonly permissionValues: boolean[];

  static fromResponse(permissionResponse: PermissionListResponse): PermissionList & PermissionIndex {
    const permissionList = new PermissionList(permissionResponse.permissionValues);
    return PermissionList.create(permissionList);
  }

  static fromValues(permissionValues: boolean[]): PermissionCarrier {
    const permissionList = new PermissionList(permissionValues);
    return PermissionList.create(permissionList);
  }

  static fromRepresentations(representations: string[]): PermissionCarrier {
    const permissionValues: boolean[] = new Array(PERMISSION_NUMBER).fill(false);
    for(const representation of representations) {
      permissionValues[PERMISSION_REPRESENTATIONS.indexOf(representation)] = true;
    }
    const permissionList = new PermissionList(permissionValues);
    return PermissionList.create(permissionList);
  }

  static fromLocalStorage(): PermissionCarrier {
    const permissionValues: boolean[] = [];
    for(let i = 0; i < PERMISSION_NUMBER; i++) {
      const permission: boolean = localStorage.getItem(PERMISSION_REPRESENTATIONS[i]) === 'true';
      permissionValues.push(permission);
    }
    const permissionList = new PermissionList(permissionValues);
    return PermissionList.create(permissionList);
  }

  private static create(permissionList: PermissionList): PermissionCarrier {
    const perms = permissionList as PermissionCarrier;
    for(let i = 0; i < PERMISSION_NUMBER; i++) {
      perms[PERMISSION_REPRESENTATIONS[i]] = perms.permissionValues[i];
    }
    return perms;
  }

  private constructor(permissionValues: boolean[]) {
    this.permissionValues = permissionValues;
  }

  get no_permission(): boolean {
    for (let permission of this.permissionValues) {
      if(permission) return false;
    }
    return true;
  }

  get shortDisplay(): string {
    let display: string = '';
    for (let i = 0; i < 4; i++) {
      if (this.permissionValues[i]) {
        display += PERMISSION_SHORT_VALUES[i];
      } else {
        display += '-';
      }
    }
    return display;
  }

  get display(): string[] {
    const display: string[] = [];
    for(let i = 0; i < this.permissionValues.length; i++) {
      if(this.permissionValues[i]) {
        display.push(PERMISSION_REPRESENTATIONS[i]);
      }
    }
    return display;
  }

  toLocalStorage(): void {
    for(let i = 0; i < this.permissionValues.length; i++) {
      if(this.permissionValues[i]) {
        localStorage.setItem(PERMISSION_REPRESENTATIONS[i], String(this.permissionValues[i]));
      }
    }
  }

  includes(permissionList: PermissionList): boolean {
    for(let i = 0; i < permissionList.permissionValues.length; i++) {
      if(permissionList.permissionValues[i] && !this.permissionValues[i])
        return false;
    }
    return true;
  }
}

type Permission_Reps = typeof PERMISSION_REPRESENTATIONS[number];

type PermissionIndex = {
  [key: Permission_Reps]: boolean;
}

export type PermissionCarrier = PermissionList & PermissionIndex;

