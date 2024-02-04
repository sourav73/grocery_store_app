import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { ListOutput } from '../../common/types/responses';
import { CategorySidebar } from './types';
import { CategoryService } from './category.service';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MenuItemComponent } from './menu-item/menu-item.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AsyncPipe, RouterLink, TitleCasePipe, MenuItemComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent implements OnInit {
  categoryService = inject(CategoryService);
  ngUnsubscribe$: Subject<void> = new Subject();
  categories$: Observable<ListOutput<CategorySidebar>> = new Observable();

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();
  }
}
