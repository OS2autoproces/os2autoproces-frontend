export type Employees = 'BELOW_1500' | 'BELOW_3000' | 'BELOW_5000' | 'BELOW_10000' | 'ABOVE_10000';

export const EmployeesLabels: { [x in Employees]: string } = {
  BELOW_1500: 'Under 1.500 medarbejdere',
  BELOW_3000: '1.500 – 2.999 medarbejdere',
  BELOW_5000: '3.000 – 4.999 medarbejdere',
  BELOW_10000: '5.000 – 9.999 medarbejdere',
  ABOVE_10000: 'Over 10.000 medarbejdere',
};

export const EmployeesKeys: { [x in Employees]: x } = {
  BELOW_1500: 'BELOW_1500',
  BELOW_3000: 'BELOW_3000',
  BELOW_5000: 'BELOW_5000',
  BELOW_10000: 'BELOW_10000',
  ABOVE_10000: 'ABOVE_10000',
};

export const EmployeesOrder: Employees[] = ['BELOW_1500', 'BELOW_3000', 'BELOW_5000', 'BELOW_10000', 'ABOVE_10000'];
