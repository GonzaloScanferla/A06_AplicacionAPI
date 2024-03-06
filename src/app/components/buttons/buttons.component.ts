import { Component, Input} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.css'
})
export class ButtonsComponent {
  @Input() parent : string = ""
  @Input () currentUserId : string = ""


  deleteUser (currentUserId : string) {
    alert ("Seguro que quieres borrar?")
    // pendiente añadir componente para el mensaje de alerta con botones y eventos personalizados
  }
}
