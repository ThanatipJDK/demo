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
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  isCollapsed = false;
  menuItems: any=[];

  constructor(private router :Router) { }

  ngOnInit(): void {
    
    this.menuItems = ROUTES.filter((menuItem) => menuItem);
    console.log(this.menuItems);
   
    
  }
  clickToPage(page : string){
    this.router.navigate(["/"+page+""]);
  }
}