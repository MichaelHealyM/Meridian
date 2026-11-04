export interface Isa88Level {
  level: string;
  example: string;
}

export interface RecipeType {
  name: string;
  explanation: string;
  buttonClass: string;
}

export const isa88PhysicalModel: Isa88Level[] = [
  { level: 'Enterprise', example: 'Acme Biologics' },
  { level: 'Site', example: 'Cork drug substance site' },
  { level: 'Area', example: 'Downstream' },
  { level: 'Process cell', example: 'Purification suite' },
  { level: 'Unit', example: 'UF/DF skid UF-201' },
  { level: 'Equipment module', example: 'Diafiltration' },
  { level: 'Control module', example: 'Pump P-201' },
];

export const isa88ProceduralModel: Isa88Level[] = [
  { level: 'Procedure', example: 'Purify product batch' },
  { level: 'Unit procedure', example: 'Ultrafiltration and diafiltration' },
  { level: 'Operation', example: 'Diafilter into formulation buffer' },
  { level: 'Phase', example: 'Add buffer (PLC phase)' },
];

export const recipeTypes: RecipeType[] = [
  {
    name: 'General',
    explanation: 'Company-wide process knowledge.',
    buttonClass: 'btn-outline-secondary',
  },
  {
    name: 'Site',
    explanation: 'Adapted to one site’s equipment and rules.',
    buttonClass: 'btn-outline-secondary',
  },
  {
    name: 'Master',
    explanation: 'The approved recipe for a product on a process cell.',
    buttonClass: 'btn-primary',
  },
  {
    name: 'Control',
    explanation: 'One batch’s executable instance, with actual values.',
    buttonClass: 'btn-success',
  },
];
