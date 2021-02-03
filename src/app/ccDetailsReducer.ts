import { Action, createReducer, createSelector, on } from "@ngrx/store";
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
    on(SubmitCCDetailsSuccess, (state: any, { data }) => {
        return { data };
    })
);

export const selectCCDetails = (state: CCDetailsInitial) => state.ccDetails;

export const selectStateCCDetails = createSelector(
    selectCCDetails,
    (state: CCDetails) => { success: state }
);

export const ccDetailsReducer = (state: any | undefined, action: Action) => {
    return _ccDetailsReducer(state, action);
}