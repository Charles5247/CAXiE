'use client';

import { useState, useEffect } from 'react';

export default function AdminBlogPanel() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', content: '', excerpt: '', image_url: '', published: false });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/blog');
      if (!res.ok) throw new Error('Failed to fetch posts');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchPosts(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', content: '', excerpt: '', image_url: '', published: false });
    setImageFile(null);
    setImagePreview('');
    setShowForm(true);
  };

  const openEdit = (post) => {
    setEditing(post);
    setForm({ title: post.title || '', content: post.content || '', excerpt: post.excerpt || '', image_url: post.image_url || '', published: !!post.published });
    setImageFile(null);
    setImagePreview(post.image_url || '');
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form };
      if (imageFile) {
        const reader = new FileReader();
        const base64 = await new Promise((resolve, reject) => {
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(imageFile);
        });
        payload.image_url = base64;
      }

      const url = editing ? `/api/admin/blog/${editing.id}` : '/api/admin/blog';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Save failed');
      setShowForm(false);
      setImageFile(null);
      setImagePreview('');
      fetchPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post permanently?')) return;
    setDeleteId(id);
    try {
      const res = await fetch(`/api/admin/blog/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchPosts();
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <LoadingState label="Loading blog posts…" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-lg">Blog Posts</h2>
          <p className="text-gray-500 text-sm">{posts.length} post{posts.length !== 1 ? 's' : ''} in Supabase</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </button>
      </div>

      {error && <ErrorBanner message={error} onDismiss={() => setError('')} />}

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm">{editing ? 'Edit Post' : 'New Post'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="admin-input w-full" placeholder="Post title" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Excerpt</label>
              <input value={form.excerpt} onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))} className="admin-input w-full" placeholder="Short summary for listing page" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Content *</label>
              <textarea required rows={8} value={form.content} onChange={e => setForm(f => ({ ...f, content: e.target.value }))} className="admin-input w-full resize-y" placeholder="Post content (Markdown supported)" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Cover image</label>
              <input type="file" accept="image/*" onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageFile(file);
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => setImagePreview(reader.result);
                  reader.readAsDataURL(file);
                } else {
                  setImagePreview(form.image_url || '');
                }
              }} className="admin-input w-full" />
              <p className="text-[11px] text-gray-500 mt-2">Upload a local image. The file is saved as a data URL in the post record.</p>
              {imagePreview && (
                <div className="mt-3 overflow-hidden rounded-xl border border-white/10 bg-black/20">
                  <img src={imagePreview} alt="Preview" className="h-40 w-full object-cover" />
                </div>
              )}
            </div>
            <div className="flex items-center gap-3 pt-4">
              <input type="checkbox" id="published" checked={form.published} onChange={e => setForm(f => ({ ...f, published: e.target.checked }))} className="w-4 h-4 accent-brand-600" />
              <label htmlFor="published" className="text-sm text-gray-300">Published (visible on site)</label>
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Update Post' : 'Create Post'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {posts.length === 0 ? (
        <EmptyState label="No blog posts yet" action="Create your first post" onClick={openNew} />
      ) : (
        <div className="space-y-3">
          {posts.map(post => (
            <div key={post.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-4 hover:border-white/20 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium text-white text-sm truncate">{post.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ${post.published ? 'text-green-400 bg-green-400/10 border-green-400/20' : 'text-gray-500 bg-white/5 border-white/10'}`}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="text-gray-500 text-xs truncate">{post.excerpt || post.content?.substring(0, 80) || 'No content'}</p>
                <p className="text-gray-600 text-xs mt-1">{post.created_at ? new Date(post.created_at).toLocaleDateString() : 'Unknown date'}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => openEdit(post)} className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(post.id)} disabled={deleteId === post.id} className="text-xs text-red-500 hover:text-red-400 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-50">
                  {deleteId === post.id ? '…' : 'Delete'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingState({ label }) {
  return (
    <div className="flex items-center gap-3 py-12 justify-center text-gray-500">
      <div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 text-red-400 hover:text-red-300 text-lg leading-none">&times;</button>
    </div>
  );
}

function EmptyState({ label, action, onClick }) {
  return (
    <div className="text-center py-16 text-gray-600">
      <p className="mb-3">{label}</p>
      {action && onClick && (
        <button onClick={onClick} className="text-brand-400 hover:text-brand-300 text-sm transition-colors">{action}</button>
      )}
    </div>
  );
}
