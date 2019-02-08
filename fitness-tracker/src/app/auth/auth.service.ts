import { Subject, from } from "rxjs";
import { User } from './user.model';
import { AuthData } from './auth-data';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { TrainingService } from '../training/training/training.service';
import { MatSnackBar } from '@angular/material';
import { UIService } from '../shared/ui.service';
@Injectable()
export class AuthService {
    authChange = new Subject<boolean>();
    private user: User;
    private isAuthenticated: boolean;

    constructor(
        private router: Router, 
        private afAuth: AngularFireAuth, 
        private trainingService: TrainingService,
        private snackBar: MatSnackBar,
        private uiService: UIService
        ){}

    initAuthListener(){
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.isAuthenticated = true;
                this.authChange.next(true);
                this.router.navigate(['/training']);
            }
            else {
                this.trainingService.cancelSubscriptions();
                this.authChange.next(false);
                this.router.navigate(['/login']);
                this.isAuthenticated = false;
            }
        });
    }

    registerUser(authData: AuthData){
        this.uiService.loadingStateChanged.next(true);        
        this.afAuth.auth
        .createUserWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);            
            console.log(result);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    login(authData: AuthData) {
        this.uiService.loadingStateChanged.next(true);
        this.afAuth
        .auth
        .signInWithEmailAndPassword(authData.email, authData.password)
        .then(result => {
            this.uiService.loadingStateChanged.next(false);
        })
        .catch(error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar(error.message, null, 3000);
        });
    }

    logout() {
        this.afAuth.auth.signOut();
    }

    getUser() {
        return { ...this.user };
    }

    isAuth(){
        return this.isAuthenticated;
    }
}