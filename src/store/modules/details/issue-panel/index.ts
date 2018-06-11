import { IssuePanel } from "@/store/modules/details/issue-panel/state";
import { Module } from "vuex";
import { RootState } from "@/store/store";
import { actions } from "@/store/modules/details/issue-panel/actions";
import { mutations } from "@/store/modules/details/issue-panel/mutations";

const namespaced = true;

export const state: IssuePanel = {
    description: 'lorem',
}

export const issuePanel: Module<IssuePanel, RootState> = {
    namespaced,
    actions,
    mutations,
    state
}