import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';
import { UserService } from './services/user.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss',
})
export class UsuariosComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private dialog: MatDialog, private userService: UserService) {}

  dataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayColumns: String[] = [
    'nombre',
    'apellidos',
    'username',
    'email',
    'rol',
    'acciones',
  ];

  usuarios: any;

  ngOnDestroy(): void {}

  ngOnInit(): void {
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  onOpenModal(user = {}): void {
    this.dialog
      .open(UsuarioDialogComponent, {
        maxWidth: '100%',
        width: '80%',
        data: { user },
      })
      .afterClosed()
      .subscribe(() => {
        this.getUsers();
      });
  }

  onConfirmDialog(user: any): void {
    const data = {
      id: parseInt(user.cveusuario),
    };

    this.dialog
      .open(ConfirmDialogComponent, {
        data: `¿Estas seguro de que deseas eliminar al usuario ${user.username}?`,
      })
      .afterClosed()
      .subscribe((confirmado: boolean) => {
        if (confirmado) {
          this.userService
            .deleteUser(data)
            .pipe()
            .subscribe((res) => {
              Swal.fire({
                title: 'Exitó',
                text: res,
                icon: 'success',
              }).then(() => {
                this.getUsers();
              });
            });
        } else {
          alert('Operación cancelada');
        }
      });
  }

  getUsers() {
    this.userService
      .getUsers()
      .pipe()
      .subscribe((res) => {
        this.usuarios = res;
        this.dataSource.data = this.usuarios;
      });
  }
}
