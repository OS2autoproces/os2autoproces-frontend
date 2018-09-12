import { Process } from '@/store/modules/process/state';

export interface ErrorState {
  processErrors: Array<keyof Process>;
  saveStatus: number | null;
}
