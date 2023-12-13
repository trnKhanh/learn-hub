type Course = {
  id: string;
  name: string;
  description: string;
  difficulty: string;
  duration: number;
  owner_id: string;
  created_at: string;
  price: number;
  profile_picture: string;
  discount: number;
};

type Category = {
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
