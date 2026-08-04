'use client';

import { useState, useEffect } from 'react';

const emptyJob = {
  title: '', type: 'Full-Time', location: 'Kano, Nigeria', department: '',
  summary: '', requirements: '', niceToHave: '', applyEmail: 'careers@caxietechnologies.com',
};

export default function AdminJobsPanel() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyJob);
  const [saving, setSaving] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/jobs');
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ ...emptyJob });
    setShowForm(true);
  };

  const openEdit = (job) => {
    setEditing(job);
    setForm({
      title: job.title || '', type: job.type || 'Full-Time', location: job.location || '',
      department: job.department || '', summary: job.summary || '',
      requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : (job.requirements || ''),
      niceToHave: Array.isArray(job.niceToHave) ? job.niceToHave.join('\n') : (job.niceToHave || ''),
      applyEmail: job.applyEmail || 'careers@caxietechnologies.com',
    });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        requirements: form.requirements.split('\n').map(s => s.trim()).filter(Boolean),
        niceToHave: form.niceToHave.split('\n').map(s => s.trim()).filter(Boolean),
        postedDate: editing?.postedDate || new Date().toISOString().slice(0, 10),
        id: editing?.id || `job-${Date.now()}`,
      };
      const url = editing ? `/api/admin/jobs/${editing.id}` : '/api/admin/jobs';
      const method = editing ? 'PUT' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Save failed');
      setShowForm(false);
      fetchJobs();
    } catch (e) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Remove this job listing?')) return;
    await fetch(`/api/admin/jobs/${id}`, { method: 'DELETE' });
    fetchJobs();
  };

  if (loading) return <LoadingState label="Loading job listings…" />;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-lg">Job Listings</h2>
          <p className="text-gray-500 text-sm">{jobs.length} open role{jobs.length !== 1 ? 's' : ''}</p>
        </div>
        <button onClick={openNew} className="btn-primary text-sm">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Role
        </button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm">{editing ? 'Edit Role' : 'New Role'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Job Title *</label>
              <input required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="admin-input w-full" placeholder="e.g. Senior Full-Stack Engineer" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="admin-input w-full">
                {['Full-Time', 'Part-Time', 'Contract', 'Internship'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Department</label>
              <input value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} className="admin-input w-full" placeholder="e.g. Engineering" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Location</label>
              <input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="admin-input w-full" />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs text-gray-400 mb-1">Summary *</label>
              <textarea required rows={4} value={form.summary} onChange={e => setForm(f => ({ ...f, summary: e.target.value }))} className="admin-input w-full resize-y" placeholder="Role description visible to applicants" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Requirements (one per line)</label>
              <textarea rows={6} value={form.requirements} onChange={e => setForm(f => ({ ...f, requirements: e.target.value }))} className="admin-input w-full resize-y font-mono text-xs" placeholder="3+ years experience&#10;Proficiency in React&#10;…" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Nice to have (one per line)</label>
              <textarea rows={6} value={form.niceToHave} onChange={e => setForm(f => ({ ...f, niceToHave: e.target.value }))} className="admin-input w-full resize-y font-mono text-xs" placeholder="CompTIA Security+&#10;Open source contributions&#10;…" />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1">Apply email</label>
              <input type="email" value={form.applyEmail} onChange={e => setForm(f => ({ ...f, applyEmail: e.target.value }))} className="admin-input w-full" />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Update Role' : 'Add Role'}</button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button>
          </div>
        </form>
      )}

      {jobs.length === 0 ? (
        <div className="text-center py-16 text-gray-600">
          <p className="mb-3">No open roles. The careers page will show the &ldquo;send us your CV&rdquo; fallback.</p>
          <button onClick={openNew} className="text-brand-400 hover:text-brand-300 text-sm">Add your first role</button>
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map(job => (
            <div key={job.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm">{job.title}</h3>
                <p className="text-gray-500 text-xs mt-0.5">{job.type} · {job.location} · {job.department}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(job)} className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">Edit</button>
                <button onClick={() => handleDelete(job.id)} className="text-xs text-red-500 hover:text-red-400 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function LoadingState({ label }) {
  return <div className="flex items-center gap-3 py-12 justify-center text-gray-500"><div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" /><span className="text-sm">{label}</span></div>;
}
