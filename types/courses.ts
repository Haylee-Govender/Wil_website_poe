export interface SixMonthCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  overview: string;
  highlights: CourseHighlight[];
  benefits: string[];
  whoShouldEnroll: string[];
}

export interface SixWeekCourse {
  id: string;
  title: string;
  description: string;
  price: number;
  image: any;
  overview: string;
  highlights: CourseHighlight[];
  benefits: string[];
  whoShouldEnroll: string[];
}

export interface CourseHighlight {
  title: string;
  overview: string;
  items: string[];
  project: string;
  audience: string;
}