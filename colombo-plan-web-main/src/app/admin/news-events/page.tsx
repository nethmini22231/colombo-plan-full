'use client';

import { useState, useEffect, useRef } from 'react';
import {
  UploadCloud, Pencil, Trash2, Plus, ArrowLeft, Newspaper, X, FileText,
  Bold, Italic, Heading2, List, Link2
} from 'lucide-react';

const API = 'http://   https://colombo-plan-full-production.up.railway.app';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function NewsEventsAdmin() {
  const [items, setItems] = useState([]);
  const [view, setView] = useState('list');
  const [editingId, setEditingId] = useState(null);
  const contentRef = useRef(null);
  const imageInputRef = useRef(null);
  const fileInputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState('News');
  const [status, setStatus] = useState('Draft');
  const [publishDate, setPublishDate] = useState('');
  const [author, setAuthor] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [imageAlt, setImageAlt] = useState('');

  const [docFile, setDocFile] = useState(null);
  const [existingFileUrl, setExistingFileUrl] = useState('');
  const [fileName, setFileName] = useState('');

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadItems = async () => {
    try {
      const res = await fetch(API + '/api/news-events');
      if (res.ok) {
        setItems(await res.json());
      } else {
        const resV1 = await fetch(API + '/api/v1/news-events');
        setItems(resV1.ok ? await resV1.json() : []);
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
      setPreviewUrl('');
      return;
    }
    const objectUrl = URL.createObjectURL(imageFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [imageFile]);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setSlugTouched(false);
    setCategory('News');
    setStatus('Draft');
    setPublishDate('');
    setAuthor('');
    setEventDate('');
    setLocation('');
    setDescription('');
    setContent('');
    setImageFile(null);
    setPreviewUrl('');
    setExistingImageUrl('');
    setImageAlt('');
    setDocFile(null);
    setExistingFileUrl('');
    setFileName('');
    setEditingId(null);
    setMessage('');
    if (imageInputRef.current) imageInputRef.current.value = '';
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const openAddForm = () => {
    resetForm();
    setView('form');
  };

  const openEditForm = (item) => {
    setEditingId(item.id);
    setTitle(item.title || '');
    setSlug(item.slug || slugify(item.title || ''));
    setSlugTouched(!!item.slug);
    setCategory(item.category || 'News');
    setStatus(item.status || 'Draft');
    setPublishDate(item.publishDate || '');
    setAuthor(item.author || '');
    setEventDate(item.eventDate || '');
    setLocation(item.location || '');
    setDescription(item.description || '');
    setContent(item.content || '');
    setExistingImageUrl(item.imageUrl || '');
    setImageAlt(item.imageAlt || '');
    setExistingFileUrl(item.fileUrl || '');
    setFileName(item.fileName || '');
    setImageFile(null);
    setPreviewUrl('');
    setDocFile(null);
    setMessage('');
    setView('form');
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(selected.type)) {
      setMessage('Only image files are allowed (JPG/PNG/WEBP).');
      return;
    }
    if (selected.size > 8 * 1024 * 1024) {
      setMessage('Image must be under 8MB.');
      return;
    }
    setMessage('');
    setImageFile(selected);
  };

  const removeSelectedImage = () => {
    setImageFile(null);
    setPreviewUrl('');
    setExistingImageUrl('');
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const handleDocChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowedTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword',
    ];
    if (!allowedTypes.includes(selected.type)) {
      setMessage('Only PDF or DOCX/DOC files are allowed for the document.');
      return;
    }
    if (selected.size > 25 * 1024 * 1024) {
      setMessage('File size must be under 25MB.');
      return;
    }
    setMessage('');
    setDocFile(selected);
    setFileName(selected.name);
  };

  const removeDocument = () => {
    setDocFile(null);
    setExistingFileUrl('');
    setFileName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const applyFormat = (type) => {
    const textarea = contentRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end);
    let before = content.slice(0, start);
    let after = content.slice(end);
    let inserted = selected;
    let cursorOffset = 0;

    if (type === 'bold') {
      inserted = '**' + (selected || 'bold text') + '**';
      cursorOffset = selected ? inserted.length : 2;
    } else if (type === 'italic') {
      inserted = '*' + (selected || 'italic text') + '*';
      cursorOffset = selected ? inserted.length : 1;
    } else if (type === 'heading') {
      const needsNewline = before.length > 0 && !before.endsWith('\n');
      inserted = (needsNewline ? '\n' : '') + '## ' + (selected || 'Heading') + '\n';
      cursorOffset = inserted.length;
    } else if (type === 'list') {
      const lines = (selected || 'List item').split('\n').map((l) => '- ' + l).join('\n');
      const needsNewline = before.length > 0 && !before.endsWith('\n');
      inserted = (needsNewline ? '\n' : '') + lines + '\n';
      cursorOffset = inserted.length;
    } else if (type === 'link') {
      inserted = '[' + (selected || 'link text') + '](https://)';
      cursorOffset = inserted.length;
    }

    const newContent = before + inserted + after;
    setContent(newContent);

    requestAnimationFrame(() => {
      textarea.focus();
      const pos = start + cursorOffset;
      textarea.setSelectionRange(pos, pos);
    });
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
      let imageUrl = existingImageUrl;
      let fileUrl = existingFileUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);
        let uploadRes = await fetch(API + '/api/upload', { method: 'POST', body: formData });
        if (!uploadRes.ok) {
          uploadRes = await fetch(API + '/api/v1/upload', { method: 'POST', body: formData });
        }
        if (uploadRes.ok) {
          imageUrl = await uploadRes.text();
        } else {
          setMessage('Thumbnail image upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      if (docFile) {
        const docFormData = new FormData();
        docFormData.append('file', docFile);
        let docUploadRes = await fetch(API + '/api/upload', { method: 'POST', body: docFormData });
        if (!docUploadRes.ok) {
          docUploadRes = await fetch(API + '/api/v1/upload', { method: 'POST', body: docFormData });
        }
        if (docUploadRes.ok) {
          fileUrl = await docUploadRes.text();
        } else {
          setMessage('Document upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      const finalStatus = publishNow ? 'Published' : status;
      const finalPublishDate = publishNow && !publishDate ? new Date().toISOString().slice(0, 10) : publishDate;

      const payload = {
        title: title,
        slug: slug || slugify(title),
        category: category,
        status: finalStatus,
        publishDate: finalPublishDate,
        author: author,
        eventDate: eventDate,
        location: location,
        description: description,
        content: content,
        imageUrl: imageUrl,
        imageAlt: imageAlt,
        fileUrl: fileUrl,
        fileName: fileName,
      };

      let url = editingId ? API + '/api/news-events/' + editingId : API + '/api/news-events';
      let method = editingId ? 'PUT' : 'POST';

      let res = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        url = editingId ? API + '/api/v1/news-events/' + editingId : API + '/api/v1/news-events';
        res = await fetch(url, {
          method: method,
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
    if (!confirm('Delete this item?')) return;
    try {
      let res = await fetch(API + '/api/news-events/' + id, { method: 'DELETE' });
      if (!res.ok) {
        await fetch(API + '/api/v1/news-events/' + id, { method: 'DELETE' });
      }
      loadItems();
    } catch {
      // Handle error silently
    }
  };

  const isEvent = category === 'Event';

  const styles = {
    page: { flex: 1, padding: '32px', boxSizing: 'border-box', backgroundColor: '#f1f5f9', minHeight: '100vh' },
    headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' },
    title: { fontSize: '28px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
    subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },
    addButton: { display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
    grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' },
    emptyState: { gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' },
    emptyIconWrap: { width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' },
    emptyTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 6px 0' },
    emptyText: { fontSize: '13px', color: '#94a3b8', margin: 0, textAlign: 'center' },
    card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' },
    cardImage: { height: '150px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    cardBody: { padding: '16px' },
    badgeRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
    badgeGroup: { display: 'flex', gap: '6px', alignItems: 'center' },
    badge: { fontSize: '11px', fontWeight: '600', backgroundColor: '#eff6ff', color: '#1d4ed8', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' },
    statusBadgeDraft: { fontSize: '11px', fontWeight: '600', backgroundColor: '#fef3c7', color: '#b45309', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' },
    statusBadgePublished: { fontSize: '11px', fontWeight: '600', backgroundColor: '#ecfdf5', color: '#065f46', padding: '2px 8px', borderRadius: '4px', textTransform: 'uppercase' },
    dateText: { fontSize: '12px', color: '#64748b' },
    cardTitle: { fontWeight: '600', color: '#0f172a', margin: '0 0 6px 0', fontSize: '15px' },
    metaText: { fontSize: '12px', color: '#94a3b8', margin: '0 0 8px 0' },
    cardDesc: { fontSize: '13px', color: '#64748b', margin: '0 0 14px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
    fileRow: { display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#475569', backgroundColor: '#f8fafc', padding: '7px 10px', borderRadius: '6px', marginBottom: '12px', border: '1px solid #e2e8f0' },
    fileNameText: { flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' },
    cardActions: { display: 'flex', gap: '12px', borderTop: '1px solid #f1f5f9', paddingTop: '12px' },
    editBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#1e40af', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' },
    deleteBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '500' },
    formWrap: { maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '32px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' },
    formHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #f1f5f9', paddingBottom: '16px' },
    formTitle: { margin: 0, fontSize: '22px', color: '#0f172a', fontWeight: 'bold' },
    backBtn: { display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', color: '#475569', fontSize: '14px', fontWeight: '500' },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    row2: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' },
    row3: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' },
    row2b: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' },
    label: { fontSize: '13px', color: '#475569', marginBottom: '6px', display: 'block', fontWeight: '500' },
    helperText: { fontSize: '12px', color: '#94a3b8', margin: '4px 0 0 0' },
    input: { width: '100%', padding: '11px 14px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none' },
    slugInput: { width: '100%', padding: '11px 14px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', outline: 'none', fontFamily: 'monospace', color: '#475569' },
    select: { width: '100%', padding: '11px 14px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', backgroundColor: '#fff', outline: 'none' },
    textarea: { width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', resize: 'vertical', outline: 'none' },
    sectionDivider: { borderTop: '1px dashed #e2e8f0', margin: '4px 0' },
    toolbar: { display: 'flex', gap: '4px', border: '1px solid #cbd5e1', borderBottom: 'none', borderRadius: '8px 8px 0 0', padding: '8px', backgroundColor: '#f8fafc' },
    toolbarBtn: { display: 'flex', alignItems: 'center', justifyContent: 'center', width: '30px', height: '30px', border: '1px solid transparent', borderRadius: '6px', backgroundColor: 'transparent', color: '#334155', cursor: 'pointer' },
    articleTextarea: { width: '100%', padding: '12px 14px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '0 0 8px 8px', boxSizing: 'border-box', resize: 'vertical', outline: 'none', lineHeight: '1.6', borderTop: 'none' },
    uploadLabel: { display: 'flex', alignItems: 'center', gap: '12px', border: '1.5px dashed #cbd5e1', borderRadius: '8px', padding: '16px', cursor: 'pointer', backgroundColor: '#f8fafc' },
    previewWrap: { marginTop: '12px', position: 'relative', display: 'inline-block' },
    previewImage: { width: '180px', height: '110px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'block' },
    removePreviewBtn: { position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0b192c', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
    fileConfirmRow: { display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', padding: '10px 14px', backgroundColor: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' },
    fileConfirmText: { fontSize: '13px', color: '#475569', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500' },
    removeFileBtn: { width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0b192c', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
    errorText: { fontSize: '13px', color: '#b91c1c', margin: 0, fontWeight: '500' },
    footerRow: { display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' },
    cancelBtn: { backgroundColor: '#f1f5f9', color: '#334155', border: 'none', padding: '11px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
    draftBtn: { backgroundColor: '#fff', color: '#0b192c', border: '1px solid #0b192c', padding: '11px 20px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
    publishBtn: { backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '11px 24px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
  };

  return (
    <div style={styles.page}>
      {view === 'list' ? (
        <>
          <div style={styles.headerRow}>
            <div>
              <h2 style={styles.title}>News & Events</h2>
              <p style={styles.subtitle}>Manage announcements, updates, and upcoming events</p>
            </div>
            <button onClick={openAddForm} style={styles.addButton}>
              <Plus size={16} />
              Add New Entry
            </button>
          </div>

          <div style={styles.grid}>
            {items.length === 0 ? (
              <div style={styles.emptyState}>
                <div style={styles.emptyIconWrap}>
                  <Newspaper size={20} color="#1d4ed8" />
                </div>
                <p style={styles.emptyTitle}>No entries yet</p>
                <p style={styles.emptyText}>Click "Add New Entry" to create one.</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} style={styles.card}>
                  <div style={styles.cardImage}>
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl.indexOf('http') === 0 ? item.imageUrl : API + item.imageUrl}
                        alt={item.imageAlt || item.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    ) : (
                      <Newspaper size={20} color="#94a3b8" />
                    )}
                  </div>
                  <div style={styles.cardBody}>
                    <div style={styles.badgeRow}>
                      <div style={styles.badgeGroup}>
                        <span style={styles.badge}>{item.category || 'News'}</span>
                        <span style={item.status === 'Published' ? styles.statusBadgePublished : styles.statusBadgeDraft}>
                          {item.status || 'Draft'}
                        </span>
                      </div>
                      <span style={styles.dateText}>{item.publishDate || item.eventDate || 'No date'}</span>
                    </div>
                    <p style={styles.cardTitle}>{item.title}</p>
                    {item.author ? <p style={styles.metaText}>{'By ' + item.author}</p> : null}
                    <p style={styles.cardDesc}>{item.description}</p>

                    {item.fileName ? (
                      <div style={styles.fileRow}>
                        <FileText size={14} color="#0b192c" />
                        <span style={styles.fileNameText}>{item.fileName}</span>
                      </div>
                    ) : null}

                    <div style={styles.cardActions}>
                      <button onClick={() => openEditForm(item)} style={styles.editBtn}>
                        <Pencil size={14} />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(item.id)} style={styles.deleteBtn}>
                        <Trash2 size={14} />
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
            <h2 style={styles.formTitle}>{editingId ? 'Edit Entry' : 'Add Entry'}</h2>
            <button onClick={() => { setView('list'); resetForm(); }} style={styles.backBtn}>
              <ArrowLeft size={16} />
              Back to list
            </button>
          </div>

          <form style={styles.form}>
            <div style={styles.row2}>
              <div>
                <label style={styles.label}>Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Annual Ministerial Meeting 2026"
                  style={styles.input}
                />
              </div>
              <div>
                <label style={styles.label}>Content Type</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} style={styles.select}>
                  <option value="News">News</option>
                  <option value="Event">Event</option>
                  <option value="Announcement">Announcement</option>
                </select>
              </div>
            </div>

            <div>
              <label style={styles.label}>URL Slug</label>
              <input
                type="text"
                value={slug}
                onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                placeholder="annual-ministerial-meeting-2026"
                style={styles.slugInput}
              />
              <p style={styles.helperText}>{'Article URL: /news-events/' + (slug || 'your-slug-here')}</p>
            </div>

            <div style={styles.row3}>
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
              <div>
                <label style={styles.label}>Author</label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Secretariat"
                  style={styles.input}
                />
              </div>
            </div>

            {isEvent ? (
              <>
                <div style={styles.sectionDivider} />
                <div style={styles.row2b}>
                  <div>
                    <label style={styles.label}>Event Date / Timeline</label>
                    <input
                      type="text"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      placeholder="e.g. Sep 15, 2026"
                      style={styles.input}
                    />
                  </div>
                  <div>
                    <label style={styles.label}>Location</label>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="e.g. Colombo, Sri Lanka"
                      style={styles.input}
                    />
                  </div>
                </div>
              </>
            ) : null}

            <div>
              <label style={styles.label}>Short Description (shown on the card)</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                maxLength={300}
                placeholder="One or two sentences summarising this entry..."
                style={styles.textarea}
              />
            </div>

            <div>
              <label style={styles.label}>Full Article Content</label>
              <div style={styles.toolbar}>
                <button type="button" onClick={() => applyFormat('bold')} style={styles.toolbarBtn} title="Bold">
                  <Bold size={15} />
                </button>
                <button type="button" onClick={() => applyFormat('italic')} style={styles.toolbarBtn} title="Italic">
                  <Italic size={15} />
                </button>
                <button type="button" onClick={() => applyFormat('heading')} style={styles.toolbarBtn} title="Heading">
                  <Heading2 size={15} />
                </button>
                <button type="button" onClick={() => applyFormat('list')} style={styles.toolbarBtn} title="Bullet list">
                  <List size={15} />
                </button>
                <button type="button" onClick={() => applyFormat('link')} style={styles.toolbarBtn} title="Link">
                  <Link2 size={15} />
                </button>
              </div>
              <textarea
                ref={contentRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                maxLength={20000}
                placeholder="Write the full article here..."
                style={styles.articleTextarea}
              />
              <p style={styles.helperText}>Select text and click a toolbar button to format it. This is what visitors see on the full article page.</p>
            </div>

            <div>
              <label style={styles.label}>Thumbnail Image (JPG/PNG/WEBP)</label>
              <label style={styles.uploadLabel}>
                <UploadCloud size={20} color="#64748b" />
                <span style={{ fontSize: '13px', color: imageFile ? '#0f172a' : '#64748b' }}>
                  {imageFile ? imageFile.name : existingImageUrl ? 'Keep current image or choose a new file' : 'Click to select image (JPG/PNG/WEBP)'}
                </span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </label>

              {previewUrl ? (
                <div style={styles.previewWrap}>
                  <img src={previewUrl} alt="Selected preview" style={styles.previewImage} />
                  <button type="button" onClick={removeSelectedImage} style={styles.removePreviewBtn}>
                    <X size={12} />
                  </button>
                </div>
              ) : existingImageUrl ? (
                <div style={styles.previewWrap}>
                  <img
                    src={existingImageUrl.indexOf('http') === 0 ? existingImageUrl : API + existingImageUrl}
                    alt="Current"
                    style={styles.previewImage}
                  />
                  <button type="button" onClick={removeSelectedImage} style={styles.removePreviewBtn}>
                    <X size={12} />
                  </button>
                </div>
              ) : null}
            </div>

            <div>
              <label style={styles.label}>Image Alt Text</label>
              <input
                type="text"
                value={imageAlt}
                onChange={(e) => setImageAlt(e.target.value)}
                placeholder="Describe the image for accessibility and SEO"
                style={styles.input}
              />
            </div>

            <div style={styles.sectionDivider} />

            <div>
              <label style={styles.label}>Attach Document (PDF / DOCX) — optional</label>
              <label style={styles.uploadLabel}>
                <UploadCloud size={20} color="#64748b" />
                <span style={{ fontSize: '13px', color: docFile ? '#0f172a' : '#64748b' }}>
                  {docFile ? docFile.name : existingFileUrl ? (fileName || 'Current file attached (click to replace)') : 'Click to select a document (e.g. agenda, report)'}
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleDocChange}
                  style={{ display: 'none' }}
                />
              </label>

              {(docFile || existingFileUrl) ? (
                <div style={styles.fileConfirmRow}>
                  <FileText size={16} color="#0b192c" />
                  <span style={styles.fileConfirmText}>{docFile ? docFile.name : fileName}</span>
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