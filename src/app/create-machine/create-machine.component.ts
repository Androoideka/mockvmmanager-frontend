import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {Observer} from "rxjs";
import {Machine, MachineCreateRequest} from "@model/machine-model";
import {MachineManagementService} from "@services/machine-management.service";

@Component({
  selector: 'app-create-machine',
  templateUrl: './create-machine.component.html',
  styleUrls: ['./create-machine.component.css']
})
export class CreateMachineComponent implements OnInit {

  formGroup: UntypedFormGroup;
  created: boolean;
  machineName: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private machineManagementService: MachineManagementService) {
    this.formGroup = new UntypedFormGroup({});
    this.created = false;
    this.machineName = "";
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name_input: ['', Validators.required],
    });
  }

  get name(): string {
    return this.formGroup.get('name_input')?.value;
  }

  createMachine(): void {
    this.created = false;
    if(!this.formGroup.valid) {
      alert('Please fill in the fields correctly.');
      return;
    }
    const machine: MachineCreateRequest = {
      name: this.name
    }
    const createObserver: Observer<Machine> = {
      next: () => {
        this.created = true;
        this.machineName = machine.name;
      },
      error: err => alert(err),
      complete: () => {
      }
    }
    this.machineManagementService.createMachine(machine).subscribe(createObserver);
  }
}
