import { Challenges } from "@/store/modules/details/challenges/state";
import { Module } from "vuex";
import { RootState } from "@/store/store";
import { actions } from "@/store/modules/details/challenges/actions";
import { mutations } from "@/store/modules/details/challenges/mutations";

const namespaced = true;

export const state: Challenges = {
    description: '',
    currentProcess: '',
    ideasSolution: '',
    challenges: '',
    currentProcessTitle: '',
    startDate: '',
    expectedEndDate: ''
}

export const challenges: Module<Challenges, RootState> = {
    namespaced,
    actions,
    mutations,
    state
}