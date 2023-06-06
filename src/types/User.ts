import { UniqueId } from '../generators/generateId'

export type User = {
  id: UniqueId<'user'>;
  email: string;
  token: string;
};
