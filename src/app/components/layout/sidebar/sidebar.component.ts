import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [
  {
    path: '/home',
    title: 'Home',
    icon: 'home',
    class: '',
  }

];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  isCollapsed = false;
  menuItems: any[];
  constructor(private router : Router) { 
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    
  }

  ngOnInit(): void {
    
  }
  clickToPage(page : string){
    this.router.navigate(["/"+page+""]);
  }
}
