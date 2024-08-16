import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  // * Variables globales
  menus: any[] = [];

  ngOnInit(): void {
    this.generarMenu();
  }
  constructor() {}

  private generarMenu(): void {
    this.menus.push(
      ...[
        { icon: 'home', name: 'Inicio', route: 'home' },
        { icon: 'person', name: 'Usuarios', route: 'admin/usuarios' },
        { icon: 'category', name: 'Categorias', route: 'admin/categorias' },
        { icon: 'inventory_2', name: 'Productos', route: 'admin/productos' },
        { icon: 'shopping_cart', name: 'Ventas', route: 'ventas/ventas' },
        { icon: 'assignment', name: 'Reportes', route: 'ventas/reportes' },
      ]
    );
  }
}
