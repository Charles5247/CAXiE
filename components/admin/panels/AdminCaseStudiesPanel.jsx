'use client';

import { useEffect, useState } from 'react';

export default function AdminCaseStudiesPanel() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', slug: '', category: '', summary: '', description: '', status: 'Published', href: '' });
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/case-studies');
      if (!res.ok) throw new Error('Failed to load case studies');
      const data = await res.json();
      setCaseStudies(data.caseStudies || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', slug: '', category: '', summary: '', description: '', status: 'Published', href: '' });
    setShowForm(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({ title: item.title || '', slug: item.slug || '', category: item.category || '', summary: item.summary || '', description: item.description || '', status: item.status || 'Published', href: item.href || '' });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editing ? `/api/admin/case-studies/${editing.id}` : '/api/admin/case-studies';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('Save failed');
      setShowForm(false);
      fetchCaseStudies();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this case study?')) return;
    setDeleteId(id);
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      fetchCaseStudies();
    } catch (e) {
      setError(e.message);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="font-display font-bold text-white text-lg">Case Studies</h2>
          <p className="text-gray-500 text-sm">{caseStudies.length} case study entries</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">New Case Study</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm">{editing ? 'Edit Case Study' : 'New Case Study'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Title *</label>
              <input required value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="admin-input w-full" placeholder="Client or project name" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Slug</label>
              <input value={form.slug} onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))} className="admin-input w-full" placeholder="dala-orthopedic" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Category</label>
              <input value={form.category} onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))} className="admin-input w-full" placeholder="Healthcare · Digital Transformation" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Summary</label>
              <input value={form.summary} onChange={(e) => setForm((f) => ({ ...f, summary: e.target.value }))} className="admin-input w-full" placeholder="Short summary shown on the preview card" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Description</label>
              <textarea rows={5} value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="admin-input w-full resize-y" placeholder="Long form case study description" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Status</label>
              <input value={form.status} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))} className="admin-input w-full" placeholder="Published" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Route</label>
              <input value={form.href} onChange={(e) => setForm((f) => ({ ...f, href: e.target.value }))} className="admin-input w-full" placeholder="/case-studies/client-name" />
            </div>
          </div>
          <div className="flex gap-3 pt-2">
            <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Update Case Study' : 'Create Case Study'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {loading ? (
        <div className="text-sm text-gray-500">Loading case studies…</div>
      ) : caseStudies.length === 0 ? (
        <div className="text-sm text-gray-500">No case studies yet.</div>
      ) : (
        <div className="space-y-3">
          {caseStudies.map((cs) => (
            <div key={cs.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="font-medium text-white text-sm">{cs.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{cs.category || 'General'} · {cs.status || 'Draft'}</p>
                <p className="text-gray-500 text-xs mt-1 line-clamp-2">{cs.summary || cs.description || 'No summary yet.'}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => openEdit(cs)} className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(cs.id)} disabled={deleteId === cs.id} className="text-xs text-red-500 hover:text-red-400 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors disabled:opacity-50">{deleteId === cs.id ? '…' : 'Delete'}</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
