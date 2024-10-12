import { Component, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, OnInit, model, ChangeDetectionStrategy } from '@angular/core';
import { BookServiceService } from '../../services/book-service.service';
import { Books } from '../../models/books';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, MatIconModule, MatDividerModule, MatButtonModule, RouterOutlet, DatePipe, FormsModule, MatSelectModule, MatFormFieldModule, MatRadioModule],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})


export class BookListComponent implements OnInit {

  labelPosition = "";
  books: Books[] = [];
  currentBook: Books = {};

  newBookObj: any = {
    "id": "",
    "isbn": "",
    "name": "",
    "bookAuthor": "",
    "copies": "",
    "category": "",
    "userId": ""
  }

  constructor(private bookServiceService: BookServiceService) { }

  seasons: string[] = ['Borrow', 'Return'];
  ngOnInit(): void {
    this.getBook();
  }

  onEdit(data: any) {
    this.newBookObj = data;
  }
  getBook() {
    this.bookServiceService.getAllBook().subscribe((res: any) => {
      debugger;
      this.books = res;
      //console.log('Service Data-->'+this.books);
    })
  }

  updateBook() {
    debugger;
    console.log('bookID-->' + this.newBookObj.id);
    console.log('userID-->' + this.newBookObj.userId);
    const bookID = this.newBookObj.id;
    const userID = this.newBookObj.userId;
    console.log('borrowTemp-->' + this.labelPosition);

    if (this.labelPosition != undefined && this.labelPosition == "Borrow") {

      // Call the service method to borrow the book
      this.bookServiceService.borrowBook(bookID, userID).subscribe(
        data => {
          console.log('Success:', JSON.stringify(data));
          alert("Borrowed Book Successfully");
          this.reloadPage();
          this.getBook();
        },
        error => {
          //console.error('Error:', error);
          console.log('Error###:', JSON.stringify(error));
          alert(error.error.description);
        }
      );
    } else if (this.labelPosition != undefined && this.labelPosition == "Return") {

      this.bookServiceService.returnBook(bookID, userID).subscribe(
        data => {
          console.log('Success:', JSON.stringify(data));
          alert("Returned Book Successfully");
          this.reloadPage();
          this.getBook();
        },
        error => {
          //console.error('Error:', error);
          console.log('Error###:', JSON.stringify(error));
          alert(error.error.description);
        }
      );

    } else {
      console.log('Error No API Call Happen@@@');
    }


  }

  reloadPage() {
    window.location.reload()
  }
}
