import { UniqueId } from "~generators";
import { User } from "./User";

export type Room = {
  id: UniqueId<"room">;
  name: string;
  description: string;
  members: User["id"][];
  createdBy: User["id"];
};
