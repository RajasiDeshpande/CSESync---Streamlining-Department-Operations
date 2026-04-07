const API_URL = 'http://localhost:5000/api';

const testAuth = async () => {
  try {
    console.log('--- Testing Registration ---');
    const regRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Admin',
        email: `admin_${Date.now()}@test.com`,
        password: 'password123',
        role: 'admin'
      })
    });
    const regData = await regRes.json();
    console.log('Registration Status:', regRes.status);
    console.log('Registration Success:', regData.success);

    if (!regData.success) {
        console.error('Registration failed:', regData);
        return;
    }

    const email = regData.user.email;

    console.log('\n--- Testing Login ---');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login Status:', loginRes.status);
    console.log('Login Success:', loginData.success);
    const token = loginData.token;

    console.log('\n--- Testing Admin Dashboard (Protected) ---');
    const adminRes = await fetch(`${API_URL}/admin/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const adminData = await adminRes.json();
    console.log('Admin Dashboard Status:', adminRes.status);
    console.log('Admin Dashboard Success:', adminData.success);
    console.log('Message:', adminData.message);

    console.log('\n--- Testing Student Dashboard (Unauthorized for Admin) ---');
    const studentRes = await fetch(`${API_URL}/student/dashboard`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    const studentData = await studentRes.json();
    console.log('Student Dashboard Status (Expected 403):', studentRes.status);
    console.log('Student Dashboard Error Message:', studentData.message);

  } catch (err) {
    console.error('Error during testing:', err.message);
  }
};

testAuth();
