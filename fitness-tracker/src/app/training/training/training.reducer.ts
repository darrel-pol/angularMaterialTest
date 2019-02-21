import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { TrainingActions, SET_AVAILABLETRAININGS, SET_FINISHEDTRAININGS, STOP_TRAINING, START_TRAINING } from './training.actions';
import { state } from '@angular/animations';
import { Exercise } from './exercise.model';
import * as fromRoot from '../../app.reducer';

export interface TrainingState {
    availableExercises: Exercise[];
    finishedExercises: Exercise[];
    activeTraining: Exercise;
}

export interface State extends fromRoot.State {
    training: TrainingState
}


export const initialState: TrainingState = {
    availableExercises: [],
    finishedExercises: [],
    activeTraining: null
}

export function trainingReducer(state = initialState, action: TrainingActions) {
    switch (action.type) {
        case SET_AVAILABLETRAININGS:
            return {
                ...state,
                availableExercises: action.payload
            }
        case SET_FINISHEDTRAININGS:
            return {
                ...state,
                finishedExercises: action.payload
            }
        case START_TRAINING:
            return {
                ...state,
                activeTraining: { ...state.availableExercises.find(ex => ex.id === action.payload) }
            }
        case STOP_TRAINING:
            return {
                ...state,
                activeTraining: null
            }
        default:
            return state;
    }
}

export const getTrainingState = createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(getTrainingState, (state: TrainingState) => state.availableExercises);
export const getFinishedExercises = createSelector(getTrainingState, (state: TrainingState) => state.finishedExercises);
export const getActiveTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining);
export const getIsTraining = createSelector(getTrainingState, (state: TrainingState) => state.activeTraining != null);

