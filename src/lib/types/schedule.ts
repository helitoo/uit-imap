export type Schedule = {
  start: Date;
  end: Date;
  building_id: string;
  room_name: string;
  capacity: number;
  number_of_members: number;
  event_title: string;
  event_description: string;
};

export type ScheduleFilter = {
  start?: Date;
  end?: Date;
  building_id?: string;
  room_name?: string;
  capacity?: number;
  event_title?: string;
  event_description?: string;
};
