import { Exercise } from './exercise.model';
import { Subject, Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UIService } from 'src/app/shared/ui.service';

@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>();
    exercisesChanged = new Subject<Exercise[]>();
    finishedExercisesChanged = new Subject<Exercise[]>();
    private availableExercises: Exercise[] = [];
    private fbSubs: Subscription[] = [];
    private runningExercise: Exercise;

    constructor(private db: AngularFirestore,
        private uiService: UIService) {

    }
    fetchAvailableExercices() {
        this.uiService.loadingStateChanged.next(true);
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
            this.uiService.loadingStateChanged.next(false);
            this.availableExercises = exercises;
            this.exercisesChanged.next([...this.availableExercises]);
        }, error => {
            this.uiService.loadingStateChanged.next(false);
            this.uiService.showSnackBar("Fetching exercises failed. Please try again later", null, 3000);
            this.exercisesChanged.next(null);
        }));
    }

    startExercise(selectedId: string) {
        // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()}); // this will add new field on the current doc
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
        this.exerciseChanged.next({ ...this.runningExercise } )
    }

    getRunningExercise(){
        return { ...this.runningExercise };
    }

    completeExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: "completed"});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({ 
            ...this.runningExercise, 
            date: new Date(), 
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            state: "cancelled"});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    fetchCompleteOrCancelledExercises() {
        this.fbSubs.push(this.db.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
            this.finishedExercisesChanged.next(exercises);
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