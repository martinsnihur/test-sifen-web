import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ],
  exports: [
    CommonModule,
    NavbarComponent,
    FooterComponent
  ]
})
export class SharedModule { }

/**
 * Export all components individually to support standalone component imports
 */
export { NavbarComponent } from './navbar/navbar.component';
export { FooterComponent } from './footer/footer.component';

// Note: For complete standalone migration, update NavbarComponent and FooterComponent 
// by adding 'standalone: true' to their @Component decorators and adding their 
// dependencies to their imports array.
