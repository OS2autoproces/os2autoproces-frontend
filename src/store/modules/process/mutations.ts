import { ProcessState, Technology } from '@/store/modules/process/state';
import { MutationTree } from 'vuex';
import { merge } from 'lodash';
import Vue from 'vue';
import { User } from '@/store/modules/auth/state';

export const processMutationTypes = {
  UPDATE: 'update',
  ASSIGN: 'assign',
  SAVE_COMMENTS: 'saveComments',
  ADD_ASSOCIATED_PERSON: 'addAssociatedPerson',
  REMOVE_ASSOCIATED_PERSON: 'removeAssociatedPerson',
  ADD_TECHNOLOGY: 'addTechnology',
  REMOVE_TECHNOLOGY: 'removeTechnology'
};

export const mutations: MutationTree<ProcessState> = {
  update(state: ProcessState, payload: Partial<ProcessState>) {
    merge(state, payload);
  },
  assign(state: ProcessState, payload: Partial<ProcessState>) {
    Object.assign(state, payload);
  },
  saveComments(state: ProcessState, comments: Partial<ProcessState>) {
    Vue.set(state, 'comments', comments);
  },
  addAssociatedPerson(state: ProcessState, payload: User) {
    if (state.users) {
      state.users = [...state.users, payload];
    }
  },
  addTechnology(state: ProcessState, technology: Technology) {
    if (state.technologies) {
      state.technologies = [...state.technologies, technology];
    }
  },
  removeAssociatedPerson(state: ProcessState, payload: User) {
    if (state.users) {
      state.users = state.users.filter(user => user.name !== payload.name);
    }
  },
  removeTechnology(state: ProcessState, index: number) {
    if (state.technologies) {
      state.technologies = state.technologies.filter((_, i) => i !== index);
    }
  }
};
