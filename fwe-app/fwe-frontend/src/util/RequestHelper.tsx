import { Label, Task, Tracking } from './EntityInterfaces';

/**
 * Helper to get all tasks.
 */
export const fetchAllTasks = async () => {
  const taskRequest = await fetch('/api/task', {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  const taskData: Task[] = (await taskRequest.json()).data;
  return taskData;
};

/**
 * Helper to get all labels.
 */
export const fetchAllLabels = async () => {
  const labelRequest = await fetch('/api/label', {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  const labelData: Label[] = (await labelRequest.json()).data;
  return labelData;
};

/**
 * Helper to get all trackings of a task.
 * @param taskId The task to get the trackings from.
 */
export const fetchTrackingsOfTask = async (taskId: string) => {
  const taskTrackingsRequest = await fetch(`/api/task/${taskId}/tracking`, {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  const taskTrackings: Tracking[] = (await taskTrackingsRequest.json()).data;
  return taskTrackings;
};

/**
 * Helper to delete a task.
 * @param taskId The task to delete.
 */
export const deleteTask = async (taskId: string) => {
  await fetch(`/api/task/${taskId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  });
};

/**
 * Helper to delete a tracking.
 * @param trackingId The tracking to delete.
 */
export const deleteTracking = async (trackingId: string) => {
  await fetch(`/api/tracking/${trackingId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'DELETE',
  });
};

/**
 * Helper to create a label.
 * @param labelName The name of the new label.
 */
export const createLabel = async (labelName: string) => {
  const createdLabel = await fetch('/api/label', {
    body: JSON.stringify({
      name: labelName,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  const label: Label = (await createdLabel.json()).data;
  return label;
};

/**
 * HElper to update the labels of a task.
 * @param taskId The task which labels get updated.
 * @param labelIds TRhe updated label list of the task.
 */
export const updateLabelsOfTask = async (taskId: string, labelIds: string[]) => {
  await fetch(`/api/task/${taskId}/label/`, {
    body: JSON.stringify({
      labels: labelIds,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });
};

/**
 * Helper to delete labels of a task.
 * @param labels The labels to delete.
 */
export const deleteLabels = async (labels: Label[]) => {
  for (const label of labels) {
    await fetch(` /api/label/${label.id}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'DELETE',
    });
  }
};

/**
 * Helper to create a new tracking.
 * @param newDescription The description of the new tracking.
 * @param newStartTime The start time of the new tracking.
 * @param newEndTime The end time of the new tracking.
 */
export const createTracking = async (newDescription: string, newStartTime: string, newEndTime: string) => {
  const ceratedTracking = await fetch('/api/tracking', {
    body: JSON.stringify({
      description: newDescription,
      endTime: newEndTime,
      startTime: newStartTime,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
  const tracking: Tracking = (await ceratedTracking.json()).data;
  return tracking;
};

/**
 * Helper to update the description of a tracking.
 * @param trackingId The tracking to update.
 * @param newDescription The new description of the tracking.
 */
export const patchTrackingDescription = async (trackingId: string, newDescription: string) => {
  await fetch(`/api/tracking/${trackingId}`, {
    body: JSON.stringify({
      description: newDescription,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });
};

/**
 * Helper to update a tracking.
 * @param trackingId The id of the tracking to update.
 * @param newDescription The new description of the tracking.
 * @param newStartTime The new start time of the tracking.
 * @param newEndTime The new end time of the tracking.
 */
export const patchTracking = async (
  trackingId: string,
  newDescription: string,
  newStartTime: string,
  newEndTime: string,
) => {
  await fetch(`/api/tracking/${trackingId}`, {
    body: JSON.stringify({
      description: newDescription,
      endTime: newEndTime,
      startTime: newStartTime,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'PATCH',
  });
};

/**
 * Helper to add a tracking to a task.
 * @param taskId The task to add the tracking to.
 * @param trackingId The tracking to add.
 */
export const addTrackingToTask = async (taskId: string, trackingId: string) => {
  await fetch(`/api/task/${taskId}/tracking/${trackingId}`, {
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

/**
 * Helper to add trackings to a task.
 * @param taskId The task to add the trackings to.
 * @param trackingIds The trackings to add.
 */
export const addTrackingsToTask = async (taskId: string, trackingIds: string[]) => {
  await fetch(`/api/task/${taskId}/tracking/`, {
    body: JSON.stringify({
      trackings: trackingIds,
    }),
    headers: { 'Content-Type': 'application/json' },
    method: 'POST',
  });
};

/**
 * Helper to get a example activity using the bonus part of the backend.
 */
export const getExampleTask = async () => {
  const exampleTaskRequest = await fetch('/api/task/example', {
    headers: { 'content-type': 'application/json' },
    method: 'GET',
  });
  const exampleTask: string = (await exampleTaskRequest.json()).data;
  return exampleTask;
};
