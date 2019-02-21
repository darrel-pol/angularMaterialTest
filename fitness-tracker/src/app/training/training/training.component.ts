import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, from } from 'rxjs';
import { TrainingService } from './training.service';
import { Store, select } from '@ngrx/store';
import * as fromTraining from './training.reducer';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  onGoingTraining$: Observable<boolean>;

  constructor(private trainingService: TrainingService, private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.onGoingTraining$ = this.store.pipe(select(fromTraining.getIsTraining));
  }

}
