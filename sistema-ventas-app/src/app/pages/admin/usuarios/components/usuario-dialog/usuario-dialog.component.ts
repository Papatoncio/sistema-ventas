import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BaseForm } from '../../../../../shared/utils/base-form';
import { Subject } from 'rxjs';
import { CustomValidator } from '../../../../../shared/utils/custom-validator';
import { UserService } from '../../services/user.service';
import Swal from 'sweetalert2';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-usuario-dialog',
  templateUrl: './usuario-dialog.component.html',
  styleUrls: ['./usuario-dialog.component.scss'], // Corrección: "styleUrl" -> "styleUrls"
})
export class UsuarioDialogComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>(); // Corrección: Renombrado a "destroy$" para mayor claridad y tipo más específico
  titleButton = 'Guardar';
  actionTodo = Action.NEW;
  roles = [
    { value: 1, viewValue: 'Administrador' },
    { value: 2, viewValue: 'Reportes' },
    { value: 3, viewValue: 'Ventas' },
  ];

  userForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    apellidos: ['', [Validators.required, Validators.minLength(3)]],
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    roles: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(5)]],
    confirmPassword: [
      '',
      [Validators.required, CustomValidator.passwordsAreEqual],
    ],
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    public baseForm: BaseForm,
    private userService: UserService,
    public dialogRef: MatDialogRef<UsuarioDialogComponent>
  ) {}

  ngOnInit(): void {
    this.patchData(); // Corrección: Método renombrado de "pathData" a "patchData"
  }

  patchData(): void {
    if (this.data?.user?.cveusuario) {
      // Actualizar
      this.titleButton = 'Actualizar';
      this.actionTodo = Action.EDIT;

      const roles = this.data.user.roles.map((rol: string) => {
        return this.roles.find((r) => r.viewValue === rol)?.value;
      });

      this.userForm.patchValue({
        nombre: this.data.user.nombre,
        apellidos: this.data.user.apellidos,
        username: this.data.user.username,
        email: this.data.user.email,
        roles: roles,
      });

      // Desactivar los campos username, password y confirmPassword al actualizar
      this.userForm.get('username')?.disable();
      this.userForm.get('password')?.disable();
      this.userForm.get('confirmPassword')?.disable();
    } else {
      // Insertar
      this.titleButton = 'Guardar';
      this.actionTodo = Action.NEW;

      // Asegurarse de que los campos estén habilitados para la creación
      this.userForm.get('username')?.enable();
      this.userForm.get('password')?.enable();
      this.userForm.get('confirmPassword')?.enable();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  sendForm() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;

      const data = {
        id: parseInt(this.data?.user?.cveusuario) ?? 0,
        nombre: formValue.nombre,
        apellidos: formValue.apellidos,
        username: formValue.username ?? '',
        email: formValue.email,
        pass: formValue.password ?? '',
        roles: formValue.roles,
      };

      console.log(data);

      if (this.data?.user?.cveusuario) {
        this.userService
          .updateUser(data)
          .pipe()
          .subscribe((res) => {
            Swal.fire({
              title: 'Exitó',
              text: res,
              icon: 'success',
            }).then(() => {
              this.dialogRef.close();
            });
          });
      } else {
        this.userService
          .insertUser(data)
          .pipe()
          .subscribe((res) => {
            Swal.fire({
              title: 'Exitó',
              text: res,
              icon: 'success',
            }).then(() => {
              this.dialogRef.close();
            });
          });
      }
    }
  }
}
