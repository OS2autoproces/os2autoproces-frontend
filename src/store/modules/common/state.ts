import { ITSystem } from "@/store/modules/process/state";
import { Kle } from "@/store/modules/common/actions";

export interface CommonState {
  frontPage: string;
  itSystems: ITSystem[];
  kles: Kle[];
}
