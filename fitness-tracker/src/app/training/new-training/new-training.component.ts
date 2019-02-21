import { Component, OnInit, OnDestroy } from '@angular/core';
import { TrainingService } from '../training/training.service';
import { Exercise } from '../training/exercise.model';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subject, Subscription, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training/training.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exerciseSubscription: Subscription;
  exercises$: Observable<Exercise[]>;
  isLoading$: Observable<boolean>;
  private loadingSubs: Subscription;
  constructor(private trainingService: TrainingService, private uiService: UIService, 
    private store: Store<fromTraining.State>) { }

  ngOnInit() {
    this.isLoading$ = this.store.pipe(select(fromRoot.getIsLoading));
    this.exercises$ = this.store.pipe(select(fromTraining.getAvailableExercises));
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercices();
  }

  onStartTraining(f: NgForm) {
    this.trainingService.startExercise(f.value.exercise);
  }
}
