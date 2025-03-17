import { Component, OnInit, HostListener } from '@angular/core';
import { NgbNavModule, NgbCollapseModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    NgbNavModule, 
    NgbCollapseModule, 
    NgbDropdownModule, 
    RouterModule, 
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isMenuCollapsed = true;
  isLoggedIn = false; // This would normally come from an auth service
  username = ''; // This would normally come from an auth service
  isScrolled = false;

  constructor() {}

  ngOnInit(): void {
    // Here you would typically inject an AuthService and subscribe to auth state
    // For demonstration purposes, we're just setting default values
    this.isLoggedIn = false;
    this.username = 'User';
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 20;
  }

  logout() {
    // Here you would call your auth service logout method
    this.isLoggedIn = false;
    // Redirect to home or login page
  }
}
