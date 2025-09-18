import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { supabase } from '../supabaseClient';
import { getVisitStats } from '../services/visitTracking';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const statsConfig = [
  { label: 'Visits', key: 'visits', route: '/visits' },
  { label: 'Blogs', key: 'blogs', route: '/blogs' },
  { label: 'Projects', key: 'projects', route: '/projects' },
  { label: 'Media', key: 'media', route: '/media' },
];

const recentActivity = [
  { type: 'Post', desc: 'New blog post published', time: '2 hours ago' },
  { type: 'Project', desc: 'New project added', time: '5 hours ago' },
  { type: 'User', desc: 'New user registered', time: '1 day ago' },
];

const notifications = [
  { message: 'Server backup completed', time: 'Just now' },
  { message: 'New comment on blog post', time: '10 min ago' },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    visits: null,
    blogs: null,
    projects: null,
    media: null,
  });
  // Log the current Supabase user ID for admin reference
  useEffect(() => {
    async function logUserId() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        console.log('Current Supabase User ID:', user.id);
      } else {
        console.log('No user logged in');
      }
    }
    logUserId();
  }, []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dailyVisits, setDailyVisits] = useState([]);
  const [visitorLocations, setVisitorLocations] = useState([]);

  // Modal state
  const [modal, setModal] = useState(null); // 'project' | 'blog' | 'media' | null
  const [mediaCategory, setMediaCategory] = useState('Photography');
  const [form, setForm] = useState({});

  const [refreshing, setRefreshing] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch all stats from Supabase including visits
      const [visitStats, blogsResult, projectsResult, mediaResult] = await Promise.all([
        getVisitStats(),
        supabase.from('blogs').select('*', { count: 'exact' }),
        supabase.from('projects').select('*', { count: 'exact' }),
        supabase.from('media').select('*', { count: 'exact' })
      ]);
      setStats({
        visits: visitStats.totalVisits,
        blogs: blogsResult.count || 0,
        projects: projectsResult.count || 0,
        media: mediaResult.count || 0,
      });
      setDailyVisits(visitStats.dailyVisits);
      setVisitorLocations(visitStats.visitorLocations);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError('Failed to load stats.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    let intervalId;
    fetchStats();
    intervalId = setInterval(fetchStats, 15000); // Poll every 15 seconds
    return () => clearInterval(intervalId);
  }, []);

  // Handle form input
  const handleInput = (e) => {
    const { name, value, type, files } = e.target;
    setForm(f => ({ ...f, [name]: type === 'file' ? files[0] : value }));
  };

  // Handle form submit (with file upload logic)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modal === 'media') {
        // Media upload to Supabase
        try {
          if (!form.file) {
            alert('Please select a file to upload');
            return;
          }
          // Upload file to Supabase Storage
          const fileName = `${mediaCategory}/${Date.now()}-${form.file.name}`;
          const { error: uploadError } = await supabase.storage
            .from('media')
            .upload(fileName, form.file);
          if (uploadError) throw uploadError;
          // Get public URL
          const { data: urlData } = supabase.storage
            .from('media')
            .getPublicUrl(fileName);
          // Save media record to database
          const { error: dbError } = await supabase
            .from('media')
            .insert([{
              file_name: form.file.name,
              file_url: urlData.publicUrl,
              category: mediaCategory
            }]);
          if (dbError) throw dbError;
          alert('Media uploaded successfully to Supabase!');
        } catch (error) {
          alert('Upload failed: ' + error.message);
        }
      } else if (modal === 'blog') {
        // Blog creation with Supabase
        try {
          let imageUrl = '';
          if (form.file) {
            // Upload image to Supabase Storage
            const fileName = `blog-images/${Date.now()}-${form.file.name}`;
            const { error: uploadError } = await supabase.storage
              .from('media')
              .upload(fileName, form.file);
            if (uploadError) throw uploadError;
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('media')
              .getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
          }
          // Create blog entry in Supabase
          const blogData = { 
            title: form.title,
            content: form.content || 'Blog content here...',
            image_url: imageUrl
          };
          const { error: dbError } = await supabase
            .from('blogs')
            .insert([blogData]);
          if (dbError) throw dbError;
          alert('Blog created successfully!');
        } catch (error) {
          alert('Blog creation failed: ' + error.message);
        }
      } else if (modal === 'project') {
        // Project creation with Supabase
        try {
          let imageUrl = '';
          if (form.file) {
            // Upload image to Supabase Storage
            const fileName = `project-images/${Date.now()}-${form.file.name}`;
            const { error: uploadError } = await supabase.storage
              .from('media')
              .upload(fileName, form.file);
            if (uploadError) throw uploadError;
            // Get public URL
            const { data: urlData } = supabase.storage
              .from('media')
              .getPublicUrl(fileName);
            imageUrl = urlData.publicUrl;
          }
          // Create project entry in Supabase
          const projectData = { 
            title: form.title,
            description: form.description || 'Project description here...',
            category: form.category || 'Web Development',
            image_url: imageUrl
          };
          const { error: dbError } = await supabase
            .from('projects')
            .insert([projectData]);
          if (dbError) throw dbError;
          alert('Project created successfully!');
        } catch (error) {
          alert('Project creation failed: ' + error.message);
        }
      }
    } catch (err) {
      alert('Upload failed: ' + (err.response?.data?.error || err.message));
    } finally {
      setModal(null);
      setForm({});
    }
  };

  // Chart data
  const chartData = {
    labels: dailyVisits.map(v => v.date),
    datasets: [
      {
        label: 'Daily Visits',
        data: dailyVisits.map(v => v.count),
        fill: false,
        borderColor: '#7c3aed',
        backgroundColor: '#a78bfa',
        tension: 0.3,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' },
      title: { display: true, text: 'Daily Visits' },
    },
    scales: {
      x: { title: { display: true, text: 'Date' } },
      y: { title: { display: true, text: 'Visits' }, beginAtZero: true },
    },
  };

  return (
    <div className="space-y-8">
      {/* Manual Refresh Button */}
      <div className="flex justify-end mb-2">
        <button
          onClick={() => { setRefreshing(true); fetchStats(); }}
          disabled={refreshing || loading}
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800 disabled:opacity-50"
        >
          {refreshing || loading ? 'Refreshing...' : 'Refresh'}g
        </button>
      </div>
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {statsConfig.map((stat) => (
          <button
            key={stat.key}
            onClick={() => navigate(stat.route)}
            className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center w-full max-w-xs mx-auto cursor-pointer hover:shadow-lg transition border-2 border-transparent hover:border-purple-300 focus:outline-none"
            disabled={loading}
          >
            <div className="text-2xl sm:text-3xl font-bold text-purple-700">
              {loading ? '...' : error ? '!' : stats[stat.key]}
            </div>
            <div className="text-gray-500 mt-2 text-sm sm:text-base">{stat.label}</div>
          </button>
        ))}
      </div>
      {/* Daily Visits Chart */}
      <div className="bg-white rounded-xl shadow p-4 sm:p-6 flex flex-col items-center justify-center min-h-[70px] w-full overflow-x-auto">
        {dailyVisits.length > 0 ? (
          <Line data={chartData} options={chartOptions} height={70} />
        ) : (
          <div className="text-base sm:text-lg text-gray-400">No visit data yet</div>
        )}
      </div>
      {/* More Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Visitor Locations Card (replaces To-Do List) */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-purple-700 mb-4">Visitor Locations</div>
          {visitorLocations.length === 0 ? (
            <div className="text-center text-purple-200 py-6">No visitor data yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs text-left">
                <thead>
                  <tr className="border-b border-purple-100">
                    <th className="py-1 px-2 font-semibold">Date</th>
                    <th className="py-1 px-2 font-semibold">Country</th>
                    <th className="py-1 px-2 font-semibold">State/Region</th>
                    <th className="py-1 px-2 font-semibold">City</th>
                    <th className="py-1 px-2 font-semibold">IP</th>
                    <th className="py-1 px-2 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {visitorLocations.map((loc, idx) => (
                    <tr key={idx} className="border-b border-purple-50 hover:bg-purple-50/30">
                      <td className="py-1 px-2">{loc.date}</td>
                      <td className="py-1 px-2">{loc.country || '-'}</td>
                      <td className="py-1 px-2">{loc.region || '-'}</td>
                      <td className="py-1 px-2">{loc.city || '-'}</td>
                      <td className="py-1 px-2 font-mono text-xs text-gray-400">{loc.ip}</td>
                      <td className="py-1 px-2 text-xs text-gray-500">{loc.note || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {/* Notifications */}
        <div className="bg-white rounded-xl shadow p-6">
          <div className="font-semibold text-purple-700 mb-4">Notifications</div>
          <ul className="space-y-2">
            {notifications.map((note, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{note.message}</span>
                <span className="text-xs text-gray-400">{note.time}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <div className="font-semibold text-purple-700 mb-4">Quick Actions</div>
          <div className="flex flex-col gap-2 w-full">
            <button onClick={() => setModal('project')} className="w-full bg-purple-700 text-white rounded-lg py-2 text-center hover:bg-purple-800 transition">Add Project</button>
            <button onClick={() => setModal('blog')} className="w-full bg-purple-700 text-white rounded-lg py-2 text-center hover:bg-purple-800 transition">Create Blog</button>
            <button onClick={() => setModal('media')} className="w-full bg-purple-700 text-white rounded-lg py-2 text-center hover:bg-purple-800 transition">Upload Media</button>
          </div>
        </div>
        {/* Progress Bar */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
          <div className="font-semibold text-purple-700 mb-4 w-full">System Health</div>
          <div className="w-full">
            <div className="flex justify-between mb-1 text-xs text-gray-500">
              <span>Server Uptime</span>
              <span>99.9%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div className="bg-green-500 h-3 rounded-full" style={{ width: '99.9%' }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Modal Forms */}
      {modal === 'project' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold text-purple-700 mb-2">Add Project</h2>
            <input name="title" placeholder="Project Title" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="client" placeholder="Client" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="duration" placeholder="Duration" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <textarea name="description" placeholder="Description" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="file" type="file" accept="image/*" onChange={handleInput} className="w-full" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-700 text-white">Submit</button>
            </div>
          </form>
        </div>
      )}
      {modal === 'blog' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold text-purple-700 mb-2">Create Blog</h2>
            <input name="title" placeholder="Blog Title" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="author" placeholder="Author" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="date" type="date" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <textarea name="content" placeholder="Content" onChange={handleInput} required className="w-full border rounded px-3 py-2" />
            <input name="file" type="file" accept="image/*" onChange={handleInput} className="w-full" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-700 text-white">Submit</button>
            </div>
          </form>
        </div>
      )}
      {modal === 'media' && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-md space-y-4 relative">
            <h2 className="text-xl font-bold text-purple-700 mb-2">Upload Media</h2>
            <select name="category" value={mediaCategory} onChange={e => { setMediaCategory(e.target.value); handleInput(e); }} className="w-full border rounded px-3 py-2">
              <option value="Photography">Photography</option>
              <option value="image-artistry">Image Artistry</option>
            </select>
            <input name="file" type="file" accept="image/*,video/*" onChange={handleInput} required className="w-full" />
            <div className="flex gap-2 justify-end">
              <button type="button" onClick={() => setModal(null)} className="px-4 py-2 rounded bg-gray-200">Cancel</button>
              <button type="submit" className="px-4 py-2 rounded bg-purple-700 text-white">Submit</button>
            </div>
          </form>
        </div>
      )}
      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow p-6">
        <div className="font-semibold text-purple-700 mb-4">Recent Activity</div>
        <ul className="divide-y divide-gray-200">
          {recentActivity.map((item, idx) => (
            <li key={idx} className="py-2 flex justify-between items-center">
              <span className="text-gray-700">{item.desc}</span>
              <span className="text-xs text-gray-400">{item.time}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard; 