export class BugModel {
  public title: string;
  public description: string;
  public priority: number;
}

export class BugList {
  id: number;
  title: string;
  priority: number;
  reporter: string;
  createdAt: Date;
  status: string;
  description: string;
}
