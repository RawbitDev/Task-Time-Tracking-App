/**
 * Label entity interface
 */
export interface Label {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  tasks: Task[];
}

/**
 * Tracking entity interface
 */
export interface Tracking {
  id: string;
  description: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  updatedAt: string;
  task: Task;
}

/**
 * Task entity interface
 */
export interface Task {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  trackings: Tracking[];
  labels: Label[];
}
