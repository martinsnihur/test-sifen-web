import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

type TabType = 'integration' | 'validation' | 'notifications' | 'reporting' | 'compliance';

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule, NgbModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent {
  isBrowser: boolean;
  activeTab: TabType = 'integration';

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setActiveTab(tab: TabType): void {
    this.activeTab = tab;
  }

  isActiveTab(tab: TabType): boolean {
    return this.activeTab === tab;
  }

  codeExample = `const response = await fetch('https://api.sifen.com/v1/invoices', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({})
});`;
}
