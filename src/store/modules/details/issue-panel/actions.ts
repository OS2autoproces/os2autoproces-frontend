import { ActionTree } from "vuex";
import { IssuePanel } from "@/store/modules/details/issue-panel/state";
import { RootState } from "@/store/store";
import { IssuePanelMutationTypes } from './mutations';

export const namespace = 'details/issuePanel';

export const issuePanelActionTypes = {
    UPDATE_ISSUE_PANEL: `${namespace}/updateIssuePanel`,
}

export const actions: ActionTree<IssuePanel, RootState> = {
    updateIssuePanel({ commit }, payload: Partial<IssuePanel>) {
        commit(IssuePanelMutationTypes.UPDATE_ISSUE_PANEL, payload);
    }
}