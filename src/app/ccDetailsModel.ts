export interface CCDetailsInitial {
    ccDetails: CCDetails;
}

export interface CCDetails {
    ccNum: string;
    ccHolder: string;
    ccExpDate: string;
    ccCvv: string;
    ccAmt: number;
    new?: boolean;
};