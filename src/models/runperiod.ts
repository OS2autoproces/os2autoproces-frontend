export type RunPeriod = 'ONDEMAND' | 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUATERLY' | 'YEARLY';

export const RunPeriodLabels: { [x in RunPeriod]: string } = {
    ONDEMAND: 'On demand',
    ONCE: 'Engangskørsel',
    DAILY: 'Dagligt',
    WEEKLY: 'Ugentligt',
    MONTHLY: 'Månedligt',
    QUATERLY: 'Hvert kvartal',
    YEARLY: 'Årligt'
};

export const RunPeriodKeys: { [runPeriod in RunPeriod]: runPeriod } = {
    ONDEMAND: 'ONDEMAND',
    ONCE: 'ONCE',
    DAILY: 'DAILY',
    WEEKLY: 'WEEKLY',
    MONTHLY: 'MONTHLY',
    QUATERLY: 'QUATERLY',
    YEARLY: 'YEARLY'
};
