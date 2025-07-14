const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const multer = require('multer');
const fetch = require('node-fetch');
const session = require('express-session');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://your-domain.vercel.app', 'https://your-domain.com'] 
    : 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax'
  },
}));

// Serve static files from /public
app.use('/public', express.static(path.join(__dirname, 'public')));

const VISITS_FILE = path.join(__dirname, 'visits.json');
const VISITS_DAILY_FILE = path.join(__dirname, 'visits_daily.json');
const VISITS_LOCATIONS_FILE = path.join(__dirname, 'visits_locations.json');
const MEDIA_FOLDERS = [
  path.join(__dirname, 'public', 'Photography'),
  path.join(__dirname, 'public', 'image-artistry'),
  path.join(__dirname, 'public', 'Image Artistry'),
  path.join(__dirname, 'public', 'Photography'),
  // Add more folders as needed
];

const BLOGS_FILE = path.join(__dirname, 'blogs.json');
const PROJECTS_FILE = path.join(__dirname, 'projects.json');

// Simple login endpoint
app.post('/api/login', (req, res) => {
  const { password } = req.body;
  console.log('[DEBUG] Received password:', password);
  console.log('[DEBUG] Expected ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD);
  if (password === process.env.ADMIN_PASSWORD) {
    req.session.authenticated = true;
    return res.json({ success: true });
  }
  res.status(401).json({ error: 'Unauthorized' });
});

// Auth middleware
function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) return next();
  res.status(401).json({ error: 'Unauthorized' });
}

// Example protected route
app.get('/api/protected', requireAuth, (req, res) => {
  res.json({ message: 'You are authenticated!' });
});

// Helper to read visits
function getVisits() {
  if (!fs.existsSync(VISITS_FILE)) return 0;
  const data = fs.readFileSync(VISITS_FILE, 'utf-8');
  try {
    return JSON.parse(data).count || 0;
  } catch {
    return 0;
  }
}

// Helper to write visits
function setVisits(count) {
  fs.writeFileSync(VISITS_FILE, JSON.stringify({ count }), 'utf-8');
}

