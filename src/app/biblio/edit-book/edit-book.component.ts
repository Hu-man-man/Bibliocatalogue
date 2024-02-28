import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  standalone: true,
  imports: [],
  templateUrl: './edit-book.component.html',
  styles: ``
})
export class EditBookComponent {
  constructor(private router: ActivatedRoute) {}

  ngOnInit() {

  }
}
