-- Entities tables
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT,
  username VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(72) NOT NULL,
  full_name VARCHAR(255),
  day_of_birth DATE,
  phone_bumber VARCHAR(15),
  institution VARCHAR(255),
  area_of_study VARCHAR(255),
  biography TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS students (
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS administrators (
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS tutors (
  id INT NOT NULL,
  admin_id INT NOT NULL,
  verified BOOL NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (admin_id) REFERENCES administrators(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS supporters (
  id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS courses ( 
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  difficulty INT NOT NULL,
  duration INT NOT NULL,
  admin_id INT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  price DOUBLE NOT NULL,
  discounted DOUBLE,
  PRIMARY KEY (id),
  FOREIGN KEY (admin_id) REFERENCES administrators(id) ON DELETE CASCADE ON UPDATE CASCADE
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
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  course_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  lesson_id INT NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE IF NOT EXISTS exams (
  id INT AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  lesson_id INT NOT NULL,
  percentage DOUBLE NOT NULL,
  PRIMARY KEY (id),
  FOREIGN kEY (lesson_id) REFERENCES lessons(id)
);

CREATE TABLE IF NOT EXISTS problems (
  id INT AUTO_INCREMENT,
  question TEXT NOT NULL,
  exam_id INT NOT NULL,
  score INT NOT NULL,
  auto_score BOOL NOT NULL,
  problem_type ENUM("MULTIPLE CHOICES", "TEXT") NOT NULL,
  solution VARCHAR(255),
  PRIMARY KEY (id),
  FOREIGN KEY (exam_id) REFERENCES exams(id)
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
  FOREIGN KEY (admin_id) REFERENCES administrators(id) ON DELETE CASCADE ON UPDATE CASCADE
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
  discounted DOUBLE,
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
  lesson_id INT NOT NULL,
  content TEXT NOT NULL,
  PRIMARY KEY (student_id, lesson_id),
  FOREIGN KEY (student_id) REFERENCES students(id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id)
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

-- Relationship tables
CREATE TABLE IF NOT EXISTS teach_courses (
  tutor_id INT NOT NULL,
  course_id INT NOT NULL,
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
  lesson_id INT NOT NULL,
  student_id INT NOT NULL,
  PRIMARY KEY (lesson_id,  student_id),
  FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS do_exams (
  exam_id INT NOT NULL,
  student_id INT NOT NULL,
  score DOUBLE,
  deadline DATETIME NOT NULL,
  finished_at TIMESTAMP,
  PRIMARY KEY (exam_id,  student_id),
  FOREIGN KEY (exam_id) REFERENCES exams(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS solve_problems (
  problem_id INT NOT NULL,
  student_id INT NOT NULL,
  answer TEXT NOT NULL,
  PRIMARY KEY (problem_id, student_id),
  FOREIGN KEY (problem_id) REFERENCES problems(id) ON DELETE CASCADE ON UPDATE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS payments_courses (
  payment_id INT NOT NULL,
  course_id INT NOT NULL,
  price DOUBLE NOT NULL,
  discounted DOUBLE,
  amount INT NOT NULL,
  PRIMARY KEY (payment_id, course_id),
  FOREIGN KEY (payment_id) REFERENCES payments(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
);

