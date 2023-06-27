export type DailyHabitType = {
  id: string;
  habitId: string;
  title: string;
  description: string;
  reminderOn: boolean;
  reminderAt: string;
  progress: number;
  completed: boolean;
  info: string;
}
