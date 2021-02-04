import { Action, createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { SubmitCCDetails, SubmitCCDetailsSuccess } from './ccDetailsActions';
import { CCDetails, CCDetailsInitial } from "./ccDetailsModel";

export const initialState: CCDetailsInitial = {
    ccDetails: {
        ccNum: '',
        ccHolder: '',
        ccExpDate: '',
        ccCvv: '',
        ccAmt: 0
    }
};

const _ccDetailsReducer = createReducer(
    initialState,
    on(SubmitCCDetails, (state: any) => ({
        ...state
    })),
    on(SubmitCCDetailsSuccess, (state: any, { data }) => data
    )
);

export const selectCCDetails = createFeatureSelector<CCDetailsInitial, CCDetails>('ccDetails');

export const selectStateCCDetails = createSelector(
    selectCCDetails,
    (state) => ({ success: state })
);

export function ccDetailsReducer(state: CCDetailsInitial | undefined, action: Action) {
    return _ccDetailsReducer(state, action);
}