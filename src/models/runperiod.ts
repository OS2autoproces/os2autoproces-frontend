export type RunPeriod = 'ONDEMAND' | 'ONCE' | 'DAILY' | 'WEEKLY' | 'MONTHLY' | 'QUATERLY' | 'YEARLY';

export const RunPeriodLabels: { [x in RunPeriod]: string } = {
  ONCE: 'Engangskørsel',
  ONDEMAND: 'Løbende kørsel',
  DAILY: 'Dagligt',
  WEEKLY: 'Ugentligt',
  MONTHLY: 'Månedligt',
  QUATERLY: 'Hvert kvartal',
  YEARLY: 'Årligt'
};

export const RunPeriodKeys: { [runPeriod in RunPeriod]: runPeriod } = {
  ONCE: 'ONCE',
  ONDEMAND: 'ONDEMAND',
  DAILY: 'DAILY',
  WEEKLY: 'WEEKLY',
  MONTHLY: 'MONTHLY',
  QUATERLY: 'QUATERLY',
  YEARLY: 'YEARLY'
};
