import { RootState } from "@/store/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { CommonState } from "./state";

const namespaced = true;

export const state: CommonState = {
  frontPageMarkdown: ''
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
