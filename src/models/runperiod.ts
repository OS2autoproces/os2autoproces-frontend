export type RunPeriod = 'NOT_CHOSEN_YET' | 'ONDEMAND' | 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUATERLY' | 'YEARLY';

export const RunPeriodLabels: { [x in RunPeriod]: string } = {
  NOT_CHOSEN_YET: '',
  ONCE: 'Engangskørsel',
  ONDEMAND: 'Løbende kørsel',
  DAILY: 'Dagligt',
  WEEKLY: 'Ugentligt',
  MONTHLY: 'Månedligt',
  QUATERLY: 'Hvert kvartal',
  YEARLY: 'Årligt'
};

export const RunPeriodKeys: { [runPeriod in RunPeriod]: runPeriod } = {
  NOT_CHOSEN_YET: 'NOT_CHOSEN_YET',
  ONCE: 'ONCE',
  ONDEMAND: 'ONDEMAND',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUATERLY: 'QUATERLY',
  YEARLY: 'YEARLY'
};
