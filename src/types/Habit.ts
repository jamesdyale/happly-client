import { UniqueId } from "~generators";
import { User } from "./User";
import { TimeOfDay, Frequency, HabitType } from "~types";

export type Habit = {
  id: UniqueId<"habit">;
  name: string;
  description: string;
  userId: User["id"];
  timeOfDay: TimeOfDay;
  frequencyOption: Frequency;
  createdAt: string;
  reminderAt: string[];
  selectedDays: string[];
  type: HabitType;
};
