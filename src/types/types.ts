//Types that are used in multiple files

export type Project = {
  name: string;
  issues?: [];
  assigned?: User[];
  link: string;
  _id?: string;
};

export type User = {
  username: string;
  email: string;
  role: string;
};
