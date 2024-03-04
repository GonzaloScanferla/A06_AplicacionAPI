import { Component, inject } from '@angular/core';
import { UsersService } from '../../services/service.service';
import { IUser } from '../../interfaces/iuser.interface';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  activatedRoute = inject (ActivatedRoute)
  userServices = inject (UsersService)
  currentUser !: IUser 

  ngOnInit ( ) : void {
    this.activatedRoute.params.subscribe ( (params:any) => {
      let currentId = params.url
      this.userServices.getById(currentId).subscribe((data:any) => {
        if (data!="error") {
          this.currentUser = data
          console.log (this.currentUser)
        } else {
          console.log (data.error)
        }
      })
    })
  }
}
