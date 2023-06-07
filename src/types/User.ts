import { UniqueId } from '../generators/generateId'

export type User = {
  id: UniqueId<'user'>;
  name: string;
  email: string;
};
