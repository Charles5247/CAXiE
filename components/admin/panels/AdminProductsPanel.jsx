'use client';

import { useState, useEffect } from 'react';

const statusOptions = ['Concept', 'Concept / Design', 'In Development', 'Beta', 'Live', 'Discontinued'];
const iconOptions = ['shield', 'chart', 'lock', 'code', 'globe', 'database'];

const empty = { name: '', tagline: '', category: '', status: 'Concept', description: '', features: '', targetAudience: '', stage: '', color: 'text-brand-400', bg: 'bg-brand-600/10 border-brand-600/20', icon: 'shield' };

export default function AdminProductsPanel() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const fetch_ = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/products');
      const data = await res.json();
      setProducts(data.products || []);
    } catch (e) { setError(e.message); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetch_(); }, []);

  const openNew = () => { setEditing(null); setForm({ ...empty }); setShowForm(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({ ...p, features: Array.isArray(p.features) ? p.features.join('\n') : (p.features || '') });
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault(); setSaving(true);
    try {
      const payload = { ...form, features: form.features.split('\n').map(s => s.trim()).filter(Boolean), id: editing?.id || form.name.toLowerCase().replace(/\s+/g, '-') };
      const url = editing ? `/api/admin/products/${editing.id}` : '/api/admin/products';
      const res = await fetch(url, { method: editing ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error('Save failed');
      setShowForm(false); fetch_();
    } catch (e) { setError(e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
    fetch_();
  };

  if (loading) return <div className="flex items-center gap-3 py-12 justify-center text-gray-500"><div className="w-5 h-5 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" /><span className="text-sm">Loading products…</span></div>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div><h2 className="font-display font-bold text-white text-lg">Products</h2><p className="text-gray-500 text-sm">{products.length} product{products.length !== 1 ? 's' : ''}</p></div>
        <button onClick={openNew} className="btn-primary text-sm"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>Add Product</button>
      </div>

      {error && <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">{error}</div>}

      {showForm && (
        <form onSubmit={handleSave} className="bg-white/5 border border-white/10 rounded-xl p-5 space-y-4">
          <h3 className="font-semibold text-white text-sm">{editing ? 'Edit Product' : 'New Product'}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className="block text-xs text-gray-400 mb-1">Name *</label><input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Category</label><input value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="admin-input w-full" /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-gray-400 mb-1">Tagline</label><input value={form.tagline} onChange={e => setForm(f => ({ ...f, tagline: e.target.value }))} className="admin-input w-full" /></div>
            <div><label className="block text-xs text-gray-400 mb-1">Status</label><select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))} className="admin-input w-full">{statusOptions.map(s => <option key={s}>{s}</option>)}</select></div>
            <div><label className="block text-xs text-gray-400 mb-1">Stage</label><input value={form.stage} onChange={e => setForm(f => ({ ...f, stage: e.target.value }))} className="admin-input w-full" placeholder="e.g. Private beta — Q1 2026" /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-gray-400 mb-1">Description *</label><textarea required rows={4} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="admin-input w-full resize-y" /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-gray-400 mb-1">Features (one per line)</label><textarea rows={5} value={form.features} onChange={e => setForm(f => ({ ...f, features: e.target.value }))} className="admin-input w-full resize-y font-mono text-xs" /></div>
            <div className="sm:col-span-2"><label className="block text-xs text-gray-400 mb-1">Target Audience</label><input value={form.targetAudience} onChange={e => setForm(f => ({ ...f, targetAudience: e.target.value }))} className="admin-input w-full" /></div>
          </div>
          <div className="flex gap-3"><button type="submit" disabled={saving} className="btn-primary text-sm disabled:opacity-50">{saving ? 'Saving…' : editing ? 'Update' : 'Create'}</button><button type="button" onClick={() => setShowForm(false)} className="btn-secondary text-sm">Cancel</button></div>
        </form>
      )}

      {products.length === 0 ? (
        <div className="text-center py-16 text-gray-600"><p className="mb-3">No products yet.</p><button onClick={openNew} className="text-brand-400 text-sm">Add your first product</button></div>
      ) : (
        <div className="space-y-3">
          {products.map(p => (
            <div key={p.id} className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 flex items-start gap-4">
              <div className="flex-1 min-w-0"><h3 className="font-medium text-white text-sm">{p.name}</h3><p className="text-gray-500 text-xs mt-0.5">{p.category} · {p.status}</p><p className="text-gray-600 text-xs mt-0.5 truncate">{p.tagline}</p></div>
              <div className="flex gap-2"><button onClick={() => openEdit(p)} className="text-xs text-gray-400 hover:text-white px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">Edit</button><button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 transition-colors">Delete</button></div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
