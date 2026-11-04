export interface ComplianceStandard {
  name: string;
  description: string;
}

export const heroContent = {
  headline: 'Automation for biologics, from bioreactor to filled vial.',
  introduction:
    'PLC, SCADA and ISA-88 batch systems for upstream cell culture, downstream purification and sterile fill-finish, validated to GAMP 5, Annex 11 and 21 CFR Part 11.',
  demoActionLabel: 'Run the live demos',
  demoSectionId: 'live-demos',
};

export const complianceStandards: ComplianceStandard[] = [
  { name: 'GAMP 5', description: 'Risk-based validation of computerised systems' },
  { name: '21 CFR Part 11', description: 'Electronic records and signatures' },
  { name: 'EU Annex 11', description: 'Computerised systems in GMP' },
  { name: 'Annex 1', description: 'Sterile manufacturing and contamination control' },
  { name: 'ISA-88', description: 'Batch control models and recipes' },
  { name: 'ISA-95', description: 'Link to MES and ERP' },
  { name: 'ALCOA+', description: 'Data integrity principles' },
  { name: 'ISA-18.2', description: 'Alarm management lifecycle' },
];
