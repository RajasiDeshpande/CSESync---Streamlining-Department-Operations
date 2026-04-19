const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');
const { exec } = require('child_process');
const connectDB = require('./config/db');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Health check route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working', status: 'success' });
});

// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/student', require('./routes/student'));
app.use('/api/professor', require('./routes/professor'));
app.use('/api/club', require('./routes/club'));

// Serve built frontend from the same port when available
const clientBuildPath = path.join(__dirname, '../client/dist');
if (fs.existsSync(clientBuildPath)) {
  app.use(express.static(clientBuildPath));

  app.use((req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

const openBrowser = (url) => {
  if (process.env.OPEN_BROWSER === 'false') return;

  const platform = process.platform;
  const command = platform === 'win32'
    ? `start "" "${url}"`
    : platform === 'darwin'
      ? `open "${url}"`
      : `xdg-open "${url}"`;

  exec(command, (err) => {
    if (err) {
      console.error('Failed to open browser:', err.message);
    }
  });
};

app.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
  openBrowser(url);
});
