import { Component, Input } from '@angular/core';
import { CategorySidebar } from '../types';
import { RouterLink } from '@angular/router';
import { TitleCasePipe } from '@angular/common';
import { BsDropdownConfig, BsDropdownModule } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-menu-item',
  standalone: true,
  imports: [RouterLink, TitleCasePipe, BsDropdownModule],
  providers: [
    {
      provide: BsDropdownConfig,
      useValue: { isAnimated: true, autoClose: false },
    },
  ],
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss',
})
export class MenuItemComponent {
  @Input() categories: CategorySidebar[] = [];
}
