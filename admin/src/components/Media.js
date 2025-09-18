import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

function Media() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    category: 'Photography',
    description: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // Fetch ALL media from Supabase (including from blogs, projects, etc.)
  const fetchMedia = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching media...');
      
      // Fetch from media table
      const { data: mediaData, error: mediaError } = await supabase
        .from('media')
        .select('*')
        .order('uploaded_at', { ascending: false });

      if (mediaError) {
        console.error('Media table error:', mediaError.message);
        setError('Media table error: ' + mediaError.message);
      }

      // Ensure file_url is a public URL
      const mediaWithPublicUrls = (mediaData || []).map(item => {
        let url = item.file_url;
        if (url && url.startsWith('http://localhost')) {
          // Try to get public URL from Supabase Storage
          const { data: publicUrlData } = supabase.storage.from('media').getPublicUrl(item.file_name);
          if (publicUrlData && publicUrlData.publicUrl) {
            url = publicUrlData.publicUrl;
          }
        }
        return { ...item, url };
      });

      // Fetch blog images
      const { data: blogData, error: blogError } = await supabase
        .from('blogs')
        .select('id, title, image_url, created_at')
        .not('image_url', 'is', null);

      if (blogError) {
        console.log('Blog images error:', blogError.message);
      }

      // Fetch project images
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('id, title, image_url, created_at')
        .not('image_url', 'is', null);

      if (projectError) {
        console.log('Project images error:', projectError.message);
      }

      console.log('Media data:', mediaData);
      console.log('Blog data:', blogData);
      console.log('Project data:', projectData);

      // Combine all media with source information
      const allMedia = [
        ...mediaWithPublicUrls.map(item => ({
          ...item,
          source: 'media',
          display_title: item.file_name,
          filename: item.file_name,
          url: item.url,
          category: item.category || 'Other'
        })),
        ...(blogData || []).map(item => ({
          id: item.id,
          filename: `Blog: ${item.title}`,
          category: 'Blogs',
          url: item.image_url,
          created_at: item.created_at,
          source: 'blog',
          display_title: item.title
        })),
        ...(projectData || []).map(item => ({
          id: item.id,
          filename: `Project: ${item.title}`,
          category: 'Projects',
          url: item.image_url,
          created_at: item.created_at,
          source: 'project',
          display_title: item.title
        })),
        // Add locally stored media as fallback
        ...(JSON.parse(localStorage.getItem('localMedia') || '[]')).map(item => ({
          ...item,
          source: 'local',
          display_title: item.file_name,
          filename: item.file_name,
          url: item.file_url,
          category: item.category || 'Other'
        }))
      ];

      console.log('Combined media:', allMedia);

      // Sort by creation date
      allMedia.sort((a, b) => {
        const dateA = a.uploaded_at || a.created_at;
        const dateB = b.uploaded_at || b.created_at;
        return new Date(dateB) - new Date(dateA);
      });
      
      setMedia(allMedia);
    } catch (err) {
      console.error('Fetch media error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedia();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'file' && files && files[0]) {
      setSelectedFile(files[0]);
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
    
    if (!selectedFile) {
      setError('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      setError(null);

      // Upload file to Supabase Storage
      const fileName = `${formData.category}/${Date.now()}-${selectedFile.name}`;
      const { error: uploadError } = await supabase.storage
        .from('media')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data: urlData } = supabase.storage
        .from('media')
        .getPublicUrl(fileName);

      // Save media record to database
      const { error: dbError } = await supabase
        .from('media')
        .insert([{
          file_name: selectedFile.name,
          file_url: urlData.publicUrl,
          category: formData.category,
          uploaded_at: new Date().toISOString()
        }]);

      if (dbError) throw dbError;

      // Reset form and refresh data
      setFormData({
        category: 'Photography',
        description: ''
      });
      setSelectedFile(null);
      setShowForm(false);
      fetchMedia();
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  // Handle delete
  const handleDelete = async (mediaItem) => {
    const sourceText = mediaItem.source === 'blog' ? 'blog post' : 
                      mediaItem.source === 'project' ? 'project' : 'media file';
    
    if (window.confirm(`Are you sure you want to delete this ${sourceText}?`)) {
      try {
        if (mediaItem.source === 'media') {
          // Extract storage path from file_url
          let storagePath = '';
          try {
            const urlParts = mediaItem.file_url.split('/object/public/media/');
            if (urlParts.length === 2) {
              storagePath = urlParts[1];
            } else {
              storagePath = `${mediaItem.category}/${mediaItem.file_name}`;
            }
          } catch {
            storagePath = `${mediaItem.category}/${mediaItem.file_name}`;
          }
          console.log('Attempting to delete storage path:', storagePath);
          const { error: storageError } = await supabase.storage
            .from('media')
            .remove([storagePath]);
          if (storageError) {
            console.error('Supabase storage delete error:', storageError.message);
            setError('Storage delete error: ' + storageError.message);
            return;
          }
          // Delete from database
          const { error: dbError } = await supabase
            .from('media')
            .delete()
            .eq('id', mediaItem.id);
          if (dbError) {
            console.error('Supabase DB delete error:', dbError.message);
            setError('DB delete error: ' + dbError.message);
            return;
          }
        } else if (mediaItem.source === 'blog') {
          // Remove image from blog
          const { error } = await supabase
            .from('blogs')
            .update({ image_url: null })
            .eq('id', mediaItem.id);

          if (error) throw error;
        } else if (mediaItem.source === 'project') {
          // Remove image from project
          const { error } = await supabase
            .from('projects')
            .update({ image_url: null })
            .eq('id', mediaItem.id);

          if (error) throw error;
        }
        
        fetchMedia();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  // Cancel form
  const handleCancel = () => {
    setFormData({
      category: 'Photography',
      description: ''
    });
    setSelectedFile(null);
    setShowForm(false);
  };

  // Group media by category
  const groupedMedia = media.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Debug: print all category values
  console.log('Media array:', media);

  // Show all category values for debugging
  // (You can remove this after debugging)
  const categoryList = media.map(m => m.category);

  // Compute category breakdown with normalization
  const categoryCounts = media.reduce((acc, item) => {
    let cat = (item.category || 'Other').trim();
    cat = cat.charAt(0).toUpperCase() + cat.slice(1).toLowerCase();
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});
  console.log('Category counts:', categoryCounts);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Loading media...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Media Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-purple-600 text-white px-3 py-2 sm:px-4 sm:py-2 rounded hover:bg-purple-700 w-full sm:w-auto"
        >
          Upload Media
        </button>
      </div>

      {/* Debug: show all category values */}
      <pre className="mb-2 text-xs text-gray-400 bg-gray-50 p-2 rounded">{JSON.stringify(categoryList, null, 2)}</pre>

      {/* Category breakdown */}
      {Object.keys(categoryCounts).length === 0 ? (
        <div className="mb-4 text-gray-500">No media found in any category.</div>
      ) : (
        <div className="mb-4 flex flex-wrap gap-4">
          {Object.entries(categoryCounts).map(([cat, count]) => (
            <div key={cat} className="bg-purple-100 text-purple-800 px-4 py-2 rounded shadow">
              <span className="font-semibold">{cat}:</span> {count}
            </div>
          ))}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {/* Upload Form */}
      {showForm && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Upload New Media</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  <option value="Photography">Photography</option>
                  <option value="Image Artistry">Image Artistry</option>
                  <option value="Web">Web</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  File *
                </label>
                <input
                  type="file"
                  name="file"
                  accept="image/*,video/*"
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                {selectedFile && (
                  <p className="text-sm text-green-600 mt-1">
                    Selected: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                  </p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="3"
                placeholder="Optional description for this media file..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={uploading}
                className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
              >
                {uploading ? 'Uploading...' : 'Upload'}
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

      {/* Media Gallery */}
      <div className="space-y-6">
        {Object.keys(groupedMedia).length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No media files found. Upload your first file!
          </div>
        ) : (
          Object.entries(groupedMedia).map(([category, categoryMedia]) => (
            <div key={category} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">{category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {categoryMedia.map((item) => (
                  <div key={item.id} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {item.url ? (
                        <img 
                          src={item.url} 
                          alt={item.filename || item.display_title}
                          className="w-full h-full object-cover"
                          onError={e => { e.target.onerror = null; e.target.src = '/img_logo.png'; }}
                        />
                      ) : (
                        <img 
                          src={'/img_logo.png'}
                          alt="No media"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <button
                        onClick={() => handleDelete(item)}
                        className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-600 truncate" title={item.display_title}>
                        {item.display_title}
                      </p>
                      <p className="text-xs text-purple-600 font-medium">
                        {item.source === 'blog' ? '📝 Blog' : 
                         item.source === 'project' ? '💼 Project' : 
                         `📁 ${item.category}`}
                      </p>
                      {item.description && (
                        <p className="text-xs text-gray-500 truncate" title={item.description}>
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Media; 