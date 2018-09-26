import { Kle, Form } from '@/store/modules/common/actions';
import { ITSystem, OrgUnit, Technology } from '@/store/modules/process/state';
import { User } from '@/store/modules/auth/state';

export interface CommonState {
  frontPage: string;
  itSystems: ITSystem[];
  technologies: Technology[];
  kles: Kle[];
  forms: Form[];
  orgUnits: OrgUnit[];
  users: User[];
}
