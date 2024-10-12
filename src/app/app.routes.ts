import { Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';

export const routes: Routes = [
    
    { path: '',title:"Book List", component: BookListComponent },  
    { path: "book-list", component: BookListComponent },
    
    
];
