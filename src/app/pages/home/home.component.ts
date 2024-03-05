import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { UserCardComponent } from '../../components/user-card/usercard.component';
import { IData } from '../../interfaces/idata.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  usersServices = inject (UsersService)
  arrUsers : IUser [] = []
  page : number = 1
  totalPages : number = 1
  isDisabledPrev : boolean = true
  isDisabledNext : boolean = true

  // Importación con Observables.
  // una vez importados los datos verifico el numero de paginas para activar/desactivar la navegación entre páginas
  ngOnInit () {
    this.usersServices.getAll(this.page).subscribe((data: IData) => {
      this.arrUsers = data.results
      this.page = data.page
      this.totalPages = data.total_pages
      this.isDisabledNext = (this.page === this.totalPages) ? true : false
    } )
  }
  
  
  // Función para activar y desactivar los botones prev y next en función del numero de páginas y pagina actual
  changePage ($event:any) {
    if ($event.target.value === "prev"){
      this.page --
      this.usersServices.getAll(this.page).subscribe((data: IData) => {
        this.arrUsers = data.results})
        this.isDisabledPrev = (this.page === 1) ? true : false
        this.isDisabledNext = (this.page != this.totalPages) ? false : true
    }
    if ($event.target.value === "next"){
      this.page ++

      this.usersServices.getAll(this.page).subscribe((data: IData) => {
        this.arrUsers = data.results})

      this.isDisabledPrev = false
      this.isDisabledNext = (this.page === this.totalPages) ? true : false
    }
  }

  // Importación con promesas
  // async ngOnInit () {
  //   this.arrUsers = await this.usersServices.getAllPromises()
  // }

}
