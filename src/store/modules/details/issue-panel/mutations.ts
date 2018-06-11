import { MutationTree } from "vuex";
import { IssuePanel } from "@/store/modules/details/issue-panel/state";
import { merge } from "lodash";

export const IssuePanelMutationTypes = {
    UPDATE_ISSUE_PANEL: 'updateIssuePanel',
}

export const mutations: MutationTree<IssuePanel> = {
    updateIssuePanel(state: IssuePanel, payload: Partial<IssuePanel>) {
        state = merge(state, payload);
    }
}