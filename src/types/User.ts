import { UniqueId } from '~generators'

export type User = {
  id: UniqueId<'user'>;
  name: string;
  email: string;
  isAccountVerified: boolean;
  pushToken: string;
};
