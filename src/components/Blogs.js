import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image_url: ''
  });
  const [imageFile, setImageFile] = useState(null);

  // Fetch blogs from Supabase
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setBlogs(data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files[0]) {
      setImageFile(files[0]);
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let imageUrl = formData.image_url;
      
      // Upload image if provided
      if (imageFile) {
        const fileName = `blog-${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('blog-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('blog-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      const blogData = {
        title: formData.title,
        content: formData.content,
        image_url: imageUrl
      };

      if (editingBlog) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update({
            ...blogData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingBlog.id);

        if (error) throw error;
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([blogData]);

        if (error) throw error;
      }

      // Reset form and refresh data
      setFormData({ title: '', content: '', image_url: '' });
      setImageFile(null);
      setShowForm(false);
      setEditingBlog(null);
      fetchBlogs();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      image_url: blog.image_url || ''
    });
    setImageFile(null);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const { error } = await supabase
          .from('blogs')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchBlogs();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({ title: '', content: '', image_url: '' });
    setImageFile(null);
    setShowForm(false);
    setEditingBlog(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading blogs...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Blog Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
        >
          Add New Blog
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Blog Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                required
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image (optional)
              </label>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              {imageFile && (
                <p className="text-sm text-green-600 mt-1">Selected: {imageFile.name}</p>
              )}
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              >
                {editingBlog ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {blogs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No blogs found. Create your first blog post!
          </div>
        ) : (
          blogs.map((blog) => (
            <div key={blog.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {blog.image_url && (
                <div className="mb-4">
                  <img 
                    src={blog.image_url} 
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={e => { e.target.onerror = null; e.target.src = '/img_logo.png'; }}
                  />
                </div>
              )}
              <p className="text-gray-600 mb-4">{blog.content}</p>
              <div className="text-sm text-gray-500">
                Created: {new Date(blog.created_at).toLocaleDateString()}
                {blog.updated_at !== blog.created_at && (
                  <span className="ml-4">
                    Updated: {new Date(blog.updated_at).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Blogs; 