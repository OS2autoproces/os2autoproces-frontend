import { Domain, DomainKeys } from '@/models/domain';
import { LikertScale, LikertScaleKeys } from '@/models/likert-scale';
import { Phase, PhaseKeys } from '@/models/phase';
import { Status, StatusKeys } from '@/models/status';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { ITSystem, Link, OrgUnit, ProcessState, Technology } from '@/store/modules/process/state';
import { User } from '@/store/modules/auth/state';

export interface DatamodelProcess {
    localId: string | null;
    klId: string | null;
    esdhReference: string | null;
    phase: Phase;
    status: Status;
    statusText: string | null;
    
    created: Date | null;
    lastChanged: Date | null;
    decommissioned: Date | null;

    title: string;
    shortDescription: string;
    longDescription: string | null;
    domain: Domain;
    visibility: Visibility;

    legalClause: string | null;
    legalClauseLastVerified: string | null;
    kle: string | null;
    kla: string | null;
    links: Link[] | null;

    vendor: string | null;
    internalNotes: string | null;

    processChallenges: string | null;
    solutionRequests: string | null;

    timeSpendOccurancesPerEmployee: number;
    timeSpendPerOccurance: number;
    timeSpendEmployeesDoingProcess: number;
    timeSpendPercentageDigital: number;
    timeSpendComputedTotal: number;
    timeSpendComment: string;
    targetsCompanies: boolean;
    targestsCitizens: boolean;
    
    levelOfProfessionalAssessment: LikertScale;
    levelOfChange: LikertScale;
    levelOfStructuredInformation: LikertScale;
    levelOfUniformity: LikertScale;
    levelOfDigitalInformation: LikertScale;
    evaluatedLevelOfRoi: LikertScale;
    levelOfQuality: LikertScale;
    levelOfRoutineWorkReduction: LikertScale;
    levelOfSpeed: LikertScale;

    technicalImplementationNotes: string | null;
    organizationalImplementationNotes: string | null;
    
    rating: number | null;
    ratingComment: string | null;
    searchWords: string | null;

    // cvr: string;
    users: User[] | null;
    owner: User;
    contact: User;
    itSystems: ITSystem[] | null;
    orgUnits: OrgUnit[] | null;
    technologies: Technology[] | null;

}

function defaultNull(prop: any): any {
    return prop ? prop : null;
}

function defaultZero(prop: any) {
    return prop ? prop : 0;
}

export function convertToDatamodel(state: ProcessState): DatamodelProcess {
    return {
        localId: defaultNull(state.localId),
        klId: defaultNull(state.klId),
        esdhReference: defaultNull(state.esdhReference),
        phase: state.phase ? state.phase : PhaseKeys.IDEA,
        status: state.status ? state.status : StatusKeys.PENDING,
        statusText: defaultNull(state.statusText),
        created: defaultNull(state.created),
        lastChanged: defaultNull(state.lastChanged),
        decommissioned: defaultNull(state.decommissioned),
        title: state.title,
        shortDescription: state.shortDescription,
        longDescription: defaultNull(state.longDescription),
        domain: state.domain ? state.domain : DomainKeys.WORK,
        visibility: state.visibility ? state.visibility : VisibilityKeys.PERSONAL,
        legalClause: defaultNull(state.legalClause),
        legalClauseLastVerified: defaultNull(state.legalClauseLastVerified),
        kle: defaultNull(state.kle),
        kla: defaultNull(state.kla),
        links: defaultNull(state.links),
        vendor: defaultNull(state.vendor),
        internalNotes: defaultNull(state.internalNotes),
        processChallenges: defaultNull(state.processChallenges),
        solutionRequests: defaultNull(state.solutionRequests),
        timeSpendComputedTotal: defaultZero(state.timeSpendComputedTotal),
        timeSpendEmployeesDoingProcess: defaultZero(state.timeSpendEmployeesDoingProcess),
        timeSpendOccurancesPerEmployee: defaultZero(state.timeSpendOccurancesPerEmployee),
        timeSpendPercentageDigital: defaultZero(state.timeSpendPercentageDigital),
        timeSpendPerOccurance: defaultZero(state.timeSpendPerOccurance),
        timeSpendComment: state.timeSpendComment,
        targetsCompanies: state.targetsCompanies,
        targestsCitizens: state.targestsCitizens,
        levelOfProfessionalAssessment: state.levelOfProfessionalAssessment ? state.levelOfProfessionalAssessment : LikertScaleKeys.UNKNOWN,
        levelOfChange: state.levelOfChange ? state.levelOfChange : LikertScaleKeys.UNKNOWN,
        levelOfDigitalInformation: state.levelOfDigitalInformation ? state.levelOfDigitalInformation : LikertScaleKeys.UNKNOWN,
        levelOfStructuredInformation: state.levelOfStructuredInformation ? state.levelOfStructuredInformation: LikertScaleKeys.UNKNOWN,
        levelOfUniformity: state.levelOfUniformity ? state.levelOfUniformity: LikertScaleKeys.UNKNOWN,
        evaluatedLevelOfRoi: state.evaluatedLevelOfRoi ? state.evaluatedLevelOfRoi: LikertScaleKeys.UNKNOWN,
        levelOfQuality: state.levelOfQuality ? state.levelOfQuality: LikertScaleKeys.UNKNOWN,
        levelOfSpeed: state.levelOfSpeed ? state.levelOfSpeed: LikertScaleKeys.UNKNOWN,
        levelOfRoutineWorkReduction: state.levelOfRoutineWorkReduction ? state.levelOfRoutineWorkReduction: LikertScaleKeys.UNKNOWN,

        technicalImplementationNotes: defaultNull(state.technicalImplementationNotes),
        organizationalImplementationNotes: defaultNull(state.organizationalImplementationNotes),
        rating: defaultNull(state.rating),
        ratingComment: defaultNull(state.ratingComment),
        // TODO: fix when brian returns
        // searchWords: defaultNull(state.searchWords),
        searchWords: '',
        

        contact: defaultNull(state.contact),

        owner: defaultNull(state.owner),
        orgUnits: defaultNull(state.orgUnits),
        users: defaultNull(state.users),
        technologies: defaultNull(state.technologies),
        itSystems: defaultNull(state.itSystems),
    }
}

// export function convertToStoreProcess(process: Process) {

// } 