// import { Component, OnInit } from '@angular/core'
// import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
// import { User } from '../../shared/interfaces';
// import { AuthService } from '../shared/services/auth.service';
// import { ActivatedRoute, Router } from '@angular/router';

// @Component({
//   selector: 'app-login-page',
//   templateUrl: './register-page.component.html',
//   styleUrls: ['./register-page.component.scss']
// })
// export class RegisterPageComponent implements OnInit {
//   form!: FormGroup
//   submitted = false
//   message!: string

//   constructor(
//     public auth: AuthService,
//     private router: Router,
//     private route: ActivatedRoute
//   ) {
//   }

//   ngOnInit() {
//     this.form = new FormGroup({
//       email: new FormControl(null, [
//         Validators.required,
//         Validators.email
//       ]),
//       password: new FormControl(null, [
//         Validators.required,
//         Validators.minLength(6)
//       ]),
//       confirmPassword: new FormControl(null, [
//         Validators.required,
//       ])
//     })
//   }

//   submit() {
//     if(this.form.invalid) {
//       return
//     }

//     this.submitted = true

//     const user: User = {
//       email: this.form.value.email,
//       password: this.form.value.password
//     }

//     this.auth.register(user).subscribe(() => {
//       this.form.reset()
//       this.router.navigate(['/admin', 'login'])
//       this.submitted = false
//     }, () => {
//       this.submitted = false
//     })
//   }
// }

