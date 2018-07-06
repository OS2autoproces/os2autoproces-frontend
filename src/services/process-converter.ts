import { Domain, DomainKeys } from '@/models/domain';
import { LikertScale, LikertScaleKeys } from '@/models/likert-scale';
import { Phase, PhaseKeys } from '@/models/phase';
import { Status, StatusKeys } from '@/models/status';
import { Visibility, VisibilityKeys } from '@/models/visibility';
import { ITSystem, Link, OrgUnit, ProcessState, Technology, Process } from '@/store/modules/process/state';
import { User } from '@/store/modules/auth/state';
import { DateTime } from 'luxon';

export interface ProcessRequest {
    localId: string | null;
    klId: string | null;
    esdhReference: string | null;
    phase: Phase;
    status: Status;
    statusText: string | null;

    created: string | null;
    lastChanged: string | null;
    decommissioned: string | null;

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

export interface ProcessResponse extends ProcessRequest {
    id: number;
    klaProcess: boolean;
    cvr: string;
    municipalityName: string;
    hasBookmarked: boolean;
    canEdit: boolean;
}

function defaultNull(prop: any): any {
    return prop || null;
}

function defaultZero(prop: any) {
    return prop ? Number(prop) : 0;
}

export function stateToRequest(state: ProcessState): ProcessRequest {
    return {
        localId: defaultNull(state.localId),
        klId: defaultNull(state.klId),
        esdhReference: defaultNull(state.esdhReference),
        phase: state.phase || PhaseKeys.IDEA,
        status: state.status || StatusKeys.PENDING,
        statusText: defaultNull(state.statusText),
        created: defaultNull(state.created),
        lastChanged: defaultNull(state.lastChanged),
        decommissioned: defaultNull(state.decommissioned),
        title: state.title,
        shortDescription: state.shortDescription,
        longDescription: defaultNull(state.longDescription),
        domain: state.domain || DomainKeys.WORK,
        visibility: state.visibility || VisibilityKeys.PERSONAL,
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
        levelOfProfessionalAssessment: state.levelOfProfessionalAssessment || LikertScaleKeys.UNKNOWN,
        levelOfChange: state.levelOfChange || LikertScaleKeys.UNKNOWN,
        levelOfDigitalInformation: state.levelOfDigitalInformation || LikertScaleKeys.UNKNOWN,
        levelOfStructuredInformation: state.levelOfStructuredInformation || LikertScaleKeys.UNKNOWN,
        levelOfUniformity: state.levelOfUniformity || LikertScaleKeys.UNKNOWN,
        evaluatedLevelOfRoi: state.evaluatedLevelOfRoi || LikertScaleKeys.UNKNOWN,
        levelOfQuality: state.levelOfQuality || LikertScaleKeys.UNKNOWN,
        levelOfSpeed: state.levelOfSpeed || LikertScaleKeys.UNKNOWN,
        levelOfRoutineWorkReduction: state.levelOfRoutineWorkReduction || LikertScaleKeys.UNKNOWN,
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

export function responseToState(process: ProcessResponse): Process {
    return {
        ...process,
        id: process.id.toString(),
        timeSpendComputedTotal: process.timeSpendComputedTotal.toString(),
        timeSpendEmployeesDoingProcess: process.timeSpendEmployeesDoingProcess.toString(),
        timeSpendOccurancesPerEmployee: process.timeSpendOccurancesPerEmployee.toString(),
        timeSpendPercentageDigital: process.timeSpendPercentageDigital.toString(),
        timeSpendPerOccurance: process.timeSpendPerOccurance.toString(),
        rating: process.rating || 0,
        hasBookmarked: process.hasBookmarked,
        shortDescription: process.shortDescription || '',
        longDescription: process.longDescription || '',
        canEdit: process.canEdit,
        statusText: process.statusText || '',
        esdhReference: process.esdhReference || '',
        organizationalImplementationNotes: process.organizationalImplementationNotes || '',
        ratingComment: process.ratingComment || '',
        timeSpendComment: process.timeSpendComment || '',
        technologies: process.technologies || [],
        users: process.users || [],
        localId: process.localId || '',
        klId: process.klId || '',
        legalClause: process.legalClause || '',
        kle: process.kle || '',
        kla: process.kla || '',
        links: process.links || [],
        internalNotes: process.internalNotes || '',
        processChallenges: process.processChallenges || '',
        solutionRequests: process.solutionRequests || '',
        technicalImplementationNotes: process.technicalImplementationNotes || '',
        searchWords: process.searchWords || '',
        itSystems: process.itSystems || [],
        orgUnits: process.orgUnits || [],
        created: process.created || '',
        decommissioned: process.decommissioned || '',
        lastChanged: process.lastChanged || '',
        
    }
}
