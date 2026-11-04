export interface ProjectStage {
  name: string;
  description: string;
}

export const projectStages: ProjectStage[] = [
  { name: 'URS', description: 'User and quality requirements' },
  { name: 'Design', description: 'FS, DS and risk assessment' },
  { name: 'Build', description: 'Code and screens, peer reviewed' },
  { name: 'FAT', description: 'Factory test with your QA' },
  { name: 'IQ/OQ/PQ', description: 'Qualification on site' },
  { name: 'Release', description: 'Handover and 24/7 support' },
];
