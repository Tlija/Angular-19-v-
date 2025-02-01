import {Component, linkedSignal, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from '@angular/common';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ HttpClientModule],
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


  // Signal source
  selectedUser = signal<any>({
    name: 'ana'
  });

  // Signal lié qui se réinitialise quand l'utilisateur change
  itemsPerPage = linkedSignal({
    source: this.selectedUser,
    computation: () => 10, // Valeur par défaut
  });

  updateItemsPerPage(value: number) {
    this.itemsPerPage.set(value);
  }

  changeUser() {
    this.selectedUser.set({
      name: 'ben'
    })
  }

}
