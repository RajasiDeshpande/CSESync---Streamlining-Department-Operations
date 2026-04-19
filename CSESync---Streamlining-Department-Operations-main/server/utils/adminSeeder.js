const User = require('../models/User');

const seedAdmin = async () => {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL || 'admin@acropolis.in';
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'acroadmin';
    const adminName = process.env.DEFAULT_ADMIN_NAME || 'System Admin';

    const admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      console.log('--- Seeding Default Admin ---');
      await User.create({
        username: adminEmail,
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      console.log(`Default admin created successfully: ${adminEmail} / ${adminPassword}`);
    } else {
      console.log('--- Updating Default Admin Credentials ---');
      admin.username = adminEmail;
      admin.name = adminName;
      admin.password = adminPassword;
      admin.role = 'admin';
      await admin.save();
      console.log(`Default admin credentials forced to: ${adminEmail} / ${adminPassword}`);
    }
  } catch (error) {
    console.error('Error seeding admin:', error.message);
  }
};

module.exports = seedAdmin;
