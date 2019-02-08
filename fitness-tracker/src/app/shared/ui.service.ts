import { Subject } from 'rxjs';
import { Inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class UIService {
    public loadingStateChanged = new Subject<boolean>();

    constructor(private snackBar: MatSnackBar){}

    showSnackBar(message, action, duration) {
        this.snackBar.open(message, action, {
            duration: duration
        });
    }
}