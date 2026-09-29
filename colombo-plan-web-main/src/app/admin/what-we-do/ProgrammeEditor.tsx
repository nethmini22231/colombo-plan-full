'use client';

import { useState, useEffect, useRef } from 'react';
import { UploadCloud, X, Plus, Image as ImageIcon } from 'lucide-react';

const API = 'https://colombo-plan-full-production.up.railway.app';

export default function ProgrammeEditor({ fixedSlug, fixedTitle }) {
  const [programId, setProgramId] = useState(null);
  const [loading, setLoading] = useState(true);

  const cardImageInputRef = useRef(null);
  const heroImageInputRef = useRef(null);

  const [title, setTitle] = useState(fixedTitle);
  const [shortCode, setShortCode] = useState('');
  const [categoryBadge, setCategoryBadge] = useState('');
  const [establishedInfo, setEstablishedInfo] = useState('');

  const [cardImageFile, setCardImageFile] = useState(null);
  const [cardImagePreview, setCardImagePreview] = useState('');
  const [existingCardImageUrl, setExistingCardImageUrl] = useState('');

  const [heroImageFile, setHeroImageFile] = useState(null);
  const [heroImagePreview, setHeroImagePreview] = useState('');
  const [existingHeroImageUrl, setExistingHeroImageUrl] = useState('');

  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');

  const [portalButtonText, setPortalButtonText] = useState('');
  const [portalUrl, setPortalUrl] = useState('');

  const [featureSectionTitle, setFeatureSectionTitle] = useState('');
  const [featureCards, setFeatureCards] = useState([]);

  const [impactTitle, setImpactTitle] = useState('');
  const [impactDescription, setImpactDescription] = useState('');
  const [impactBadges, setImpactBadges] = useState([]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const safeParseArray = (value) => {
    if (!value) return [];
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  };

  const loadProgram = async () => {
    setLoading(true);
    try {
      const res = await fetch(API + '/api/programs');
      const data = await res.json();
      const found = Array.isArray(data) ? data.find((p) => p.slug === fixedSlug) : null;

      if (found) {
        setProgramId(found.id);
        setTitle(found.title || fixedTitle);
        setShortCode(found.shortCode || '');
        setCategoryBadge(found.categoryBadge || '');
        setEstablishedInfo(found.establishedInfo || '');
        setExistingCardImageUrl(found.imageUrl || '');
        setExistingHeroImageUrl(found.heroImageUrl || '');
        setShortDescription(found.description || '');
        setFullDescription(found.fullDescription || '');
        setPortalButtonText(found.portalButtonText || '');
        setPortalUrl(found.portalUrl || '');
        setFeatureSectionTitle(found.featureSectionTitle || '');
        setFeatureCards(safeParseArray(found.featureCardsJson));
        setImpactTitle(found.impactTitle || '');
        setImpactDescription(found.impactDescription || '');
        setImpactBadges(safeParseArray(found.impactBadgesJson));
      } else {
        setProgramId(null);
        setTitle(fixedTitle);
      }
    } catch {
      setProgramId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProgram();
  }, [fixedSlug]);

  useEffect(() => {
    if (!cardImageFile) { setCardImagePreview(''); return; }
    const objectUrl = URL.createObjectURL(cardImageFile);
    setCardImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [cardImageFile]);

  useEffect(() => {
    if (!heroImageFile) { setHeroImagePreview(''); return; }
    const objectUrl = URL.createObjectURL(heroImageFile);
    setHeroImagePreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [heroImageFile]);

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

  const addFeatureCard = () => setFeatureCards([...featureCards, { title: '', description: '' }]);
  const updateFeatureCard = (index, field, value) => {
    const updated = [...featureCards];
    updated[index] = { ...updated[index], [field]: value };
    setFeatureCards(updated);
  };
  const removeFeatureCard = (index) => setFeatureCards(featureCards.filter((_, i) => i !== index));

  const addImpactBadge = () => setImpactBadges([...impactBadges, '']);
  const updateImpactBadge = (index, value) => {
    const updated = [...impactBadges];
    updated[index] = value;
    setImpactBadges(updated);
  };
  const removeImpactBadge = (index) => setImpactBadges(impactBadges.filter((_, i) => i !== index));

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
    setSaving(true);
    setMessage('');
    setSuccessMsg('');

    try {
      let imageUrl = existingCardImageUrl;
      let heroImageUrl = existingHeroImageUrl;

      if (cardImageFile) {
        try {
          imageUrl = await uploadFile(cardImageFile);
        } catch {
          setMessage('Card thumbnail upload failed.');
          setSaving(false);
          return;
        }
      }

      if (heroImageFile) {
        try {
          heroImageUrl = await uploadFile(heroImageFile);
        } catch {
          setMessage('Hero image upload failed.');
          setSaving(false);
          return;
        }
      }

      const cleanFeatureCards = featureCards.filter((c) => c.title || c.description);
      const cleanImpactBadges = impactBadges.filter((b) => b.trim() !== '');

      const payload = {
        title: title || fixedTitle,
        slug: fixedSlug,
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

      const url = programId ? API + '/api/programs/' + programId : API + '/api/programs';
      const method = programId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const saved = await res.json();
        setProgramId(saved.id);
        setSuccessMsg('Saved successfully.');
        setCardImageFile(null);
        setHeroImageFile(null);
      } else {
        setMessage('Failed to save. Please try again.');
      }
    } catch {
      setMessage('Could not connect to the server.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={styles.page}><p style={{ color: '#64748b' }}>Loading...</p></div>;
  }

  return (
    <main style={styles.page}>
      <div style={styles.headerRow}>
        <div>
          <h2 style={styles.title}>{fixedTitle}</h2>
          <p style={styles.subtitle}>Manage content shown on the public "What We Do" page</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>

        <p style={styles.sectionLabel}>Basic Info</p>

        <div>
          <label style={styles.label}>Display Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={fixedTitle} style={styles.input} />
        </div>

        <div style={styles.row2}>
          <div>
            <label style={styles.label}>Short Code</label>
            <input type="text" value={shortCode} onChange={(e) => setShortCode(e.target.value)} placeholder="e.g. DAP" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Category Badge</label>
            <input type="text" value={categoryBadge} onChange={(e) => setCategoryBadge(e.target.value)} placeholder="e.g. Flagship Programme" style={styles.input} />
          </div>
        </div>

        <div>
          <label style={styles.label}>Established Info (optional)</label>
          <input type="text" value={establishedInfo} onChange={(e) => setEstablishedInfo(e.target.value)} placeholder="e.g. EST. 1973 (WELLINGTON, NZ)" style={styles.input} />
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
          <label style={styles.label}>Hero Logo Image (optional)</label>
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
          <textarea value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} rows={3} placeholder="One or two sentences..." style={styles.textarea} />
        </div>

        <div>
          <label style={styles.label}>Full Description (shown on the detail page)</label>
          <textarea value={fullDescription} onChange={(e) => setFullDescription(e.target.value)} rows={5} placeholder="Detailed description..." style={styles.textarea} />
        </div>

        <div style={styles.divider} />
        <p style={styles.sectionLabel}>Portal Button (optional)</p>

        <div style={styles.row2}>
          <div>
            <label style={styles.label}>Button Text</label>
            <input type="text" value={portalButtonText} onChange={(e) => setPortalButtonText(e.target.value)} placeholder="e.g. Visit Official Portal" style={styles.input} />
          </div>
          <div>
            <label style={styles.label}>Button URL</label>
            <input type="text" value={portalUrl} onChange={(e) => setPortalUrl(e.target.value)} placeholder="https://..." style={styles.input} />
          </div>
        </div>

        <div style={styles.divider} />
        <div style={styles.sectionHeaderRow}>
          <p style={styles.sectionLabel}>Feature Cards (optional)</p>
          <button type="button" onClick={addFeatureCard} style={styles.addSmallBtn}><Plus size={14} />Add Card</button>
        </div>

        <div>
          <label style={styles.label}>Section Title</label>
          <input type="text" value={featureSectionTitle} onChange={(e) => setFeatureSectionTitle(e.target.value)} placeholder="e.g. Drug Demand Reduction (DDR)" style={styles.input} />
        </div>

        {featureCards.map((card, index) => (
          <div key={index} style={styles.dynamicItemBox}>
            <div style={styles.dynamicItemHeader}>
              <span style={styles.dynamicItemNumber}>{String(index + 1).padStart(2, '0')}</span>
              <button type="button" onClick={() => removeFeatureCard(index)} style={styles.removeItemBtn}><X size={13} /></button>
            </div>
            <input type="text" value={card.title} onChange={(e) => updateFeatureCard(index, 'title', e.target.value)} placeholder="Card title" style={{ ...styles.input, marginBottom: '8px' }} />
            <textarea value={card.description} onChange={(e) => updateFeatureCard(index, 'description', e.target.value)} rows={2} placeholder="Card description" style={styles.textarea} />
          </div>
        ))}

        <div style={styles.divider} />
        <div style={styles.sectionHeaderRow}>
          <p style={styles.sectionLabel}>Impact Section (optional)</p>
          <button type="button" onClick={addImpactBadge} style={styles.addSmallBtn}><Plus size={14} />Add Badge</button>
        </div>

        <div>
          <label style={styles.label}>Impact Section Title</label>
          <input type="text" value={impactTitle} onChange={(e) => setImpactTitle(e.target.value)} placeholder="e.g. Global Impact & Professional Standards" style={styles.input} />
        </div>

        <div>
          <label style={styles.label}>Impact Description</label>
          <textarea value={impactDescription} onChange={(e) => setImpactDescription(e.target.value)} rows={3} placeholder="Paragraph..." style={styles.textarea} />
        </div>

        {impactBadges.map((badge, index) => (
          <div key={index} style={styles.badgeRow}>
            <input type="text" value={badge} onChange={(e) => updateImpactBadge(index, e.target.value)} placeholder="e.g. 80+ Countries Reached" style={{ ...styles.input, flex: 1 }} />
            <button type="button" onClick={() => removeImpactBadge(index)} style={styles.removeItemBtn}><X size={13} /></button>
          </div>
        ))}

        {message ? <p style={styles.errorText}>{message}</p> : null}
        {successMsg ? <p style={styles.successText}>{successMsg}</p> : null}

        <button type="submit" disabled={saving} style={{ ...styles.submitBtn, opacity: saving ? 0.6 : 1 }}>
          {saving ? 'Saving...' : programId ? 'Update Programme' : 'Create Programme'}
        </button>
      </form>
    </main>
  );
}

const styles = {
  page: { flex: 1, padding: '32px', boxSizing: 'border-box', backgroundColor: '#f1f5f9', minHeight: '100vh' },
  headerRow: { marginBottom: '24px' },
  title: { fontSize: '26px', fontWeight: 'bold', color: '#0f172a', margin: 0 },
  subtitle: { fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' },
  form: { display: 'flex', flexDirection: 'column', gap: '14px', backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '28px', maxWidth: '700px' },
  sectionLabel: { fontSize: '12px', fontWeight: '700', color: '#1d4ed8', textTransform: 'uppercase', letterSpacing: '0.04em', margin: '4px 0' },
  sectionHeaderRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  divider: { borderTop: '1px solid #e2e8f0', margin: '4px 0' },
  row2: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' },
  label: { fontSize: '13px', color: '#475569', marginBottom: '4px', display: 'block' },
  input: { width: '100%', padding: '10px 12px', fontSize: '14px', border: '1px solid #cbd5e1', borderRadius: '8px', boxSizing: 'border-box' },
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
  successText: { fontSize: '13px', color: '#166534', margin: 0, fontWeight: '600' },
  submitBtn: { backgroundColor: '#0b192c', color: '#fff', border: 'none', padding: '12px', borderRadius: '8px', fontSize: '14px', cursor: 'pointer', fontWeight: '500' },
};