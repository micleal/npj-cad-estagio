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
  scheduledDates: {
      date: Date;
      status: ScheduledDateStatus;
  }[] | undefined;
  reportPeriod: {
    year: number;
    semester: number;
    type: "year" | "semester";
    all: boolean;
  };
  attendance: {
    total: number;
    present: number;
    absent: number;
    scheduled: number;
    cancelled: number;
  };
};
