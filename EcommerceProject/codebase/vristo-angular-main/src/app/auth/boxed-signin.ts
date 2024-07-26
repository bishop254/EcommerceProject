import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from 'src/app/service/app.service';
import { User } from '../store/Auth/User';

import * as AuthActions from '../store/Auth/auth.actions';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
    moduleId: module.id,
    templateUrl: './boxed-signin.html',
    animations: [
        trigger('toggleAnimation', [
            transition(':enter', [style({ opacity: 0, transform: 'scale(0.95)' }), animate('100ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))]),
            transition(':leave', [animate('75ms', style({ opacity: 0, transform: 'scale(0.95)' }))]),
        ]),
    ],
})
export class BoxedSigninComponent  implements OnInit {

    public form!: FormGroup;

    store: any;

    user: string | undefined;
    constructor(
        public fb: FormBuilder,
        public http: HttpClient,
        public translate: TranslateService, public storeData: Store<any>, public router: Router, private appSetting: AppService) {
        this.initStore();
    }
    async initStore() {
        this.storeData
            .select((d) => d.index)
            .subscribe((d) => {
                this.store = d;
            });
    }

    changeLanguage(item: any) {
        this.translate.use(item.code);
        this.appSetting.toggleLanguage(item);
        if (this.store.locale?.toLowerCase() === 'ae') {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'rtl' });
        } else {
            this.storeData.dispatch({ type: 'toggleRTL', payload: 'ltr' });
        }
        window.location.reload();
    }

    navigateToRespectiveLandingPage() {

        this.login(new User('Michael Mbugua', 'michael_mbugua@gmail.com'))

        if (this.user === 'Seller') {
            // this.router.navigate(['/sellers-landing-page'])
            this.router.navigate(['/sellers-account-settings-page'])
        } else {
            this.router.navigate(['/buyers-landing-page'])
        }

    }

    login(user: User) {
        // this.store.dispatch(AuthActions.login({ user }));


        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
            })
        };

        let model = {
            email: this.form.get('email')!.value,
            password: this.form.get('password')!.value,
        }

        return this.http.post(`http://102.23.120.135:4000/api/v1/login`, model, httpOptions)
            .subscribe((response: any) => {
                console.log('Logged In', response);
                localStorage.setItem("token", response.token);

                document.cookie = `token=${response.token};path=/;`;

            }, error => {
                console.error('Error:', error);
            });
    }

    logout(): void {
        this.store.dispatch(AuthActions.logout());
    }


    ngOnInit(){
        this.form = this.fb.group({
            userType: [''],
            email: [''],
            password: [''],
        });
    }

    userSelected($event: any) {
        this.user = $event?.target?.value;
    }


}