function getVisitsDaily() {
  if (!fs.existsSync(VISITS_DAILY_FILE)) return [];
  const data = fs.readFileSync(VISITS_DAILY_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function addVisitToday() {
  const today = new Date().toISOString().slice(0, 10);
  let visits = getVisitsDaily();
  const idx = visits.findIndex(v => v.date === today);
  if (idx !== -1) {
    visits[idx].count++;
  } else {
    visits.push({ date: today, count: 1 });
  }
  fs.writeFileSync(VISITS_DAILY_FILE, JSON.stringify(visits, null, 2), 'utf-8');
}

function getVisitorIP(req) {
  // Try to get the real IP if behind proxy
  return req.headers['x-forwarded-for']?.split(',')[0] || req.connection.remoteAddress || req.ip;
}

function readVisitLocations() {
  if (!fs.existsSync(VISITS_LOCATIONS_FILE)) return [];
  const data = fs.readFileSync(VISITS_LOCATIONS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeVisitLocations(locations) {
  fs.writeFileSync(VISITS_LOCATIONS_FILE, JSON.stringify(locations, null, 2), 'utf-8');
}

// Update POST /api/visits to also log location
app.post('/api/visits', async (req, res) => {
  let count = getVisits();
  count++;
  setVisits(count);
  addVisitToday();

  // Get IP and geolocation
  const ip = getVisitorIP(req);
  let location = { ip, date: new Date().toISOString().slice(0, 10) };
  
  // Skip geolocation for localhost/private IPs
  if (ip === '::1' || ip === '127.0.0.1' || ip.startsWith('192.168.') || ip.startsWith('10.') || ip.startsWith('172.')) {
    location.note = 'Local/Private IP';
  } else {
    try {
      // Use ip-api.com for free geolocation
      const geoRes = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city,query`);
      const geo = await geoRes.json();
      console.log('Geolocation response for IP', ip, ':', geo); // Debug log
      if (geo.status === 'success') {
        location = {
          ...location,
          country: geo.country,
          region: geo.regionName,
          city: geo.city,
        };
      } else {
        location.note = `Geolocation failed: ${geo.message || 'Unknown error'}`;
      }
    } catch (error) {
      console.log('Geolocation error for IP', ip, ':', error.message);
      location.note = `Geolocation error: ${error.message}`;
    }
  }
  
  // Save to visits_locations.json
  console.log('Saving location:', location); // DEBUG LOG
  const locations = readVisitLocations();
  locations.unshift(location); // Add to start
  writeVisitLocations(locations.slice(0, 100)); // Keep last 100

  res.json({ count });
});

// Get visits
app.get('/api/visits', (req, res) => {
  const count = getVisits();
  res.json({ count });
});

// Endpoint for daily visits
app.get('/api/visits/daily', (req, res) => {
  const visits = getVisitsDaily();
  res.json(visits);
});

// Endpoint to get recent visitor locations
app.get('/api/visits/locations', (req, res) => {
  const locations = readVisitLocations();
  res.json(locations.slice(0, 20)); // Return latest 20
});

// Count media files in all folders
app.get('/api/media', (req, res) => {
  let total = 0;
  MEDIA_FOLDERS.forEach(folder => {
    if (fs.existsSync(folder)) {
      const files = fs.readdirSync(folder).filter(f => !fs.statSync(path.join(folder, f)).isDirectory());
      total += files.length;
    }
  });
  res.json({ count: total });
});

// Placeholder for posts count
app.get('/api/posts', (req, res) => {
  // TODO: Replace with real data source
  res.json({ count: 0 });
});

function readProjects() {
  if (!fs.existsSync(PROJECTS_FILE)) return [];
  const data = fs.readFileSync(PROJECTS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeProjects(projects) {
  fs.writeFileSync(PROJECTS_FILE, JSON.stringify(projects, null, 2), 'utf-8');
}

// Get all projects (and count)
app.get('/api/projects', (req, res) => {
  const projects = readProjects();
  res.json({ count: projects.length, projects });
});

// Add a new project
app.post('/api/projects', (req, res) => {
  const projects = readProjects();
  const newProject = { ...req.body, id: Date.now() };
  projects.push(newProject);
  writeProjects(projects);
  res.status(201).json(newProject);
});

// Edit a project
app.put('/api/projects/:id', (req, res) => {
  const projects = readProjects();
  const idx = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });
  projects[idx] = { ...projects[idx], ...req.body };
  writeProjects(projects);
  res.json(projects[idx]);
});

// Delete a project
app.delete('/api/projects/:id', (req, res) => {
  let projects = readProjects();
  const idx = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Project not found' });
  const deleted = projects[idx];
  projects = projects.filter(p => p.id !== parseInt(req.params.id));
  writeProjects(projects);
  res.json(deleted);
});

function readBlogs() {
  if (!fs.existsSync(BLOGS_FILE)) return [];
  const data = fs.readFileSync(BLOGS_FILE, 'utf-8');
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeBlogs(blogs) {
  fs.writeFileSync(BLOGS_FILE, JSON.stringify(blogs, null, 2), 'utf-8');
}

// Get all blogs (and count)
app.get('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  res.json({ count: blogs.length, blogs });
});

// Add a new blog
app.post('/api/blogs', (req, res) => {
  const blogs = readBlogs();
  const newBlog = { ...req.body, id: Date.now() };
  blogs.push(newBlog);
  writeBlogs(blogs);
  res.status(201).json(newBlog);
});

// Edit a blog
app.put('/api/blogs/:id', (req, res) => {
  const blogs = readBlogs();
  const idx = blogs.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Blog not found' });
  blogs[idx] = { ...blogs[idx], ...req.body };
  writeBlogs(blogs);
  res.json(blogs[idx]);
});

// Delete a blog
app.delete('/api/blogs/:id', (req, res) => {
  let blogs = readBlogs();
  const idx = blogs.findIndex(b => b.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'Blog not found' });
  const deleted = blogs[idx];
  blogs = blogs.filter(b => b.id !== parseInt(req.params.id));
  writeBlogs(blogs);
  res.json(deleted);
});

// Ensure upload folders exist
const ensureDir = dir => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

// Media upload
const tempUpload = multer({ dest: path.join(__dirname, 'public', 'temp-uploads') });

app.post('/api/media/upload', tempUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  // Get category from form field
  let category = req.body.category || 'image-artistry';
  // Normalize category
  if (category.toLowerCase().replace(/\s+/g, '-') === 'image-artistry') {
    category = 'image-artistry';
  } else if (category.toLowerCase() === 'photography') {
    category = 'Photography';
  }
  const destFolder = path.join(__dirname, 'public', category);
  ensureDir(destFolder);
  const destPath = path.join(destFolder, Date.now() + '-' + req.file.originalname);
  // Move file from temp to correct folder
  fs.renameSync(req.file.path, destPath);
  const fileName = path.basename(destPath);
  res.json({
    message: 'File uploaded',
    filePath: `/public/${category}/${fileName}`
  });
});

// Blog image upload
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, 'public', 'blog-images');
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const blogUpload = multer({ storage: blogStorage });

app.post('/api/blogs/upload', blogUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    message: 'Blog image uploaded',
    filePath: `/public/blog-images/${req.file.filename}`
  });
});

// Project image upload
const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, 'public', 'project-images');
    ensureDir(folder);
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const projectUpload = multer({ storage: projectStorage });

app.post('/api/projects/upload', projectUpload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  res.json({
    message: 'Project image uploaded',
    filePath: `/public/project-images/${req.file.filename}`
  });
});

// List images in a media category
app.get('/api/media/list', (req, res) => {
  let category = req.query.category || 'Photography';
  // Normalize category names
  if (category.toLowerCase().replace(/\s+/g, '-') === 'image-artistry') {
    category = 'image-artistry';
  } else if (category.toLowerCase() === 'photography') {
    category = 'Photography';
  }
  const folder = path.join(__dirname, 'public', category);
  console.log('Reading media from:', folder); // Log the folder being read
  if (!fs.existsSync(folder)) return res.json([]);
  const files = fs.readdirSync(folder).filter(f => !fs.statSync(path.join(folder, f)).isDirectory());
  // Return URLs for frontend use
  const urls = files.map(f => `/public/${category}/${f}`);
  res.json(urls);
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
  console.log('Environment check:');
  console.log('- ADMIN_PASSWORD:', process.env.ADMIN_PASSWORD ? 'Set' : 'Missing');
  console.log('- SESSION_SECRET:', process.env.SESSION_SECRET ? 'Set' : 'Missing');
}); 