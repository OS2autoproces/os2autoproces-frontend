import { CommonState } from "./state";
import { RootState } from "@/store/store";
import { Module } from "vuex";
import { actions } from "./actions";
import { getters } from "./getters";
import { mutations } from "./mutations";

const namespaced = true;

export const state: CommonState = {
  networkCalls: 0,
  frontPageMarkdown: '# Overskrift\n\nLorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium. Lorem ipsum dolor, sit amet consectetur adipisicing elit. Non porro ut deserunt nesciunt quidem sint ducimus labore quae dolorum consectetur cum minima, ipsam vero facere officia? Debitis temporibus repudiandae laudantium.'
};

export const common: Module<CommonState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations
};
