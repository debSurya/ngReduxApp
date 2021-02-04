import { createAction, props } from "@ngrx/store";
import { CCDetails } from "./ccDetailsModel";

export const SubmitCCDetails = createAction('[CC Details API] Submit', props<{ data: CCDetails }>());
export const SubmitCCDetailsSuccess = createAction('[CC Details API] Submit Success', props<{ data: CCDetails }>());
export const ResetCCDetails = createAction('[CC Details] Reset');