import { RootState } from "@/store/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { CommonState } from "./state";

const namespaced = true;

export const state: CommonState = {
  frontPage: '',
  itSystems: [],
  kles: [],
  users: [],
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  mutations
};
