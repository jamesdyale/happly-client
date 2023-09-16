import { UniqueId } from "~generators";
import { User } from "./User";
import { Room } from "./Room";

export type Message = {
  id: UniqueId<"message">;
  message: string;
  dateTimeSent: string;
  sender: User["id"];
  roomId: Room["id"];
};
