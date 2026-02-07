export interface SkillsDto {
  name: string;
  mainContent?: string;
  downloadUrl: string;
  desc?: string;
  apiKey: string;
}


export interface CreateSkillDto  extends Omit<SkillsDto, 'apiKey'> {
  userId: string;
}