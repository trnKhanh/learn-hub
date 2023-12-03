-- Entities tables
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(72) NOT NULL,
  full_name VARCHAR(255),
  day_of_birth DATE,
  phone_number VARCHAR(15),
  institution VARCHAR(255),
  area_of_study VARCHAR(255),
  biography TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS students (
  id INT NOT NULL,
  membership ENUM("SILVER", "GOLD", "PREMIUM"),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS admins (
  id INT NOT NULL,
  courses_access BOOL NOT NULL DEFAULT 0,
  tutors_access BOOL NOT NULL DEFAULT 0,
  students_access BOOL NOT NULL DEFAULT 0,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tutors (
  id INT NOT NULL,
  admin_id INT NOT NULL,
  verified BOOL NOT NULL DEFAULT 0,
  profit DOUBLE NOT NULL DEFAULT 0 CHECK(profit >= 0),
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS supporters (
  id INT NOT NULL,
  role ENUM("TECHNICAL", "SOCIAL") NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS courses ( 
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty INT NOT NULL,
  duration INT NOT NULL,
  owner INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price DOUBLE NOT NULL,
  discounted DOUBLE CHECK (discounted >= 0 AND discounted <= 1),
  PRIMARY KEY (id),
  FOREIGN KEY (owner) REFERENCES tutors(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS languages (
  id INT AUTO_INCREMENT,
  language_name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS subjects (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS lessons (
  course_id INT NOT NULL,
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  PRIMARY KEY (course_id, id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS documents (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (course_id, lesson_id, id),
  FOREIGN KEY (course_id, lesson_id) REFERENCES lessons(course_id, id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS exams (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  percentage DOUBLE NOT NULL,
  PRIMARY KEY (course_id, lesson_id, id),
  FOREIGN KEY (course_id, lesson_id) REFERENCES lessons(course_id, id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS problems (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  exam_id INT NOT NULL,
  id INT NOT NULL,
  question TEXT NOT NULL,
  score INT NOT NULL,
  auto_score BOOL NOT NULL DEFAULT 0,
  problem_type ENUM("MULTIPLE CHOICES", "TEXT") NOT NULL,
  solution VARCHAR(255),
  PRIMARY KEY (course_id, lesson_id, exam_id, id),
  FOREIGN KEY (course_id, lesson_id, exam_id) REFERENCES exams(course_id, lesson_id, id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS financial_aids (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  admin_id INT NOT NULL,
  essay TEXT NOT NULL,
  amount DOUBLE NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  state ENUM("PENDING", "ADMIN_PASSED", "TUTOR_PASSED", "ADMIN_DENIED", "TUTOR_DENIED") NOT NULL,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (admin_id) REFERENCES admins(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS shopping_carts (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT,
  student_id INT NOT NULL,
  paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  discounted DOUBLE CHECK (discounted >= 0 AND discounted <= 1),
  PRIMARY KEY (id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS support_sessions (
  id INT AUTO_INCREMENT,
  user_id INT NOT NULL,
  supporter_id INT NOT NULL,
  issue_description TEXT NOT NULL,
  started_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (supporter_id) REFERENCES supporters(id)
);

CREATE TABLE IF NOT EXISTS notes (
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (student_id, course_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS notifications (
  user_id INT NOT NULL,
  notified_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  content TEXT NOT NULL,
  PRIMARY KEY (user_id, notified_at),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS schedules (
  user_id INT NOT NULL,
  course_id INT NOT NULL,
  day_of_week ENUM("MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY") NOT NULL,
  time_in_day TIME NOT NULL,
  PRIMARY KEY (user_id, course_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS payment_information (
  user_id INT NOT NULL,
  card VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, card),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Relationship tables
CREATE TABLE IF NOT EXISTS teach_courses (
  tutor_id INT NOT NULL,
  course_id INT NOT NULL,
  profit_rate DOUBLE NOT NULL CHECK (profit >= 0 AND profit <= 1)
  PRIMARY KEY (tutor_id, course_id),
  FOREIGN KEY (tutor_id) REFERENCES tutors(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS courses_subjects (
  course_id INT NOT NULL,
  subject_id INT NOT NULL,
  PRIMARY KEY (course_id, subject_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (subject_id) REFERENCES subjects(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS courses_languages (
  course_id INT NOT NULL,
  language_id INT NOT NULL,
  PRIMARY KEY (course_id, language_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (language_id) REFERENCES languages(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS learn_courses (
  course_id INT NOT NULL,
  student_id INT NOT NULL,
  registered_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  finished_at TIMESTAMP,
  PRIMARY KEY (course_id, student_id),
  FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS learn_lessons (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  student_id INT NOT NULL,
  finished_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (course_id, lesson_id,  student_id),
  FOREIGN KEY (course_id, lesson_id) REFERENCES lessons(course_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS do_exams (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  exam_id INT NOT NULL,
  student_id INT NOT NULL,
  score DOUBLE,
  deadline DATETIME NOT NULL,
  finished_at TIMESTAMP,
  PRIMARY KEY (course_id, lesson_id, exam_id,  student_id),
  FOREIGN KEY (course_id, lesson_id, exam_id) REFERENCES exams(course_id, lesson_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS solve_problems (
  course_id INT NOT NULL,
  lesson_id INT NOT NULL,
  exam_id INT NOT NULL,
  problem_id INT NOT NULL,
  student_id INT NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (course_id, lesson_id, exam_id, problem_id, student_id),
  FOREIGN KEY (course_id, lesson_id, exam_id, problem_id) REFERENCES problems(course_id, lesson_id, exam_id, id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS payments_courses (
  payment_id INT NOT NULL,
  course_id INT NOT NULL,
  price DOUBLE NOT NULL,
  discounted DOUBLE CHECK (discounted >= 0 AND discounted <= 1),
  amount INT NOT NULL,
  PRIMARY KEY (payment_id, course_id),
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

