export type taskType = {
  id: number;
  title: string;
  titleDesc: string;
};

export type TaskListProps = {
  tasks: taskType[];
  onDelete(nameToId: number): void;
  onUpdate: any;
};

export type TaskItemProps = {
  task: taskType;
  onDelete(nameToId: number): void;
};

export type taskListType = {
  tasks: taskType[];
  id: number;
  title: string;
  titleDesc: string;
};
