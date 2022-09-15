import { User } from "./user";

export interface CalendarEvent {
  id?: string;
  allDay: boolean;
  color?: string;
  title: string;
  address: string;
  description: string;
  contact: string;
  end: number;
  start: number;
  user_id?: string;
  user?: User;
}

export type CalendarView =
  | 'dayGridMonth'
  | 'timeGridWeek'
  | 'timeGridDay'
  | 'listWeek';
