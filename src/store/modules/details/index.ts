import { DetailsState } from '@/store/modules/details/state';
import { Module } from 'vuex';
import { RootState } from '@/store/store';
import { generalInformation } from '@/store/modules/details/general-information';
import { actions } from '@/store/modules/details/actions';
import { issuePanel } from '@/store/modules/details/issue-panel';

const namespaced = true;

export const state: DetailsState = {
    // empty for now
}

export const details: Module<DetailsState, RootState> = {
    namespaced,
    actions,
    modules: {
        generalInformation,
        issuePanel
    }
}