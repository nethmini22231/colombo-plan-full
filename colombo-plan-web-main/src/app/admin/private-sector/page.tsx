'use client';

import React, { useEffect, useState } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  UploadCloud,
  Building2
} from 'lucide-react';

const API = 'http://localhost:8080';

type PrivateSectorItem = {
  id: number;
  title: string;
  slug: string;
  regionTag: string;
  focalPoint: string;
  description: string;
  whatWeOffer: string;
  csrPartnerships: string;
  thumbnailUrl: string;
};

const emptyForm = {
  title: 'PRIVATE SECTOR',
  slug: 'private-sector',
  regionTag: '',
  focalPoint: '',
  description: '',
  whatWeOffer: '',
  csrPartnerships: '',
  thumbnailUrl: ''
};

export default function AdminPrivateSectorPage() {
  const [items, setItems] = useState<PrivateSectorItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [form, setForm] = useState(emptyForm);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/private-sector`);
      const data = await res.json();

      setItems(Array.isArray(data) ? data : []);
    } catch {
      setMessage('Could not load private sector entries.');
    } finally {
      setLoading(false);
    }
  };

  const openAddForm = () => {
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setMessage('');
    setShowForm(true);
  };

  const openEditForm = (item: PrivateSectorItem) => {
    setEditingId(item.id);

    setForm({
      title: item.title || 'PRIVATE SECTOR',
      slug: item.slug || 'private-sector',
      regionTag: item.regionTag || '',
      focalPoint: item.focalPoint || '',
      description: item.description || '',
      whatWeOffer: item.whatWeOffer || '',
      csrPartnerships: item.csrPartnerships || '',
      thumbnailUrl: item.thumbnailUrl || ''
    });

    setImageFile(null);

    if (item.thumbnailUrl) {
      setImagePreview(
        item.thumbnailUrl.startsWith('http')
          ? item.thumbnailUrl
          : API + item.thumbnailUrl
      );
    } else {
      setImagePreview('');
    }

    setMessage('');
    setShowForm(true);
  };

  const closeForm = () => {
    if (saving) return;

    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
    setImageFile(null);
    setImagePreview('');
    setMessage('');
  };

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setMessage('Only JPG, PNG and WEBP images are allowed.');
      return;
    }

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage('');
  };

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append('file', file);

    let res = await fetch(`${API}/api/upload`, {
      method: 'POST',
      body: data
    });

    if (!res.ok) {
      const data2 = new FormData();
      data2.append('file', file);

      res = await fetch(`${API}/api/v1/upload`, {
        method: 'POST',
        body: data2
      });
    }

    if (!res.ok) {
      throw new Error('Upload failed');
    }

    return await res.text();
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!form.title.trim() || !form.slug.trim()) {
      setMessage('Title and Slug are required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      let thumbnailUrl = form.thumbnailUrl;

      if (imageFile) {
        thumbnailUrl = await uploadFile(imageFile);
      }

      const payload = {
        title: form.title,
        slug: form.slug,
        regionTag: form.regionTag,
        focalPoint: form.focalPoint,
        description: form.description,
        whatWeOffer: form.whatWeOffer,
        csrPartnerships: form.csrPartnerships,
        thumbnailUrl
      };

      const url = editingId
        ? `${API}/api/private-sector/${editingId}`
        : `${API}/api/private-sector`;

      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error('Save failed');
      }

      await loadItems();
      closeForm();
    } catch {
      setMessage('Failed to save private sector content.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this entry?'
    );

    if (!confirmed) return;

    try {
      const res = await fetch(`${API}/api/private-sector/${id}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        throw new Error('Delete failed');
      }

      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setMessage('Failed to delete entry.');
    }
  };

  const getImageUrl = (url: string) => {
    if (!url) return '';

    return url.startsWith('http') ? url : API + url;
  };

  if (loading) {
    return (
      <main style={styles.page}>
        <p style={styles.loading}>Loading private sector entries...</p>
      </main>
    );
  }

  return (
    <main style={styles.page}>
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Private Sector</h1>
          <p style={styles.subtitle}>
            Manage content shown on the public "Private Sector" page
          </p>
        </div>

        <button
          type="button"
          onClick={openAddForm}
          style={styles.addButton}
        >
          <Plus size={18} />
          Add Entry
        </button>
      </div>

      {message && !showForm && (
        <div style={styles.message}>
          {message}
        </div>
      )}

      {items.length === 0 ? (
        <div style={styles.empty}>
          <Building2 size={38} color="#94a3b8" />
          <h3>No entries yet</h3>
          <p>Add your first private sector entry using the button above.</p>
        </div>
      ) : (
        <div style={styles.grid}>
          {items.map((item) => (
            <div
              key={item.id}
              style={styles.card}
            >
              <div style={styles.imageBox}>
                {item.thumbnailUrl ? (
                  <img
                    src={getImageUrl(item.thumbnailUrl)}
                    alt={item.title}
                    style={styles.cardImage}
                  />
                ) : (
                  <Building2 size={40} color="#94a3b8" />
                )}
              </div>

              <div style={styles.cardContent}>
                {item.regionTag && (
                  <span style={styles.badge}>
                    {item.regionTag}
                  </span>
                )}

                <h2 style={styles.cardTitle}>
                  {item.title}
                </h2>

                {item.focalPoint && (
                  <p style={styles.focalPoint}>
                    Focal Point: {item.focalPoint}
                  </p>
                )}

                <p style={styles.description}>
                  {item.description}
                </p>

                <p style={styles.slugText}>
                  Slug: {item.slug}
                </p>

                <div style={styles.cardFooter}>
                  <button
                    type="button"
                    onClick={() => openEditForm(item)}
                    style={styles.editButton}
                  >
                    <Pencil size={15} />
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    style={styles.deleteButton}
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div style={styles.overlay}>
          <div style={styles.modal}>
            <div style={styles.modalHeader}>
              <div>
                <h2 style={styles.modalTitle}>
                  {editingId
                    ? 'Edit Private Sector Entry'
                    : 'Add Private Sector Entry'}
                </h2>

                <p style={styles.modalSubtitle}>
                  {editingId
                    ? 'Update the existing entry details'
                    : 'Add a new entry to the Private Sector page'}
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                style={styles.closeButton}
              >
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              style={styles.form}
            >
              <div style={styles.twoColumns}>
                <div>
                  <label style={styles.label}>
                    Title *
                  </label>

                  <input
                    name="title"
                    value={form.title}
                    onChange={handleInput}
                    placeholder="e.g. PRIVATE SECTOR"
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>
                    URL Slug *
                  </label>

                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleInput}
                    placeholder="e.g. private-sector"
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.twoColumns}>
                <div>
                  <label style={styles.label}>
                    Region Tag
                  </label>

                  <input
                    name="regionTag"
                    value={form.regionTag}
                    onChange={handleInput}
                    placeholder="e.g. Global"
                    style={styles.input}
                  />
                </div>

                <div>
                  <label style={styles.label}>
                    Focal Point
                  </label>

                  <input
                    name="focalPoint"
                    value={form.focalPoint}
                    onChange={handleInput}
                    placeholder="e.g. Pulsara G"
                    style={styles.input}
                  />
                </div>
              </div>

              <div>
                <label style={styles.label}>
                  Card Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleInput}
                  rows={3}
                  placeholder="Enter a short description..."
                  style={styles.textarea}
                />
              </div>

              <div>
                <label style={styles.label}>
                  What We Offer (one item per line)
                </label>

                <textarea
                  name="whatWeOffer"
                  value={form.whatWeOffer}
                  onChange={handleInput}
                  rows={5}
                  placeholder={'Global Network of Trainers\nEvidence-Based Prevention Curricula'}
                  style={styles.textarea}
                />

                <p style={styles.helperText}>
                  Each line becomes one bullet point on the public page.
                </p>
              </div>

              <div>
                <label style={styles.label}>
                  CSR Partnerships
                </label>

                <textarea
                  name="csrPartnerships"
                  value={form.csrPartnerships}
                  onChange={handleInput}
                  rows={3}
                  placeholder="Enter CSR partnership details..."
                  style={styles.textarea}
                />
              </div>

              <div>
                <label style={styles.label}>
                  Thumbnail Image
                </label>

                <label style={styles.uploadBox}>
                  <UploadCloud size={20} />

                  <span>
                    {imageFile
                      ? imageFile.name
                      : form.thumbnailUrl
                      ? 'Current image attached — click to replace'
                      : 'Choose an image'}
                  </span>

                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>

                {imagePreview && (
                  <div style={styles.previewContainer}>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      style={styles.preview}
                    />
                  </div>
                )}
              </div>

              {message && (
                <p style={styles.error}>
                  {message}
                </p>
              )}

              <div style={styles.formActions}>
                <button
                  type="button"
                  onClick={closeForm}
                  disabled={saving}
                  style={styles.cancelButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  style={styles.saveButton}
                >
                  {saving
                    ? 'Saving...'
                    : editingId
                    ? 'Save Changes'
                    : 'Add Entry'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    padding: '32px',
    background: '#f8fafc',
    boxSizing: 'border-box'
  },

  loading: {
    color: '#64748b',
    fontSize: '14px'
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '28px',
    paddingBottom: '22px',
    borderBottom: '1px solid #e2e8f0'
  },

  title: {
    margin: 0,
    fontSize: '27px',
    fontWeight: 700,
    color: '#0f172a'
  },

  subtitle: {
    margin: '5px 0 0',
    fontSize: '13px',
    color: '#64748b'
  },

  addButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    background: '#0b192c',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    padding: '12px 18px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(15,23,42,0.15)'
  },

  message: {
    padding: '12px 14px',
    background: '#fee2e2',
    color: '#b91c1c',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '13px'
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
    gap: '20px'
  },

  card: {
    background: '#fff',
    border: '1px solid #dbe3ec',
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: '0 3px 10px rgba(15,23,42,0.04)'
  },

  imageBox: {
    height: '175px',
    background: '#f1f5f9',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden'
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  cardContent: {
    padding: '20px'
  },

  badge: {
    display: 'inline-flex',
    padding: '4px 10px',
    borderRadius: '6px',
    background: '#eff6ff',
    color: '#1d4ed8',
    fontSize: '11px',
    fontWeight: 700,
    marginBottom: '10px'
  },

  cardTitle: {
    margin: 0,
    fontSize: '17px',
    lineHeight: 1.35,
    color: '#0f172a',
    fontWeight: 700
  },

  focalPoint: {
    margin: '8px 0 0',
    fontSize: '12px',
    color: '#475569'
  },

  description: {
    margin: '10px 0 0',
    fontSize: '13px',
    lineHeight: 1.6,
    color: '#64748b'
  },

  slugText: {
    margin: '10px 0 0',
    fontSize: '11px',
    fontFamily: 'monospace',
    color: '#94a3b8'
  },

  cardFooter: {
    display: 'flex',
    alignItems: 'center',
    gap: '18px',
    borderTop: '1px solid #e2e8f0',
    marginTop: '18px',
    paddingTop: '14px'
  },

  editButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    color: '#1d4ed8',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0
  },

  deleteButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    background: 'none',
    border: 'none',
    color: '#dc2626',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    padding: 0
  },

  empty: {
    minHeight: '300px',
    background: '#fff',
    border: '1px dashed #cbd5e1',
    borderRadius: '14px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center'
  },

  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(15,23,42,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '24px',
    zIndex: 100
  },

  modal: {
    width: '640px',
    maxWidth: '100%',
    maxHeight: '90vh',
    overflowY: 'auto',
    background: '#fff',
    borderRadius: '14px',
    padding: '26px',
    boxSizing: 'border-box'
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '24px'
  },

  modalTitle: {
    margin: 0,
    fontSize: '20px',
    color: '#0f172a',
    fontWeight: 700
  },

  modalSubtitle: {
    margin: '5px 0 0',
    fontSize: '12px',
    color: '#64748b'
  },

  closeButton: {
    border: 'none',
    background: '#f1f5f9',
    color: '#475569',
    width: '32px',
    height: '32px',
    borderRadius: '7px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },

  label: {
    display: 'block',
    marginBottom: '6px',
    fontSize: '13px',
    fontWeight: 600,
    color: '#334155'
  },

  helperText: {
    fontSize: '11px',
    color: '#94a3b8',
    margin: '4px 0 0'
  },

  input: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#0f172a',
    outline: 'none'
  },

  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '11px 12px',
    border: '1px solid #cbd5e1',
    borderRadius: '8px',
    fontSize: '13px',
    color: '#0f172a',
    resize: 'vertical',
    outline: 'none'
  },

  twoColumns: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px'
  },

  uploadBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '14px',
    border: '1.5px dashed #cbd5e1',
    borderRadius: '9px',
    color: '#64748b',
    fontSize: '13px',
    cursor: 'pointer'
  },

  previewContainer: {
    marginTop: '10px'
  },

  preview: {
    width: '150px',
    height: '95px',
    objectFit: 'cover',
    borderRadius: '8px',
    border: '1px solid #cbd5e1'
  },

  error: {
    margin: 0,
    color: '#b91c1c',
    fontSize: '13px'
  },

  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '18px',
    marginTop: '4px'
  },

  cancelButton: {
    padding: '10px 18px',
    borderRadius: '8px',
    border: '1px solid #cbd5e1',
    background: '#fff',
    color: '#475569',
    fontSize: '13px',
    cursor: 'pointer'
  },

  saveButton: {
    padding: '10px 18px',
    borderRadius: '8px',
    border: 'none',
    background: '#0b192c',
    color: '#fff',
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer'
  }
};