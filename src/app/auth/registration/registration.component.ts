import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../shared/user/user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  form: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      name: new FormControl('', Validators.required),
      agree: new FormControl(false, Validators.requiredTrue),
    });
  }

  submit() {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }

    const newUser: User = {
      ...this.form.value
    };
    delete newUser['agree'];
    console.log(newUser);
    this.authService.registration(newUser)
      .subscribe(() => {
          this.router.navigate(['login'], {
            queryParams: {
              isRegistered: true
            }
          });
        }
      );
  }
}
