import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

import * as fromRoot from '../../app.reducer';
import * as fromTraining from './training.reducer';
import * as UI from '../../shared/ui.actions';
import * as Training from '../training/training.actions';
import { Store, select } from '@ngrx/store';


@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];
    private runningExercise: Exercise;

    constructor(private db: AngularFirestore,
        private uiService: UIService,
        private store: Store<fromTraining.State>
    ) {
    }
    fetchAvailableExercices() {
        this.store.dispatch(new UI.StartLoading());
        this.fbSubs.push(this.db
            .collection('availableExercises')
            .snapshotChanges()
            .pipe(map(docArray => {
                //  throw(new Error()); this is to test fetch again button
                return docArray.map(doc => {
                    return {
                        id: doc.payload.doc.id,
                        ...doc.payload.doc.data()
                    };
                });
            }
            )).subscribe((exercises: Exercise[]) => {
                this.store.dispatch(new UI.StopLoading());
                // this.availableExercises = exercises;
                // this.exercisesChanged.next([...this.availableExercises]);
                this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            }, error => {
                this.store.dispatch(new UI.StopLoading());
                this.uiService.showSnackBar("Fetching exercises failed. Please try again later", null, 3000);
                this.exercisesChanged.next(null);
            }));
    }

    startExercise(selectedId: string) {
        this.store.dispatch(new Training.StartTraining(selectedId));
    }

    completeExercise() {
        this.store.pipe(select(fromTraining.getActiveTraining), take(1)).subscribe(ex => {
            this.addDataToDatabase({ ...ex, date: new Date(), state: "completed" });
            this.store.dispatch(new Training.StopTraining());
        })
    }

    cancelExercise(progress: number) {
        this.store.pipe(select(fromTraining.getActiveTraining), take(1)).subscribe(ex => {
            this.addDataToDatabase({
                ...ex,
                date: new Date(),
                duration: ex.duration * (progress / 100),
                calories: ex.calories * (progress / 100),
                state: "cancelled"
            });
            this.store.dispatch(new Training.StopTraining());
        })
    }

    fetchCompleteOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
        }));
    }

    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise);
    }

    cancelSubscriptions() {
        this.fbSubs.forEach(sub => {
            sub.unsubscribe();
        });
    }

} 