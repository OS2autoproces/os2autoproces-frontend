import { Module } from "vuex";
import { TimeAndProcess } from "@/store/modules/details/time-process/state";
import { RootState } from "@/store/store";
import { actions } from "@/store/modules/details/time-process/actions";
import { mutations } from "@/store/modules/details/time-process/mutations";

const namespaced = true;

const state: TimeAndProcess = {
    coWorkersUsingTheProcess: '',
    isCorporationAffected: '',
    isUserAffected: '',
    processRepetition: '',
    procesTimeConsumptionMinutes: '',
    procesTimeSavingMinutes: '',
    timeConsumptionComments: '',
    totalTimeConsumption: ''
}

export const timeAndProcess: Module<TimeAndProcess, RootState> = {
    namespaced,
    actions,
    mutations,
    state,
}