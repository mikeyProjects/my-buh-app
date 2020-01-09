import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NotificationModule } from './components/notification/notification.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NotificationModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    NotificationModule
  ]
})
export class SharedModule {

}
