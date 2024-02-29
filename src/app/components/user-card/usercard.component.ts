import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './usercard.component.html',
  styleUrl: './usercard.component.css'
})
export class UserCardComponent {
  @Input () currentUser : IUser |any

  deleteUser () {
    alert ("Seguro que quieres borrar?")
    // pendiente añadir componente para el mensaje de alerta con botones y eventos personalizados
  }
}
