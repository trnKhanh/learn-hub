type Course = {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  duration: number;
  owner_id: number;
  price: number;
  discount: number;
  profile_picture: string;
  isPublished: boolean;
};

type Lesson = {
  id: number;
  course_id: number;
  name: string;
  isPublished: boolean;
  isFree: boolean;
}

type Documents = {
  id: number;
  course_id: number;
  lesson_id: number;
  name: string;
  file_path: string;
}

type Subject = {
  id: string;
  name: string;
};

type User = {
  id: string;
  email: string;
  username: string;
  full_name: string;
  date_of_birth: string;
  phone_number: string;
  institute: string;
  area_of_study: string;
  profile_picture: string;
  biography: string;
};

interface Student extends User {
  membership: string;
}
interface Tutor extends User {
  admin_id: string;
  profit: number;
  verified: boolean;
}
interface Supporter extends User {
  role: string;
}
interface Admin extends User {
  courses_access: boolean;
  tutors_access: boolean;
  students_access: boolean;
  supporters_access: boolean;
}

type TutorCV = {
  tutor_id: string;
  status: string;
};

type FinancialAid = {
  student_id: string;
  username: string;
  course_id: string;
  essay: string;
  amount: number;
  status: string;
};
