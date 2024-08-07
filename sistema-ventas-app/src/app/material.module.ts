import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbar } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';

const myModules: any = [
  MatButtonModule,
  MatIconModule,
  MatToolbar,
  MatSidenavModule,
  MatListModule,
  MatCardModule,
  MatInputModule,
  MatSnackBarModule,
  MatMenuModule,
];

@NgModule({
  imports: [...myModules],
  exports: [...myModules],
})
export class MaterialModule {}
