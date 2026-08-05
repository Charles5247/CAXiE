'use client';

import { useState, useEffect, useCallback } from 'react';

const EMPTY_FORM = {
  name: '',
  shortName: '',
  title: '',
  bio: '',
  photo: '',
  specialties: '',
  social_twitter: '',
  social_linkedin: '',
  social_github: '',
  social_instagram: '',
};

export default function AdminTeamPanel() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editing, setEditing] = useState(null); // member id or 'new'
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const fetchMembers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/team');
      if (!res.ok) throw new Error('Failed to load team');
      setMembers(await res.json());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchMembers(); }, [fetchMembers]);

  const flash = (msg, isError = false) => {
    if (isError) { setError(msg); setTimeout(() => setError(''), 4000); }
    else { setSuccess(msg); setTimeout(() => setSuccess(''), 4000); }
  };

  const openNew = () => {
    setForm(EMPTY_FORM);
    setEditing('new');
  };

  const openEdit = (m) => {
    setForm({
      name: m.name || '',
      shortName: m.shortName || '',
      title: m.title || '',
      bio: m.bio || '',
      photo: m.photo || '',
      specialties: Array.isArray(m.specialties) ? m.specialties.join(', ') : (m.specialties || ''),
      social_twitter: m.social?.twitter || '',
      social_linkedin: m.social?.linkedin || '',
      social_github: m.social?.github || '',
      social_instagram: m.social?.instagram || '',
    });
    setEditing(m.id);
  };

  const cancelEdit = () => { setEditing(null); setForm(EMPTY_FORM); };

  const handleSave = async () => {
    if (!form.name.trim()) { flash('Name is required.', true); return; }
    setSaving(true);
    try {
      const payload = {
        name: form.name.trim(),
        shortName: form.shortName.trim(),
        title: form.title.trim(),
        bio: form.bio.trim(),
        photo: form.photo.trim() || null,
        specialties: form.specialties.split(',').map((s) => s.trim()).filter(Boolean),
        social: {
          twitter: form.social_twitter.trim(),
          linkedin: form.social_linkedin.trim(),
          github: form.social_github.trim(),
          instagram: form.social_instagram.trim(),
        },
      };

      let res;
      if (editing === 'new') {
        res = await fetch('/api/admin/team', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`/api/admin/team/${editing}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Save failed');
      }

      flash(editing === 'new' ? 'Team member added.' : 'Team member updated.');
      cancelEdit();
      await fetchMembers();
    } catch (e) {
      flash(e.message, true);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/admin/team/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Delete failed');
      flash('Team member removed.');
      setDeleteConfirm(null);
      await fetchMembers();
    } catch (e) {
      flash(e.message, true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display font-bold text-white text-xl">Team Members</h2>
          <p className="text-gray-500 text-sm mt-1">Manage the team shown on the /about page.</p>
        </div>
        {editing === null && (
          <button onClick={openNew} className="btn-primary text-sm py-2 px-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Member
          </button>
        )}
      </div>

      {/* Alerts */}
      {error && <div className="bg-red-400/10 border border-red-400/30 text-red-300 text-sm rounded-xl px-4 py-3">{error}</div>}
      {success && <div className="bg-green-400/10 border border-green-400/30 text-green-300 text-sm rounded-xl px-4 py-3">{success}</div>}

      {/* Form */}
      {editing !== null && (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">
          <h3 className="font-display font-semibold text-white text-base">
            {editing === 'new' ? 'Add New Team Member' : 'Edit Team Member'}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Full Name *</label>
              <input
                className="admin-input w-full"
                placeholder="e.g. Ekechukwuemeka Charles Xavier"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs text-gray-400 mb-1.5">Short / Display Name</label>
              <input
                className="admin-input w-full"
                placeholder="e.g. Charles Xavier"
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Title / Role</label>
            <input
              className="admin-input w-full"
              placeholder="e.g. Founder & CEO"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Bio</label>
            <textarea
              className="admin-input w-full resize-none"
              rows={4}
              placeholder="Short bio paragraph..."
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Photo URL</label>
            <input
              className="admin-input w-full"
              placeholder="/profile.JPG or https://..."
              value={form.photo}
              onChange={(e) => setForm({ ...form, photo: e.target.value })}
            />
            <p className="text-gray-600 text-xs mt-1">Leave blank to show initials avatar. Use /filename.jpg for images in public/.</p>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1.5">Specialties (comma-separated)</label>
            <input
              className="admin-input w-full"
              placeholder="Cybersecurity, ICT Infrastructure, Fractional CTO"
              value={form.specialties}
              onChange={(e) => setForm({ ...form, specialties: e.target.value })}
            />
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider font-medium">Social Links (optional)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">Twitter / X URL</label>
                <input
                  className="admin-input w-full"
                  placeholder="https://x.com/handle"
                  value={form.social_twitter}
                  onChange={(e) => setForm({ ...form, social_twitter: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">LinkedIn URL</label>
                <input
                  className="admin-input w-full"
                  placeholder="https://linkedin.com/in/..."
                  value={form.social_linkedin}
                  onChange={(e) => setForm({ ...form, social_linkedin: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">GitHub URL</label>
                <input
                  className="admin-input w-full"
                  placeholder="https://github.com/..."
                  value={form.social_github}
                  onChange={(e) => setForm({ ...form, social_github: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">Instagram URL</label>
                <input
                  className="admin-input w-full"
                  placeholder="https://instagram.com/..."
                  value={form.social_instagram}
                  onChange={(e) => setForm({ ...form, social_instagram: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleSave}
              disabled={saving}
              className="btn-primary text-sm py-2 px-5 disabled:opacity-60"
            >
              {saving ? 'Saving…' : editing === 'new' ? 'Add Member' : 'Save Changes'}
            </button>
            <button
              onClick={cancelEdit}
              className="btn-ghost text-sm py-2"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members list */}
      {loading ? (
        <div className="text-gray-500 text-sm py-8 text-center">Loading team…</div>
      ) : members.length === 0 ? (
        <div className="text-center py-12 bg-white/5 border border-white/10 rounded-2xl">
          <p className="text-gray-500 text-sm">No team members yet.</p>
          <button onClick={openNew} className="mt-4 btn-primary text-sm py-2">Add First Member</button>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((m) => (
            <div
              key={m.id}
              className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-start gap-4 hover:border-white/20 transition-colors"
            >
              {/* Avatar */}
              <div className="w-11 h-11 rounded-full flex-shrink-0 overflow-hidden bg-brand-600/20 border border-brand-600/30 flex items-center justify-center">
                {m.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={m.photo} alt={m.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-brand-400 font-bold text-sm">
                    {(m.shortName || m.name || '?').charAt(0).toUpperCase()}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-white text-sm">{m.name}</p>
                  {m.title && (
                    <span className="text-xs text-gray-500 bg-white/5 px-2 py-0.5 rounded-full">{m.title}</span>
                  )}
                </div>
                {m.bio && (
                  <p className="text-gray-500 text-xs mt-1 line-clamp-2">{m.bio}</p>
                )}
                {m.specialties?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {m.specialties.map((s) => (
                      <span key={s} className="text-xs bg-brand-600/10 text-brand-400 border border-brand-600/20 px-2 py-0.5 rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => openEdit(m)}
                  className="p-2 text-gray-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  aria-label={`Edit ${m.name}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                {deleteConfirm === m.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleDelete(m.id)}
                      className="text-xs text-red-400 hover:text-red-300 font-medium px-2 py-1 rounded-lg hover:bg-red-400/10 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="text-xs text-gray-500 hover:text-gray-300 px-2 py-1 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirm(m.id)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                    aria-label={`Delete ${m.name}`}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
