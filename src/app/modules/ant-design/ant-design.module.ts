import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports : [
    NzMenuModule,
    NzLayoutModule,
    NzIconModule,
    NzListModule,
    NzSkeletonModule,
    NzTableModule
  ]
})
export class AntDesignModule { }
