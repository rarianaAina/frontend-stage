export interface SchedulingConfiguration {
  id: number;
  jobName: string;
  jobDescription: string;
  cronExpression: string;
  displayName: string;
  scheduleType: string;
  enabled: boolean;
  lastModified: string;
  lastModifiedBy?: string;
  createdDate: string;
  scheduleParams?: {
    frequency: string;
    hour?: string;
    minute?: string;
    dayOfWeek?: string;
    dayOfMonth?: string;
    customCron?: string;
  };
}

export interface SimplifiedSchedulingRequest {
  frequency: string; // HOURLY, DAILY, WEEKLY, MONTHLY, etc.
  hour?: string;
  minute?: string;
  dayOfWeek?: string;
  dayOfMonth?: string;
  customCron?: string;
  enabled: boolean;
  modifiedBy?: string;
}

export interface CreateSchedulingRequest extends SimplifiedSchedulingRequest {
  jobName: string;
  jobDescription: string;
}

export interface SchedulingOptions {
  frequencies: Array<{ value: string; label: string; cron: string }>;
  hours: Array<{ value: string; label: string }>;
  minutes: Array<{ value: string; label: string }>;
  daysOfWeek: Array<{ value: string; label: string }>;
  daysOfMonth: Array<{ value: string; label: string }>;
}

export interface SchedulingStatus {
  jobs: Record<string, {
    enabled: boolean;
    cronExpression: string;
  }>;
  totalJobs: number;
  activeJobs: number;
  lastChecked: string;
}