import { ITSystem } from "@/store/modules/process/state";
import { Kle } from "@/store/modules/common/actions";
import { User } from "@/store/modules/auth/state";

export interface CommonState {
  frontPage: string;
  itSystems: ITSystem[];
  kles: Kle[];
  users: User[];
}
