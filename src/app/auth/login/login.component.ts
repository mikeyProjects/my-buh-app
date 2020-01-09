import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NotificationService } from '../../shared/components/notification/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['isRegistered']) {
          this.notificationService.open('success', 'Вы были успешно зарегистрированы. Пожалуйста, авторизуйтесь!');
        }
      }
    );

    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    const credentials = this.form.value;
    this.authService.login(credentials).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(() => {
        this.router.navigate(['/registration']);
      },
        (error => {
          console.log(error.message);
          this.notificationService.open('error', error.message);
        }));
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
