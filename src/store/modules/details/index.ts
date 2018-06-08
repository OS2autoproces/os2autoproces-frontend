import { DetailsState } from '@/store/modules/details/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { generalInformation } from '@/store/modules/details/general-information';
import { actions } from '@/store/modules/details/actions';

export const state: DetailsState = {
    // empty for now
}

export const details: Module<DetailsState, RootState> = {
    actions,
    modules: {
        generalInformation
    }
}