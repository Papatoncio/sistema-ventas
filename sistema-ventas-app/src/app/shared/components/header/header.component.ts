import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../../pages/auth/services/auth.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() toogleSidenav = new EventEmitter<void>();

  isLogged = false;
  data: any = {};
  private destroy$ = new Subject<any>();
  constructor(private authSvc: AuthService) {}

  ngOnInit(): void {
    // * Obtener la variable para indicar si tiene una sesión
    this.authSvc.isLogged$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isLogged: boolean) => {
        this.isLogged = isLogged;
      });

    // * Obtener información del usuario
    this.authSvc.tokenData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        console.log('Data:');
        console.log(data);
        this.data = data;
      });
  }

  onToogleSidenav() {
    this.toogleSidenav.emit();
  }

  onLogOut() {
    this.authSvc.logOut();
  }

  ngOnDestroy(): void {
    console.log('Metdodo Ondestroy');
    this.destroy$.next({});
    this.destroy$.complete();
  }
}
