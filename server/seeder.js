const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

// Load models
const User = require('./models/User');
const Department = require('./models/Department');
const Course = require('./models/Course');
const Event = require('./models/Event');
const Notification = require('./models/Notification');

const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });


// Connect to DB
mongoose.connect(process.env.MONGO_URI);

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany();
    await Department.deleteMany();
    await Course.deleteMany();
    await Event.deleteMany();
    await Notification.deleteMany();

    console.log('Data Cleared...');

    // Create Users
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    const users = await User.create([
      { name: 'System Admin', email: 'admin@acropolis.in', password, role: 'admin' },
      { name: 'Dr. Rajesh Kumar', email: 'rajesh@acropolis.in', password, role: 'professor' },
      { name: 'Prof. Sunita Sharma', email: 'sunita@acropolis.in', password, role: 'professor' },
      { name: 'Aman Verma', email: 'aman@acropolis.in', password, role: 'student' },
      { name: 'Priya Das', email: 'priya@acropolis.in', password, role: 'student' },
      { name: 'ACM Club Head', email: 'acm@acropolis.in', password, role: 'club' },
      { name: 'GDSC Lead', email: 'gdsc@acropolis.in', password, role: 'club' },
    ]);

    const admin = users[0];
    const prof1 = users[1];
    const prof2 = users[2];
    const student1 = users[3];
    const student2 = users[4];
    const club1 = users[5];
    const club2 = users[6];

    // Create Departments
    const depts = await Department.create([
      { name: 'Computer Science & Engineering', code: 'CSE', hod: prof1, description: 'Department of CSE focusing on software and AI.' },
      { name: 'Information Technology', code: 'IT', hod: prof2, description: 'Department of IT focusing on networking and data systems.' },
    ]);

    const cseDept = depts[0];
    const itDept = depts[1];

    // Create Courses
    const courses = await Course.create([
      { name: 'Data Structures & Algorithms', code: 'CS201', department: cseDept, professor: prof1, credits: 4, enrolledStudents: [student1, student2] },
      { name: 'Web Development', code: 'CS302', department: cseDept, professor: prof1, credits: 3, enrolledStudents: [student1] },
      { name: 'Cloud Computing', code: 'IT401', department: itDept, professor: prof2, credits: 4, enrolledStudents: [student2] },
    ]);

    // Create Events
    await Event.create([
      { title: 'CodeQuest 2024', club: club1, description: 'Annual hackathon for developers.', date: new Date('2024-05-15'), location: 'Auditorium', status: 'approved' },
      { title: 'AI Workshop', club: club2, description: 'Hands-on session on Generative AI.', date: new Date('2024-06-10'), location: 'Lab 5', status: 'pending' },
      { title: 'Alumni Meet', club: club1, description: 'Networking event with CSE alumni.', date: new Date('2024-04-25'), location: 'Seminar Hall', status: 'approved' },
    ]);

    // Create Notifications
    await Notification.create([
      { title: 'Welcome to CSESync', message: 'The new departmental platform is now live.', recipientRole: 'all', sender: admin },
      { title: 'Exam Schedule Out', message: 'Mid-term exams start next week.', recipientRole: 'student', sender: admin },
      { title: 'Faculty Meeting', message: 'Urgent meeting at 4 PM today.', recipientRole: 'professor', sender: admin },
    ]);

    console.log('Data Seeded Successfully!');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
