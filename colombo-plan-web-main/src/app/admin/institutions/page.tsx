'use client';

import { useState, useEffect, useRef } from 'react';
import { Building2, Pencil, Trash2, Plus, X, UploadCloud, FileText } from 'lucide-react';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function AdminInstitutionsPage() {
  const [institutions, setInstitutions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const thumbnailInputRef = useRef(null);
  const attachmentInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [regionTag, setRegionTag] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [description, setDescription] = useState('');
  const [cardsJson, setCardsJson] = useState('');

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [existingThumbnailUrl, setExistingThumbnailUrl] = useState('');
  const [attachmentFile, setAttachmentFile] = useState(null);
  const [existingAttachmentUrl, setExistingAttachmentUrl] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const fetchInstitutions = () => {
    fetch(`${API}/api/institutions`)
      .then((res) => res.json())
      .then(setInstitutions)
      .catch(() => setInstitutions([]));
  };

  useEffect(() => {
    fetchInstitutions();
  }, []);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setSlugTouched(false);
    setRegionTag('');
    setContactPerson('');
    setDescription('');
    setCardsJson('');
    setThumbnailFile(null);
    setExistingThumbnailUrl('');
    setAttachmentFile(null);
    setExistingAttachmentUrl('');
    setEditingId(null);
    setMessage('');
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = '';
    if (attachmentInputRef.current) attachmentInputRef.current.value = '';
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const openEditForm = (inst) => {
    setEditingId(inst.id);
    setTitle(inst.title || '');
    setSlug(inst.slug || slugify(inst.title || ''));
    setSlugTouched(!!inst.slug);
    setRegionTag(inst.regionTag || '');
    setContactPerson(inst.contactPerson || '');
    setDescription(inst.description || '');
    setCardsJson(inst.cardsJson || '');
    setExistingThumbnailUrl(inst.thumbnailUrl || '');
    setExistingAttachmentUrl(inst.attachmentUrl || '');
    setThumbnailFile(null);
    setAttachmentFile(null);
    setMessage('');
    setShowForm(true);
  };

  const handleThumbnailChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(selected.type)) {
      setMessage('Thumbnail must be an image file (JPG/PNG/WEBP).');
      return;
    }
    setMessage('');
    setThumbnailFile(selected);
  };

  const handleAttachmentChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    setMessage('');
    setAttachmentFile(selected);
  };

  const uploadFile = async (fileToUpload) => {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    const res = await fetch(`${API}/api/upload`, { method: 'POST', body: formData });
    if (res.ok) return await res.text();
    throw new Error('Upload failed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      setMessage('Title is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      let thumbnailUrl = existingThumbnailUrl;
      let attachmentUrl = existingAttachmentUrl;

      if (thumbnailFile) {
        try {
          thumbnailUrl = await uploadFile(thumbnailFile);
        } catch {
          setMessage('Thumbnail upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      if (attachmentFile) {
        try {
          attachmentUrl = await uploadFile(attachmentFile);
        } catch {
          setMessage('Attachment upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      const payload = {
        title,
        slug: slug || slugify(title),
        regionTag,
        contactPerson,
        description,
        thumbnailUrl,
        attachmentUrl,
        cardsJson,
      };

      const url = editingId ? `${API}/api/institutions/${editingId}` : `${API}/api/institutions`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        resetForm();
        fetchInstitutions();
      } else {
        setMessage('Failed to save. Please try again.');
      }
    } catch {
      setMessage('Could not connect to the server.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this institution?')) return;
    await fetch(`${API}/api/institutions/${id}`, { method: 'DELETE' });
    fetchInstitutions();
  };

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>Government Institutions</h2>
          <p style={styles.subtitle}>Manage institutions shown on the public site</p>
        </div>
        <button onClick={openAddForm} style={styles.addButton}>
          <Plus size={16} />
          Add New Institution
        </button>
      </div>

      <div style={styles.grid}>
        {institutions.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No institutions yet. Click "Add New Institution" to get started.</p>
          </div>
        ) : (
          institutions.map((inst) => (
            <div key={inst.id} style={styles.card}>
              <div style={styles.cardImage}>
                {inst.thumbnailUrl ? (
                  <img src={inst.thumbnailUrl.startsWith('http') ? inst.thumbnailUrl : API + inst.thumbnailUrl} alt={inst.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <Building2 size={26} color="#94a3b8" />
                )}
              </div>
              <div style={styles.cardBody}>
                {inst.regionTag && <span style={styles.badge}>{inst.regionTag}</span>}
                <p style={styles.cardTitle}>{inst.title}</p>
                {inst.contactPerson && <p style={styles.metaText}>{inst.contactPerson}</p>}
                <p style={styles.cardDesc}>{inst.description || 'No description provided.'}</p>
                <div style={styles.cardActions}>
                  <button onClick={() => openEditForm(inst)} style={styles.editBtn}>
                    <Pencil size={13} /> Edit
                  </button>
                  <button onClick={() => handleDelete(inst.id)} style={styles.deleteBtn}>
                    <Trash2 size={13} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <h3 style={styles.modalTitle}>{editingId ? 'Edit Institution' : 'Add New Institution'}</h3>
              <button onClick={() => setShowForm(false)} style={styles.closeBtn}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.row2}>
                <div>
                  <label style={styles.label}>Title *</label>
                  <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Ministry of Health" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>URL Slug</label>
                  <input type="text" value={slug} onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }} placeholder="ministry-of-health" style={styles.slugInput} />
                </div>
              </div>

              <div style={styles.row2}>
                <div>
                  <label style={styles.label}>Region Tag</label>
                  <input type="text" value={regionTag} onChange={(e) => setRegionTag(e.target.value)} placeholder="e.g. HQ Region" style={styles.input} />
                </div>
                <div>
                  <label style={styles.label}>Contact Person</label>
                  <input type="text" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} placeholder="e.g. Director-DAP" style={styles.input} />
                </div>
              </div>

              <div>
                <label style={styles.label}>Description</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} placeholder="Short description..." style={styles.textarea} />
              </div>

              <div>
                <label style={styles.label}>Thumbnail image</label>
                <label style={styles.uploadLabel}>
                  <UploadCloud size={18} color="#64748b" />
                  <span style={{ fontSize: '13px', color: thumbnailFile ? '#0f172a' : '#94a3b8' }}>
                    {thumbnailFile ? thumbnailFile.name : existingThumbnailUrl ? 'Current image attached (click to replace)' : 'Choose an image'}
                  </span>
                  <input ref={thumbnailInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleThumbnailChange} style={{ display: 'none' }} />
                </label>
              </div>

              <div>
                <label style={styles.label}>Document / PDF / Image attachment</label>
                <label style={styles.uploadLabel}>
                  <FileText size={18} color="#64748b" />
                  <span style={{ fontSize: '13px', color: attachmentFile ? '#0f172a' : '#94a3b8' }}>
                    {attachmentFile ? attachmentFile.name : existingAttachmentUrl ? 'Current file attached (click to replace)' : 'Choose a file'}
                  </span>
                  <input ref={attachmentInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={handleAttachmentChange} style={{ display: 'none' }} />
                </label>
              </div>

              <div>
                <label style={styles.label}>Cards JSON (optional)</label>
                <textarea value={cardsJson} onChange={(e) => setCardsJson(e.target.value)} rows={3} placeholder='[{"title": "Asia-Pacific", "desc": "..."}]' style={styles.textarea} />
              </div>

              {message && <p style={styles.errorText}>{message}</p>}

              <button type="submit" disabled={saving} style={{ ...styles.submitBtn, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : editingId ? 'Update Institution' : 'Save Institution'}
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const styles = {
  page: { flex: 1, padding: '32px', boxSizing: 'border-box', backgroundColor: '#f1f5f9', minHeight: '100vh' },
  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
  title: { fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },
  addButton: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
  emptyState: { gridColumn: '1 / -1', textAlign: 'center', padding: '60px', backgroundColor: '#fff', borderRadius: '16px', border: '1px dashed #cbd5e1' },
  emptyText: { color: '#64748b', fontSize: '14px', margin: 0 },
  card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
  cardImage: { height: '150px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: '16px' },
  badge: { display: 'inline-block', fontSize: '11px', fontWeight: '600', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase', marginBottom: '8px' },
  cardTitle: { fontWeight: '600', color: '#0f172a', margin: '0 0 4px 0', fontSize: '15px' },
  metaText: { fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' },
  cardDesc: { fontSize: '13px', color: '#64748b', margin: '0 0 14px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  cardActions: { display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
  editBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#1e40af', background: 'none', border: 'none', cursor: 'pointer' },
  deleteBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' },
  modal: { backgroundColor: '#fff', borderRadius: '12px', padding: '28px', width: '540px', maxHeight: '88vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { fontSize: '13px', color: '#475569', marginBottom: '4px', display: 'block' },
  input: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' },
  slugInput: { width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'monospace', color: '#475569' },
  textarea: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', resize: 'vertical' },
  uploadLabel: { display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px dashed #cbd5e1', borderRadius: '8px', padding: '14px', cursor: 'pointer' },
  errorText: { fontSize: '13px', color: '#b91c1c', margin: 0 },
  submitBtn: { backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
};