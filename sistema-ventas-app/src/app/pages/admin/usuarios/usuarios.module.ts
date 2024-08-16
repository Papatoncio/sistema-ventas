import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios.component';
import { MaterialModule } from '../../../material.module';
import { UsuarioDialogComponent } from './components/usuario-dialog/usuario-dialog.component';

@NgModule({
  declarations: [UsuariosComponent, UsuarioDialogComponent],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class UsuariosModule {}
