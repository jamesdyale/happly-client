import { UniqueId } from '~generators'

export type ChallengeType = {
  id: UniqueId<'challenge'>;
  name: string;
  description: string;
  // For now we do not want to have timed challenges so we will not use the startDate and endDate
  startDate?: string;
  endDate?: string;
  participants: string[];
  numberOfParticipants: number;
  hashtags: string[]; // This is to make search easier
}
