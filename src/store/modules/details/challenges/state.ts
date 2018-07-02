export interface ChallengesState extends Challenges {
  disabled: boolean;
}

export interface Challenges {
  longDescription: string; // beskrivelse
  processChallenges: string; // nuværende proces udfordringer
  solutionRequests: string;
  itSystems: string; // enum KITOS
  created: string;
  lastChanged: string;
  decommissioned: string | null;
}
