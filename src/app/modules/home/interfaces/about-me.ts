export interface AboutMe {
  title: string;
  frameWork: string;
  greetings: string;
  whatIsThis: string;
  search: ISearch[];
  subtitle: string;
}

interface ISearch {
  about: string;
  goal: string;
}
