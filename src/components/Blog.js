// Blog.js - Blog/updates section
// Displays a list of blog posts or updates

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

// Modal component for blog post details
const BlogModal = ({ post, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
    <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative">
      <button onClick={onClose} className="absolute top-3 right-3 text-2xl text-purple-700 hover:text-purple-900">&times;</button>
      <div className="flex flex-col items-center">
        {/* Post image */}
        <img src={post.image_url || 'https://via.placeholder.com/400x160?text=No+Image'} alt={post.title} className="w-full h-40 object-cover rounded-xl mb-3" />
        {/* Post image/avatar placeholder */}
        <div className="w-16 h-16 bg-purple-100 rounded-full mb-3 flex items-center justify-center self-center -mt-12 border-4 border-white shadow-lg">
          <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 21l4-4 4 4" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-purple-800 mb-2">{post.title}</h3>
        <span className="text-xs text-gray-400 mb-2">{post.date}</span>
        <p className="text-gray-700 mb-4 text-center whitespace-pre-line">{post.full_text || post.excerpt}</p>
      </div>
    </div>
  </div>
);

// Utility to unescape content
function unescapeContent(str) {
  if (!str) return '';
  try {
    return JSON.parse('"' + str.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/\"/g, '\\"') + '"');
  } catch {
    return str;
  }
}

const Blog = () => {
  const [modalPost, setModalPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Set this to true only for the owner (e.g., via env, auth, or hardcoded for now)
  const isOwner = true; // Adjust as needed
  // State for add post modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    date: '',
    image_url: '',
    excerpt: '',
    full_text: '',
    link: '#',
  });

  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      const { data, error } = await supabase.from('blogs').select('*').order('date', { ascending: false });
      if (error) {
        console.error('Error fetching blogs:', error.message);
        setPosts([]);
      } else {
        setPosts(data || []);
        console.log('Fetched blog posts:', data);
      }
      setLoading(false);
    }
    fetchBlogs();
  }, []);

  // Handle add post form submit
  const handleAddPost = (e) => {
    e.preventDefault();
    setPosts([{ ...newPost }, ...posts]);
    setShowAddModal(false);
    setNewPost({ title: '', date: '', image_url: '', excerpt: '', full_text: '', link: '#' });
  };

  return (
    <section id="blog" className="py-16 px-4 bg-gray-50">
      {/* Section heading */}
      <h2 className="text-3xl font-bold text-purple-900 mb-8">Blog</h2>
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 flex flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl animate-fade-in-up">
              {/* Post image */}
              <img
                src={post.image_url || 'https://via.placeholder.com/400x160?text=No+Image'}
                alt={post.title}
                className="w-full h-40 object-cover rounded-xl mb-3"
                onError={e => { e.target.onerror = null; e.target.src = 'https://via.placeholder.com/400x160?text=No+Image'; }}
              />
              {/* Post image/avatar placeholder */}
              <div className="w-16 h-16 bg-purple-100 rounded-full mb-3 flex items-center justify-center self-center -mt-12 border-4 border-white shadow-lg">
                <svg className="w-8 h-8 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 21l4-4 4 4" /></svg>
              </div>
              {/* Post title */}
              <h3 className="text-xl font-semibold text-purple-800 mb-2">{post.title}</h3>
              {/* Post date */}
              <span className="text-xs text-gray-400 mb-2">{post.date}</span>
              {/* Post excerpt */}
              <p className="text-gray-700 mb-4 flex-1">{unescapeContent(post.content || post.excerpt)}</p>
              {/* Read more button */}
              <button
                className="bg-purple-700 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-purple-800 hover:scale-105 transition-transform duration-300 mt-auto"
                onClick={() => setModalPost(post)}
              >
                Read More
              </button>
            </div>
          ))}
        </div>
      )}
      {/* Blog post details modal */}
      {modalPost && <BlogModal post={modalPost} onClose={() => setModalPost(null)} />}
      {/* Add post modal (owner only) */}
      {isOwner && showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 animate-fade-in">
          <form onSubmit={handleAddPost} className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative flex flex-col gap-4">
            <button type="button" onClick={() => setShowAddModal(false)} className="absolute top-3 right-3 text-2xl text-purple-700 hover:text-purple-900">&times;</button>
            <h3 className="text-xl font-bold text-purple-800 mb-2">Add New Blog Post</h3>
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Title"
              value={newPost.title}
              onChange={e => setNewPost({ ...newPost, title: e.target.value })}
              required
            />
            <input
              type="date"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Date"
              value={newPost.date}
              onChange={e => setNewPost({ ...newPost, date: e.target.value })}
              required
            />
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Image URL (or leave blank for default)"
              value={newPost.image_url}
              onChange={e => setNewPost({ ...newPost, image_url: e.target.value })}
            />
            <input
              type="text"
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Excerpt"
              value={newPost.excerpt}
              onChange={e => setNewPost({ ...newPost, excerpt: e.target.value })}
              required
            />
            <textarea
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Full Text"
              value={newPost.full_text}
              onChange={e => setNewPost({ ...newPost, full_text: e.target.value })}
              rows={5}
              required
            />
            <button
              type="submit"
              className="bg-purple-700 text-white font-semibold rounded-lg px-6 py-2 shadow hover:bg-purple-800 transition mt-2"
            >
              Add Post
            </button>
          </form>
        </div>
      )}
      {/* Floating add button (owner only) */}
      {isOwner && (
        <button
          className="fixed bottom-56 right-6 z-40 bg-purple-700 hover:bg-purple-800 text-white rounded-full shadow-lg w-14 h-14 flex items-center justify-center text-3xl transition-all duration-300 focus:outline-none"
          aria-label="Add new blog post"
          onClick={() => setShowAddModal(true)}
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path d="M12 8v8M8 12h8" strokeWidth="2" /></svg>
        </button>
      )}
    </section>
  );
};

export default Blog; 