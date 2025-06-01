export type Period = "all" | "year" | "semester" | "month" | "week" | "day";

export type ScheduledDateStatus =
  | "absent"
  | "present"
  | "scheduled"
  | "cancelled";

export type ScheduledDate = {
  date: Date;
  status: ScheduledDateStatus;
};

export type ReportPeriod = {
  type: "year" | "semester" | "month" | "week" | "day" | "all";
  semester?: number;
  year?: number;
  month?: number;
  week?: number;
  day?: number;
  all: boolean;
};

export type Report = {
  student: {
    name: string;
    ra: string;
    course: string;
    period: string;
  };
  scheduledDates: ScheduledDate[];
  reportPeriod: ReportPeriod;
  attendance: {
    total: number;
    present: number;
    absent: number;
    scheduled: number;
    cancelled: number;
  };
};
