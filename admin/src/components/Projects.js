import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    client: '',
    duration: '',
    link: '',
    image_url: '',
    category: 'Web Development'
  });

  // Fetch projects from Supabase (only tech projects, not photography/image artistry)
  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .not('category', 'eq', 'Photography')
        .not('category', 'eq', 'Image Artistry')
        .order('created_at', { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setProjects(data || []);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
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
        const fileName = `project-${Date.now()}-${imageFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from('project-images')
          .upload(fileName, imageFile);

        if (uploadError) throw uploadError;
        
        // Get public URL
        const { data: urlData } = supabase.storage
          .from('project-images')
          .getPublicUrl(fileName);
        
        imageUrl = urlData.publicUrl;
      }

      const projectData = {
        title: formData.title,
        description: formData.description,
        client: formData.client,
        duration: formData.duration,
        link: formData.link,
        image_url: imageUrl,
        category: formData.category
      };

      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update({
            ...projectData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingProject.id);

        if (error) throw error;
      } else {
        // Create new project
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);

        if (error) throw error;
      }

      // Reset form and refresh data
      setFormData({
        title: '',
        description: '',
        client: '',
        duration: '',
        link: '',
        image_url: '',
        category: 'Web Development'
      });
      setImageFile(null);
      setShowForm(false);
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle edit
  const handleEdit = (project) => {
    setEditingProject(project);
          setFormData({
        title: project.title,
        description: project.description,
        client: project.client,
        duration: project.duration,
        link: project.link,
        image_url: project.image_url || '',
        category: project.category || 'Web Development'
      });
    setImageFile(null);
    setShowForm(true);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const { error } = await supabase
          .from('projects')
          .delete()
          .eq('id', id);

        if (error) throw error;
        fetchProjects();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
          setFormData({
        title: '',
        description: '',
        client: '',
        duration: '',
        link: '',
        image_url: '',
        category: 'Web Development'
      });
    setImageFile(null);
    setShowForm(false);
    setEditingProject(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Project Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
        >
          Add New Project
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Project Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
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
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Web Development">Web Development</option>
                  <option value="Data Analytics">Data Analytics</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="DevOps">DevOps</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Client
                </label>
                <input
                  type="text"
                  name="client"
                  value={formData.client}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Duration
                </label>
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 3 months"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Project Link
                </label>
                <input
                  type="url"
                  name="link"
                  value={formData.link}
                  onChange={handleInputChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Image (optional)
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
                {editingProject ? 'Update' : 'Create'}
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

      {/* Projects List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            No projects found. Create your first project!
          </div>
        ) : (
          projects.map((project) => (
            <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {project.image_url && (
                <div className="mb-4">
                  <img 
                    src={project.image_url} 
                    alt={project.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={e => { e.target.onerror = null; e.target.src = '/img_logo.png'; }}
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-gray-800">{project.title}</h3>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleEdit(project)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-xs hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    >
                      Delete
                    </button>
              </div>
            </div>
                <p className="text-gray-600 mb-3 line-clamp-3">{project.description}</p>
                <div className="space-y-1 text-sm text-gray-500">
                  {project.client && (
                    <div><strong>Client:</strong> {project.client}</div>
                  )}
                  {project.duration && (
                    <div><strong>Duration:</strong> {project.duration}</div>
                  )}
                  {project.link && (
                    <div>
                      <strong>Link:</strong> 
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline ml-1">
                        View Project
                      </a>
                    </div>
                  )}
        </div>
                <div className="text-xs text-gray-400 mt-3">
                  Created: {new Date(project.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
        </div>
  );
}

export default Projects; 