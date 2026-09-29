'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadCloud, Pencil, Trash2, Plus, X, FolderOpen, Image as ImageIcon } from 'lucide-react';

const API = 'https://colombo-plan-full-production.up.railway.app';

function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export default function WhatWeDoAdmin() {
  const [programs, setPrograms] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const cardImageInputRef = useRef(null);
  const heroImageInputRef = useRef(null);

  // Basic info
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [slugTouched, setSlugTouched] = useState(false);
  const [shortCode, setShortCode] = useState('');
  const [categoryBadge, setCategoryBadge] = useState('');
  const [establishedInfo, setEstablishedInfo] = useState('');

  // Images
  const [cardImageFile, setCardImageFile] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState('');
  const [existingCardImageUrl, setExistingCardImageUrl] = useState('');

  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [existingHeroImageUrl, setExistingHeroImageUrl] = useState('');

  // Descriptions
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  // Portal button
  const [portalButtonText, setPortalButtonText] = useState('');
  const [portalUrl, setPortalUrl] = useState('');

  // Feature cards (dynamic)
  const [featureSectionTitle, setFeatureSectionTitle] = useState('');
  const [featureCards, setFeatureCards] = useState([]);

  // Impact section (dynamic badges)
  const [impactTitle, setImpactTitle] = useState('');
  const [impactDescription, setImpactDescription] = useState('');
  const [impactBadges, setImpactBadges] = useState([]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const loadPrograms = () => {
    fetch(API + '/api/programs')
      .then((res) => res.json())
      .then(setPrograms)
      .catch(() => setPrograms([]));
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    if (!slugTouched) {
      setSlug(slugify(title));
    }
  }, [title, slugTouched]);

  useEffect(() => {
    if (!cardImageFile) {
      setCardImagePreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(cardImageFile);
    setCardImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [cardImageFile]);

  useEffect(() => {
    if (!heroImageFile) {
      setHeroImagePreview('');
      return;
    }
    const objectUrl = URL.createObjectURL(heroImageFile);
    setHeroImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [heroImageFile]);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setSlugTouched(false);
    setShortCode('');
    setCategoryBadge('');
    setEstablishedInfo('');
    setCardImageFile(null);
    setCardImagePreview('');
    setExistingCardImageUrl('');
    setHeroImageFile(null);
    setHeroImagePreview('');
    setExistingHeroImageUrl('');
    setShortDescription('');
    setFullDescription('');
    setPortalButtonText('');
    setPortalUrl('');
    setFeatureSectionTitle('');
    setFeatureCards([]);
    setImpactTitle('');
    setImpactDescription('');
    setImpactBadges([]);
    setEditingId(null);
    setMessage('');
    if (cardImageInputRef.current) cardImageInputRef.current.value = '';
    if (heroImageInputRef.current) heroImageInputRef.current.value = '';
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
  };

  const safeParseArray = (value) => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const openEditForm = (program) => {
    setEditingId(program.id);
    setTitle(program.title || '');
    setSlug(program.slug || slugify(program.title || ''));
    setSlugTouched(!!program.slug);
    setShortCode(program.shortCode || '');
    setCategoryBadge(program.categoryBadge || '');
    setEstablishedInfo(program.establishedInfo || '');
    setExistingCardImageUrl(program.imageUrl || '');
    setExistingHeroImageUrl(program.heroImageUrl || '');
    setShortDescription(program.description || '');
    setFullDescription(program.fullDescription || '');
    setPortalButtonText(program.portalButtonText || '');
    setPortalUrl(program.portalUrl || '');
    setFeatureSectionTitle(program.featureSectionTitle || '');
    setFeatureCards(safeParseArray(program.featureCardsJson));
    setImpactTitle(program.impactTitle || '');
    setImpactDescription(program.impactDescription || '');
    setImpactBadges(safeParseArray(program.impactBadgesJson));
    setCardImageFile(null);
    setCardImagePreview('');
    setHeroImageFile(null);
    setHeroImagePreview('');
    setMessage('');
    setShowForm(true);
  };

  const handleCardImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(selected.type)) {
      setMessage('Only image files are allowed (JPG/PNG/WEBP).');
      return;
    }
    setMessage('');
    setCardImageFile(selected);
  };

  const handleHeroImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;
    const allowed = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowed.includes(selected.type)) {
      setMessage('Only image files are allowed (JPG/PNG/WEBP).');
      return;
    }
    setMessage('');
    setHeroImageFile(selected);
  };

  const removeCardImage = () => {
    setCardImageFile(null);
    setCardImagePreview('');
    setExistingCardImageUrl('');
    if (cardImageInputRef.current) cardImageInputRef.current.value = '';
  };

  const removeHeroImage = () => {
    setHeroImageFile(null);
    setHeroImagePreview('');
    setExistingHeroImageUrl('');
    if (heroImageInputRef.current) heroImageInputRef.current.value = '';
  };

  // Feature cards handlers
  const addFeatureCard = () => {
    setFeatureCards([...featureCards, { title: '', description: '' }]);
  };

  const updateFeatureCard = (index, field, value) => {
    const updated = [...featureCards];
    updated[index] = { ...updated[index], [field]: value };
    setFeatureCards(updated);
  };

  const removeFeatureCard = (index) => {
    setFeatureCards(featureCards.filter((_, i) => i !== index));
  };

  // Impact badges handlers
  const addImpactBadge = () => {
    setImpactBadges([...impactBadges, '']);
  };

  const updateImpactBadge = (index, value) => {
    const updated = [...impactBadges];
    updated[index] = value;
    setImpactBadges(updated);
  };

  const removeImpactBadge = (index) => {
    setImpactBadges(impactBadges.filter((_, i) => i !== index));
  };

  const uploadFile = async (fileToUpload) => {
    const formData = new FormData();
    formData.append('file', fileToUpload);
    let res = await fetch(API + '/api/upload', { method: 'POST', body: formData });
    if (!res.ok) {
      res = await fetch(API + '/api/v1/upload', { method: 'POST', body: formData });
    }
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
      let imageUrl = existingCardImageUrl;
      let heroImageUrl = existingHeroImageUrl;

      if (cardImageFile) {
        try {
          imageUrl = await uploadFile(cardImageFile);
        } catch {
          setMessage('Card thumbnail upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      if (heroImageFile) {
        try {
          heroImageUrl = await uploadFile(heroImageFile);
        } catch {
          setMessage('Hero image upload failed. Please try again.');
          setSaving(false);
          return;
        }
      }

      const cleanFeatureCards = featureCards.filter((c) => c.title || c.description);
      const cleanImpactBadges = impactBadges.filter((b) => b.trim() !== '');

      const payload = {
        title,
        slug: slug || slugify(title),
        shortCode,
        categoryBadge,
        establishedInfo,
        imageUrl,
        heroImageUrl,
        description: shortDescription,
        fullDescription,
        portalButtonText,
        portalUrl,
        featureSectionTitle,
        featureCardsJson: JSON.stringify(cleanFeatureCards),
        impactTitle,
        impactDescription,
        impactBadgesJson: JSON.stringify(cleanImpactBadges),
      };

      const url = editingId ? API + '/api/programs/' + editingId : API + '/api/programs';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowForm(false);
        resetForm();
        loadPrograms();
      } else {
        setMessage('Failed to save. Please try again.');
      }
    } catch (err) {
      setMessage('Could not connect to the server.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this programme?')) return;
    await fetch(API + '/api/programs/' + id, { method: 'DELETE' });
    loadPrograms();
  };

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>What We Do</h2>
          <p style={styles.subtitle}>Manage programme content shown on the public site</p>
        </div>
        <button onClick={openAddForm} style={styles.addButton}>
          <Plus size={16} />
          Add New Programme
        </button>
      </div>

      <div style={styles.grid}>
        {programs.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIconWrap}>
              <FolderOpen size={20} color="#1d4ed8" />
            </div>
            <p style={styles.emptyTitle}>No programmes yet</p>
            <p style={styles.emptyText}>Click "Add New Programme" to get started.</p>
          </div>
        ) : (
          programs.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.cardImage}>
                {p.imageUrl ? (
                  <img src={p.imageUrl.startsWith('http') ? p.imageUrl : API + p.imageUrl} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <FolderOpen size={20} color="#94a3b8" />
                )}
              </div>
              <div style={styles.cardBody}>
                {p.shortCode ? <p style={styles.cardCode}>{p.shortCode}</p> : null}
                <p style={styles.cardTitle}>{p.title}</p>
                <p style={styles.cardDesc}>{p.description}</p>
                <div style={styles.cardActions}>
                  <button onClick={() => openEditForm(p)} style={styles.editBtn}>
                    <Pencil size={13} />
                    Edit
                  </button>
                  <button onClick={() => handleDelete(p.id)} style={styles.deleteBtn}>
                    <Trash2 size={13} />
                    Delete
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
              <h3 style={styles.modalTitle}>{editingId ? 'Edit Programme' : 'Add New Programme'}</h3>
              <button onClick={() => setShowForm(false)} style={styles.closeBtn}>
                <X size={18} color="#64748b" />
              </button>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>

              <p style={styles.sectionLabel}>Basic Info</p>

              <div>
                <label style={styles.label}>Title *</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Drug Advisory Programme (DAP)"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>URL Slug</label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => { setSlug(slugify(e.target.value)); setSlugTouched(true); }}
                  placeholder="dap"
                  style={styles.slugInput}
                />
                <p style={styles.helperText}>{'Page URL: /what-we-do/' + (slug || 'your-slug-here')}</p>
              </div>

              <div style={styles.row2}>
                <div>
                  <label style={styles.label}>Short Code</label>
                  <input
                    type="text"
                    value={shortCode}
                    onChange={(e) => setShortCode(e.target.value)}
                    placeholder="e.g. DAP"
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Category Badge</label>
                  <input
                    type="text"
                    value={categoryBadge}
                    onChange={(e) => setCategoryBadge(e.target.value)}
                    placeholder="e.g. Flagship Programme"
                    style={styles.input}
                  />
                </div>
              </div>

              <div>
                <label style={styles.label}>Established Info (optional)</label>
                <input
                  type="text"
                  value={establishedInfo}
                  onChange={(e) => setEstablishedInfo(e.target.value)}
                  placeholder="e.g. EST. 1973 (WELLINGTON, NZ)"
                  style={styles.input}
                />
              </div>

              <div style={styles.divider} />
              <p style={styles.sectionLabel}>Images</p>

              <div>
                <label style={styles.label}>Card Thumbnail (shown on the What We Do list)</label>
                <label style={styles.uploadLabel}>
                  <UploadCloud size={18} color="#64748b" />
                  <span style={{ fontSize: '13px', color: cardImageFile ? '#0f172a' : '#94a3b8' }}>
                    {cardImageFile ? cardImageFile.name : existingCardImageUrl ? 'Current image attached (click to replace)' : 'Choose an image'}
                  </span>
                  <input ref={cardImageInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleCardImageChange} style={{ display: 'none' }} />
                </label>
                {cardImagePreview ? (
                  <div style={styles.previewWrap}>
                    <img src={cardImagePreview} alt="Preview" style={styles.previewImage} />
                    <button type="button" onClick={removeCardImage} style={styles.removePreviewBtn}><X size={12} /></button>
                  </div>
                ) : existingCardImageUrl ? (
                  <div style={styles.previewWrap}>
                    <img src={existingCardImageUrl.startsWith('http') ? existingCardImageUrl : API + existingCardImageUrl} alt="Current" style={styles.previewImage} />
                    <button type="button" onClick={removeCardImage} style={styles.removePreviewBtn}><X size={12} /></button>
                  </div>
                ) : null}
              </div>

              <div>
                <label style={styles.label}>Hero Logo Image (optional — shown on the detail page)</label>
                <label style={styles.uploadLabel}>
                  <ImageIcon size={18} color="#64748b" />
                  <span style={{ fontSize: '13px', color: heroImageFile ? '#0f172a' : '#94a3b8' }}>
                    {heroImageFile ? heroImageFile.name : existingHeroImageUrl ? 'Current image attached (click to replace)' : 'Choose an image, or leave empty for a text-only logo card'}
                  </span>
                  <input ref={heroImageInputRef} type="file" accept=".jpg,.jpeg,.png,.webp" onChange={handleHeroImageChange} style={{ display: 'none' }} />
                </label>
                {heroImagePreview ? (
                  <div style={styles.previewWrap}>
                    <img src={heroImagePreview} alt="Preview" style={styles.previewImage} />
                    <button type="button" onClick={removeHeroImage} style={styles.removePreviewBtn}><X size={12} /></button>
                  </div>
                ) : existingHeroImageUrl ? (
                  <div style={styles.previewWrap}>
                    <img src={existingHeroImageUrl.startsWith('http') ? existingHeroImageUrl : API + existingHeroImageUrl} alt="Current" style={styles.previewImage} />
                    <button type="button" onClick={removeHeroImage} style={styles.removePreviewBtn}><X size={12} /></button>
                  </div>
                ) : null}
              </div>

              <div style={styles.divider} />
              <p style={styles.sectionLabel}>Description</p>

              <div>
                <label style={styles.label}>Short Description (shown on the list card)</label>
                <textarea
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  rows={3}
                  placeholder="One or two sentences summarising this programme..."
                  style={styles.textarea}
                />
              </div>

              <div>
                <label style={styles.label}>Full Description (shown on the detail page)</label>
                <textarea
                  value={fullDescription}
                  onChange={(e) => setFullDescription(e.target.value)}
                  rows={5}
                  placeholder="Detailed description shown in the hero section of the detail page..."
                  style={styles.textarea}
                />
              </div>

              <div style={styles.divider} />
              <p style={styles.sectionLabel}>Portal Button (optional)</p>

              <div style={styles.row2}>
                <div>
                  <label style={styles.label}>Button Text</label>
                  <input
                    type="text"
                    value={portalButtonText}
                    onChange={(e) => setPortalButtonText(e.target.value)}
                    placeholder="e.g. Visit DAP Official Portal"
                    style={styles.input}
                  />
                </div>
                <div>
                  <label style={styles.label}>Button URL</label>
                  <input
                    type="text"
                    value={portalUrl}
                    onChange={(e) => setPortalUrl(e.target.value)}
                    placeholder="https://..."
                    style={styles.input}
                  />
                </div>
              </div>

              <div style={styles.divider} />
              <div style={styles.sectionHeaderRow}>
                <p style={styles.sectionLabel}>Feature Cards (optional)</p>
                <button type="button" onClick={addFeatureCard} style={styles.addSmallBtn}>
                  <Plus size={14} />
                  Add Card
                </button>
              </div>

              <div>
                <label style={styles.label}>Section Title</label>
                <input
                  type="text"
                  value={featureSectionTitle}
                  onChange={(e) => setFeatureSectionTitle(e.target.value)}
                  placeholder="e.g. Drug Demand Reduction (DDR)"
                  style={styles.input}
                />
              </div>

              {featureCards.map((card, index) => (
                <div key={index} style={styles.dynamicItemBox}>
                  <div style={styles.dynamicItemHeader}>
                    <span style={styles.dynamicItemNumber}>{String(index + 1).padStart(2, '0')}</span>
                    <button type="button" onClick={() => removeFeatureCard(index)} style={styles.removeItemBtn}>
                      <X size={13} />
                    </button>
                  </div>
                  <input
                    type="text"
                    value={card.title}
                    onChange={(e) => updateFeatureCard(index, 'title', e.target.value)}
                    placeholder="Card title"
                    style={{ ...styles.input, marginBottom: '8px' }}
                  />
                  <textarea
                    value={card.description}
                    onChange={(e) => updateFeatureCard(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="Card description"
                    style={styles.textarea}
                  />
                </div>
              ))}

              <div style={styles.divider} />
              <div style={styles.sectionHeaderRow}>
                <p style={styles.sectionLabel}>Impact Section (optional)</p>
                <button type="button" onClick={addImpactBadge} style={styles.addSmallBtn}>
                  <Plus size={14} />
                  Add Badge
                </button>
              </div>

              <div>
                <label style={styles.label}>Impact Section Title</label>
                <input
                  type="text"
                  value={impactTitle}
                  onChange={(e) => setImpactTitle(e.target.value)}
                  placeholder="e.g. Global Impact & Professional Standards"
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.label}>Impact Description</label>
                <textarea
                  value={impactDescription}
                  onChange={(e) => setImpactDescription(e.target.value)}
                  rows={3}
                  placeholder="Paragraph describing the programme's impact..."
                  style={styles.textarea}
                />
              </div>

              {impactBadges.map((badge, index) => (
                <div key={index} style={styles.badgeRow}>
                  <input
                    type="text"
                    value={badge}
                    onChange={(e) => updateImpactBadge(index, e.target.value)}
                    placeholder="e.g. 80+ Countries Reached"
                    style={{ ...styles.input, flex: 1 }}
                  />
                  <button type="button" onClick={() => removeImpactBadge(index)} style={styles.removeItemBtn}>
                    <X size={13} />
                  </button>
                </div>
              ))}

              {message && <p style={styles.errorText}>{message}</p>}

              <button type="submit" disabled={saving} style={{ ...styles.submitBtn, opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Saving...' : editingId ? 'Update Programme' : 'Save Programme'}
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
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' },
  emptyState: { gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px' },
  emptyIconWrap: { width: '46px', height: '46px', borderRadius: '50%', backgroundColor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' },
  emptyTitle: { fontSize: '15px', fontWeight: '600', color: '#0f172a', margin: '0 0 6px 0' },
  emptyText: { fontSize: '13px', color: '#94a3b8', margin: 0, textAlign: 'center' },
  card: { backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden' },
  cardImage: { height: '130px', backgroundColor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  cardBody: { padding: '14px' },
  cardCode: { fontSize: '11px', fontWeight: '700', color: '#1d4ed8', margin: '0 0 4px 0', textTransform: 'uppercase' },
  cardTitle: { fontWeight: '600', color: '#0f172a', margin: 0, fontSize: '15px' },
  cardDesc: { fontSize: '13px', color: '#64748b', margin: '6px 0 12px 0', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' },
  cardActions: { display: 'flex', gap: '8px' },
  editBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#1e40af', background: 'none', border: 'none', cursor: 'pointer' },
  deleteBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '24px' },
  modal: { backgroundColor: '#fff', borderRadius: '12px', padding: '28px', width: '560px', maxHeight: '88vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  modalTitle: { margin: 0, fontSize: '18px', color: '#0f172a', fontWeight: 'bold' },
  closeBtn: { background: 'none', border: 'none', cursor: 'pointer' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  sectionLabel: { fontSize: '12px', fontWeight: '700', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '4px 0' },
  sectionHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  divider: { borderTop: '1px solid #e2e8f0', margin: '4px 0' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { fontSize: '13px', color: '#475569', marginBottom: '4px', display: 'block' },
  helperText: { fontSize: '11px', color: '#94a3b8', margin: '4px 0 0 0' },
  input: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' },
  slugInput: { width: '100%', padding: '10px 12px', fontSize: '13px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', fontFamily: 'monospace', color: '#475569' },
  textarea: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box', resize: 'vertical' },
  uploadLabel: { display: 'flex', alignItems: 'center', gap: '10px', border: '1.5px dashed #cbd5e1', borderRadius: '8px', padding: '14px', cursor: 'pointer' },
  previewWrap: { marginTop: '10px', position: 'relative', display: 'inline-block' },
  previewImage: { width: '160px', height: '100px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #cbd5e1', display: 'block' },
  removePreviewBtn: { position: 'absolute', top: '-8px', right: '-8px', width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#0b192c', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  addSmallBtn: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', fontWeight: '600', color: '#1d4ed8', background: '#eff6ff', border: 'none', borderRadius: '6px', padding: '6px 10px', cursor: 'pointer' },
  dynamicItemBox: { border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', backgroundColor: '#f8fafc' },
  dynamicItemHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' },
  dynamicItemNumber: { fontSize: '11px', fontWeight: '700', color: '#1d4ed8' },
  badgeRow: { display: 'flex', alignItems: 'center', gap: '8px' },
  removeItemBtn: { width: '22px', height: '22px', borderRadius: '50%', backgroundColor: '#fee2e2', color: '#b91c1c', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  errorText: { fontSize: '13px', color: '#b91c1c', margin: 0 },
  submitBtn: { backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
};