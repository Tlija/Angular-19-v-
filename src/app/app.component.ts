import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'angular19v';

  url = 'https://fakestoreapi.com/products';
  products: any = [];
  productsResource: any = [];

  constructor(private http: HttpClient) {
    this.fetchProducts()
  }

  // fetchProducts() {
  //   this.http.get(this.url).subscribe((res) => {
  //     this.products = res
  //     console.log(this.products)
  //   })
  //
  // }

  fetchProducts() {

    this.productsResource = rxResource(
      {
        loader: () => {
          return this.http.get(this.url)
        }
      }
    )

  }

}
