import { Action } from '@ngrx/store';
import { START_LOADING, UIActions, StopLoading, STOP_LOADING } from './ui.actions';
import { state } from '@angular/animations';

export interface State {
    isLoading: boolean
}

const initialState: State = {
    isLoading: false
}

export function uiReducer(state = initialState, action: UIActions) {
    switch(action.type)
    {
        case START_LOADING:
            return {
                isLoading: true
            }
        case STOP_LOADING:
            return {
                isLoading: false
            }
        default:
            return state;
    }
}

export const getIsLoading = (state: State) => state.isLoading;