import { RootState } from "@/store/store";
import { GetterTree } from "vuex";
import { CommonState } from "./state";
import { namespace } from "@/store/modules/common/actions";

export interface ItSystemItem {
    value: any;
    text: string;
}

export const commonGetterTypes = {
    MAPPED_IT_SYSTEMS: `${namespace}/mappedItSystems`
}

export const getters: GetterTree<CommonState, RootState> = {
};
