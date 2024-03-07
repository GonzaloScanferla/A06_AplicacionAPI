import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  usersServices = inject (UsersService)
  activatedRoute = inject (ActivatedRoute)
  router = inject (Router)

  inputForm : FormGroup
  error : boolean = false
  currentUser !: IUser
  newUser !: any

  constructor () {

    // inicialización de los validadores del formulario
    this.inputForm = new FormGroup ({
      first_name: new FormControl (null,[
        Validators.required,
        Validators.minLength(3)
      ]),
      last_name: new FormControl (null,[
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl (null,[
        Validators.required,
        Validators.pattern(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)   /* validación del patrón de email */
      ]),
      image: new FormControl (null,[
        Validators.required,
      ]),
    },[])
  }


  // recogemos el input del formulario para realizar el insert en el servicio
  getDataForm () :void {
    // Creo automaticamente el username como first_name.last_name eliminando espacios y en minúsculas
    let username = (this.inputForm.value.first_name + "." + this.inputForm.value.last_name).replace(/\s/g,'').toLowerCase()

    // recibo el input del form y añado el username creado automaticamente
    this.newUser = this.inputForm.value
    this.newUser ['username'] = username

    this.usersServices.createNewUser(this.newUser).subscribe ((response:any) =>{
      if (response.id) {
        alert (`El usuario ${response.first_name} ${response.last_name} se ha añadido correctamente`)
        // Tras la inserción redirecciono a /home
        this.router.navigate(['/home'])
      } else {
        alert ("Ha habido un problema! \nNo se ha creado el nuevo usuario")
      }
    })
  }



  // Función para la validación de los elementos del formulario

  checkControl (formControlName : string, validator:string) : boolean | undefined {
    return this.inputForm.get(formControlName)?.hasError(validator) && (this.inputForm.get(formControlName)?.touched)
  }

  // ngOnInit () {
  //   this.activatedRoute.params.subscribe((params:any) =>{
  //     let currentUrl = params.url
  //     this.usersServices.getById(currentUrl).subscribe((data:any) => {
  //       console.log (data)
  //       if (data.error !== undefined) {
  //         this.error = true
  //       } else {
  //         this.error = false
  //         this.inputForm.setValue (data)
  //       }

  //     // let response = this.usersService.getById (currentUrl)
  //     // console.log (response)
  //     })
  //   })
  // }
}


