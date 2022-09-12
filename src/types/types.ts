//Types that are used in multiple files

export type Project = {
  name: string;
  tickets?: [];
  assigned?: User[];
  link: string;
  _id?: string;
  description: string;
};

export type User = {
  username: string;
  email: string;
  role: string;
};

export type Ticket = {
  title: string;
  submitter: string;
  status: string;
  developer: string;
  created: string;
  project: string;
  description: string;
  type: string;
  priority: string;
  comments: Comment[];
};

export type Comment = {
  commenter: User;
  message: string;
  created: string;
};
