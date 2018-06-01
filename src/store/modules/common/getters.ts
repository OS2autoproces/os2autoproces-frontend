import { CommonState } from "./state";
import { RootState } from "@/store/store";
import { GetterTree } from "vuex";

export const getters: GetterTree<CommonState, RootState> = {
  networkCallsCount: (state: CommonState) => state.networkCalls
};
