import { UniqueId } from "~generators";
import { User } from "./User";
import { Room } from "./Room";

export type Message = {
  id: UniqueId<"message">;
  text: string;
  createdAt: Date;
  userId: User["id"];
  roomId: Room["id"];
};
