import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/service.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  inputForm : FormGroup
  usersServices = inject (UsersService)
  activatedRoute = inject (ActivatedRoute)
  error : boolean = false
  currentUser !: IUser

  constructor () {

    // inicialización de los validadores del formulario
    this.inputForm = new FormGroup ({
      _id: new FormControl (null,[]),
      id: new FormControl (null,[]),
      username: new FormControl (null,[]),
      password: new FormControl (null,[]),
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
    // Creo el nombre de usuario como first_name.last_name eliminando espacios
    let username = (this.inputForm.value.first_name + "." + this.inputForm.value.last_name).replace(/\s/g,'').toLowerCase()
    
    // let msg : string = this.usersService.insertNewStudent(this.inputForm.value)
    // alert(msg)
    this.inputForm.reset()
  }

  // Función para la validación de los elementos del formulario

  checkControl (formControlName : string, validator:string) : boolean | undefined {
    return this.inputForm.get(formControlName)?.hasError(validator) && (this.inputForm.get(formControlName)?.touched)
  }

  ngOnInit () {
    this.activatedRoute.params.subscribe((params:any) =>{
      let currentUrl = params.url
      this.usersServices.getById(currentUrl).subscribe((data:any) => {
        console.log (data)
        if (data.error !== undefined) {
          this.error = true
        } else {
          this.error = false
          this.inputForm.setValue (data)
        }

      // let response = this.usersService.getById (currentUrl)
      // console.log (response)
      })
    })
  }
}


