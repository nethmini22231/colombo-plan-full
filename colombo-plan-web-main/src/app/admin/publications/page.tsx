'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Pencil, Trash2, Plus, ArrowLeft, FileText, X, Image as ImageIcon } from 'lucide-react';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

export default function PublicationsAdmin() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Report');
  const [status, setStatus] = useState('Draft');
  const [publishDate, setPublishDate] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');

  const [file, setFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await fetch(`${API}/api/publications`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      } else {
        const resV1 = await fetch(`${API}/api/v1/publications`);
        if (resV1.ok) {
          const dataV1 = await resV1.json();
          setItems(dataV1);
        } else {
          setItems([]);
        }
      }
    } catch {
      setItems([]);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  useEffect(() => {
    if (!imageFile) {
      setImagePreviewUrl('');
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setImagePreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  const resetForm = () => {
    setTitle('');
    setCategory('Report');
    setStatus('Draft');
    setPublishDate('');
    setAuthor('');
    setDescription('');
    setFile(null);
    setExistingFileUrl('');
    setFileName('');
    setImageFile(null);
    setImagePreviewUrl('');
    setExistingImageUrl('');
    setEditingId(null);
    setMessage('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const openAddForm = () => {
    resetForm();
    setView('form');
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setCategory(item.category || 'Report');
    setStatus(item.status || 'Draft');
    setPublishDate(item.publishDate || '');
    setAuthor(item.author || '');
    setDescription(item.description || '');
    setExistingFileUrl(item.fileUrl || '');
    setFileName(item.fileName || '');
    setExistingImageUrl(item.imageUrl || '');
    setFile(null);
    setImageFile(null);
    setImagePreviewUrl('');
    setMessage('');
    setView('form');
  };

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(selected.type)) {
      setMessage('Only PDF or DOCX/DOC files are allowed for the document.');
      setFile(null);
      setFileName('');
      return;
    }
    if (selected.size > 25 * 1024 * 1024) {
      setMessage('File size must be under 25MB.');
      setFile(null);
      setFileName('');
      return;
    }
    setMessage('');
    setFile(selected);
    setFileName(selected.name);
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(selected.type)) {
      setMessage('Only JPG, PNG, or WEBP images are allowed for the thumbnail.');
      return;
    }
    setMessage('');
    setImageFile(selected);
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreviewUrl('');
    setExistingImageUrl('');
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeDocument = () => {
    setFile(null);
    setExistingFileUrl('');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e, publishNow) => {
    e.preventDefault();
    if (!title) {
      setMessage('Title is required.');
      return;
    }

    setSaving(true);
    setMessage('');

    try {
      let fileUrl = existingFileUrl;
      let imageUrl = existingImageUrl;

      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        let uploadRes = await fetch(`${API}/api/upload`, {
          method: 'POST',
          body: formData,
        });
        if (!uploadRes.ok) {
          uploadRes = await fetch(`${API}/api/v1/upload`, {
            method: 'POST',
            body: formData,
          });
        }
        if (uploadRes.ok) {
          fileUrl = await uploadRes.text();
        } else {
          setMessage('Document upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      if (imageFile) {
        const imgFormData = new FormData();
        imgFormData.append('file', imageFile);
        let imgUploadRes = await fetch(`${API}/api/upload`, {
          method: 'POST',
          body: imgFormData,
        });
        if (!imgUploadRes.ok) {
          imgUploadRes = await fetch(`${API}/api/v1/upload`, {
            method: 'POST',
            body: imgFormData,
          });
        }
        if (imgUploadRes.ok) {
          imageUrl = await imgUploadRes.text();
        } else {
          setMessage('Thumbnail image upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      const finalStatus = publishNow ? 'Published' : status;
      const finalPublishDate = publishNow && !publishDate ? new Date().toISOString().slice(0, 10) : publishDate;

      const payload = {
        title,
        category,
        status: finalStatus,
        publishDate: finalPublishDate,
        author,
        description,
        fileUrl,
        fileName,
        imageUrl,
      };

      let url = editingId ? `${API}/api/publications/${editingId}` : `${API}/api/publications`;
      let method = editingId ? 'PUT' : 'POST';

      let res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        url = editingId ? `${API}/api/v1/publications/${editingId}` : `${API}/api/v1/publications`;
        res = await fetch(url, {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      if (res.ok) {
        setView('list');
        resetForm();
        loadItems();
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
    if (!confirm('Delete this publication?')) return;
    try {
      let res = await fetch(`${API}/api/publications/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        await fetch(`${API}/api/v1/publications/${id}`, { method: 'DELETE' });
      }
      loadItems();
    } catch {
      // Handle error silently
    }
  };

  const styles = {
    page: { width: '100%', minHeight: '85vh', backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '32px', boxSizing: 'border-box', boxShadow: '0 4px 12px rgba(0,0,0,0.02)', fontFamily: 'sans-serif' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
    title: { fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    subtitle: { fontSize: '13px', color: '#64748b', margin: '4px 0 0 0' },
    addButton: { display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px 18px', borderRadius: '10px', fontSize: '14px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
    emptyState: { gridColumn: '1 / -1', textAlign: 'center', padding: '60px', backgroundColor: '#f8fafc', borderRadius: '16px', border: '1px dashed #cbd5e1' },
    emptyText: { color: '#64748b', fontSize: '15px', margin: 0 },
    card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column' },
    cardImageWrap: { height: '140px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
    cardBody: { padding: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 },
    badgeRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' },
    badge: { fontSize: '11px', fontWeight: '600', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '3px 10px', borderRadius: '6px', textTransform: 'uppercase' },
    statusBadgeDraft: { fontSize: '11px', fontWeight: '600', backgroundColor: '#fef3c7', color: '#b45309', padding: '3px 10px', borderRadius: '6px' },
    statusBadgePublished: { fontSize: '11px', fontWeight: '600', backgroundColor: '#ecfdf5', color: '#065f46', padding: '3px 10px', borderRadius: '6px' },
    dateText: { fontSize: '12px', color: '#64748b', fontWeight: '500' },
    cardTitle: { fontWeight: 'bold', color: '#0f172a', margin: '0 0 8px 0', fontSize: '16px', lineHeight: '1.4' },
    metaText: { fontSize: '12px', color: '#64748b', margin: '0 0 8px 0' },
    cardDesc: { fontSize: '13px', color: '#64748b', margin: '0 0 16px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.5' },
    fileRow: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#475569', backgroundColor: '#f8fafc', padding: '8px 12px', borderRadius: '8px', marginBottom: '16px', border: '1px solid #e2e8f0' },
    fileName: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' },
    cardActions: { display: 'flex', gap: '16px', borderTop: '1px solid #f1f5f9', paddingTop: '14px' },
    editBtn: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#1e40af', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' },
    deleteBtn: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' },
    formWrap: { maxWidth: '850px', margin: '0 auto', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.05)' },
    formHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #f1f5f9', paddingBottom: '20px' },
    formTitle: { margin: 0, fontSize: '24px', color: '#0f172a', fontWeight: 'bold' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '600' },
    form: { display: 'flex', flexDirection: 'column', gap: '24px' },
    row2: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
    row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },
    label: { fontSize: '13px', color: '#475569', marginBottom: '8px', display: 'block', fontWeight: '600' },
    helperText: { fontSize: '12px', color: '#64748b', margin: '4px 0 0 0' },
    input: { width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', boxSizing: 'border-box', outline: 'none', backgroundColor: '#fff', color: '#0f172a' },
    select: { width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', boxSizing: 'border-box', backgroundColor: '#fff', outline: 'none', color: '#0f172a' },
    textarea: { width: '100%', padding: '12px 16px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '10px', boxSizing: 'border-box', resize: 'vertical', outline: 'none', backgroundColor: '#fff', color: '#0f172a', lineHeight: '1.5' },
    uploadLabel: { display: 'flex', alignItems: 'center', gap: '14px', border: '2px dashed #cbd5e1', borderRadius: '12px', padding: '20px', cursor: 'pointer', backgroundColor: '#f8fafc' },
    imagePreviewWrap: { marginTop: '14px', position: 'relative', display: 'inline-block' },
    imagePreview: { width: '200px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid #cbd5e1', display: 'block' },
    removeImageBtn: { position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#0b192c', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fileConfirmRow: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
    fileConfirmText: { fontSize: '13px', color: '#475569', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' },
    removeFileBtn: { width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0b192c', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    errorText: { fontSize: '13px', color: '#b91c1c', margin: 0, fontWeight: '600' },
    footerRow: { display: 'flex', justifyContent: 'flex-end', gap: '14px', marginTop: '12px' },
    cancelBtn: { backgroundColor: '#f1f5f9', color: '#334155', border: 'none', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontWeight: '600' },
    draftBtn: { backgroundColor: '#fff', color: '#0b192c', border: '1px solid #0b192c', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontWeight: '600' },
    publishBtn: { backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '10px', fontSize: '14px', cursor: 'pointer', fontWeight: '600', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  };

  return (
    <div style={styles.page}>
      {view === 'list' ? (
        <>
          <div style={styles.headerRow}>
            <div>
              <h2 style={styles.title}>Publications</h2>
              <p style={styles.subtitle}>Manage reports, papers, and documents shown on the public site</p>
            </div>
            <button onClick={openAddForm} style={styles.addButton}>
              <Plus size={18} />
              Add Publication
            </button>
          </div>

          <div style={styles.grid}>
            {items.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={styles.emptyText}>No publications yet. Add your first publication to have it appear on the public site.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} style={styles.card}>
                  <div style={styles.cardImageWrap}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl.startsWith('http') ? item.imageUrl : API + item.imageUrl}
                        alt={item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <ImageIcon size={28} color="#cbd5e1" />
                    )}
                  </div>
                  <div style={styles.cardBody}>
                    <div>
                      <div style={styles.badgeRow}>
                        <span style={styles.badge}>{item.category || 'Report'}</span>
                        <span style={item.status === 'Published' ? styles.statusBadgePublished : styles.statusBadgeDraft}>
                          {item.status || 'Draft'}
                        </span>
                      </div>
                      <h3 style={styles.cardTitle}>{item.title}</h3>
                      {item.author ? <p style={styles.metaText}>{'By ' + item.author}</p> : null}
                      <p style={styles.cardDesc}>{item.description || 'No description provided.'}</p>

                      {item.fileName ? (
                        <div style={styles.fileRow}>
                          <FileText size={16} color="#0b192c" />
                          <span style={styles.fileName}>{item.fileName}</span>
                        </div>
                      ) : null}
                    </div>

                    <div style={styles.cardActions}>
                      <button onClick={() => openEditForm(item)} style={styles.editBtn}>
                        <Pencil size={15} />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>
                        <Trash2 size={15} />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </>
      ) : (
        <div style={styles.formWrap}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>{editingId ? 'Edit Publication' : 'Add New Publication'}</h2>
            <button onClick={() => { setView('list'); resetForm(); }} style={styles.backBtn}>
              <ArrowLeft size={18} />
              Back to List
            </button>
          </div>

          <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
            <div>
              <label style={styles.label}>Title *</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Annual Report 2025"
                style={styles.input}
              />
            </div>

            <div style={styles.row3}>
              <div>
                <label style={styles.label}>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                  <option value="Report">Report</option>
                  <option value="Research Paper">Research Paper</option>
                  <option value="Newsletter">Newsletter</option>
                  <option value="Document">Document</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Status</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)} style={styles.select}>
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                </select>
              </div>
              <div>
                <label style={styles.label}>Publish Date</label>
                <input
                  type="date"
                  value={publishDate}
                  onChange={(e) => setPublishDate(e.target.value)}
                  style={styles.input}
                />
              </div>
            </div>

            <div>
              <label style={styles.label}>Author / Organization</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="e.g. Research Division"
                style={styles.input}
              />
            </div>

            <div>
              <label style={styles.label}>Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                placeholder="Brief summary of the publication..."
                style={styles.textarea}
              />
            </div>

            <div>
              <label style={styles.label}>Thumbnail Image (shown on the public site)</label>
              <label style={styles.uploadLabel}>
                <ImageIcon size={24} color="#64748b" />
                <span style={{ fontSize: '14px', color: imageFile ? '#0f172a' : '#64748b', fontWeight: '500' }}>
                  {imageFile ? imageFile.name : existingImageUrl ? 'Current thumbnail attached (click to replace)' : 'Click to select a thumbnail image'}
                </span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>

              {imagePreviewUrl ? (
                <div style={styles.imagePreviewWrap}>
                  <img src={imagePreviewUrl} alt="Thumbnail preview" style={styles.imagePreview} />
                  <button type="button" onClick={removeImage} style={styles.removeImageBtn}>
                    <X size={13} />
                  </button>
                </div>
              ) : existingImageUrl ? (
                <div style={styles.imagePreviewWrap}>
                  <img
                    src={existingImageUrl.startsWith('http') ? existingImageUrl : API + existingImageUrl}
                    alt="Current thumbnail"
                    style={styles.imagePreview}
                  />
                  <button type="button" onClick={removeImage} style={styles.removeImageBtn}>
                    <X size={13} />
                  </button>
                </div>
              ) : null}
            </div>

            <div>
              <label style={styles.label}>Upload Document (PDF / DOCX)</label>
              <label style={styles.uploadLabel}>
                <UploadCloud size={24} color="#64748b" />
                <span style={{ fontSize: '14px', color: file ? '#0f172a' : '#64748b', fontWeight: '500' }}>
                  {file ? file.name : existingFileUrl ? (fileName || 'Current file attached (click to replace)') : 'Click to select the document'}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
              </label>

              {(file || existingFileUrl) ? (
                <div style={styles.fileConfirmRow}>
                  <FileText size={16} color="#0b192c" />
                  <span style={styles.fileConfirmText}>{file ? file.name : fileName}</span>
                  <button type="button" onClick={removeDocument} style={styles.removeFileBtn}>
                    <X size={12} />
                  </button>
                </div>
              ) : null}
            </div>

            {message ? <p style={styles.errorText}>{message}</p> : null}

            <div style={styles.footerRow}>
              <button type="button" onClick={() => { setView('list'); resetForm(); }} style={styles.cancelBtn}>
                Cancel
              </button>
              <button type="button" disabled={saving} onClick={(e) => handleSubmit(e, false)} style={{ ...styles.draftBtn, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : 'Save Draft'}
              </button>
              <button type="button" disabled={saving} onClick={(e) => handleSubmit(e, true)} style={{ ...styles.publishBtn, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Publishing...' : 'Publish'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}