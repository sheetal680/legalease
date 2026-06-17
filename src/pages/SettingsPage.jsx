import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  User, MapPin, Briefcase, Camera, PenLine,
  LogOut, Upload, X, CheckCircle, AlertCircle,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import { usePageTitle } from '../hooks/usePageTitle'
import Footer from '../components/Footer'

// ─── Static data (mirrored from OnboardingPage) ──────────────────────────────

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

const SPECIALIZATIONS = [
  'Criminal Lawyer', 'Financial / Corporate Lawyer', 'Family Lawyer',
  'Civil Lawyer', 'Property / Real Estate Lawyer', 'Tax Lawyer',
  'Immigration Lawyer', 'Intellectual Property (IP) Lawyer',
  'Labour / Employment Lawyer', 'Other',
]

const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada',
  'Malayalam', 'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Other',
]

// ─── Validators ──────────────────────────────────────────────────────────────

function validate(form) {
  const errs = {}
  if (!form.full_name.trim())    errs.full_name    = 'Full name is required'
  if (!form.bar_number.trim())   errs.bar_number   = 'Bar Council number is required'
  if (!form.phone.trim()) {
    errs.phone = 'Phone number is required'
  } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ''))) {
    errs.phone = 'Enter a valid 10-digit Indian mobile number'
  }
  if (!form.address_line1.trim()) errs.address_line1 = 'Address is required'
  if (!form.city.trim())          errs.city          = 'City is required'
  if (!form.state)                errs.state         = 'State is required'
  if (!/^\d{6}$/.test(form.pin_code)) errs.pin_code  = 'Enter a valid 6-digit PIN code'
  if (!form.specialization)      errs.specialization = 'Please select a specialization'
  if (!form.languages?.length)   errs.languages      = 'Select at least one language'
  return errs
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function SettingsPage() {
  const { user, profile, signOut, refreshProfile } = useAuth()
  const navigate = useNavigate()
  usePageTitle('Settings')

  const [form, setForm] = useState(null)           // null = still loading
  const [errors, setErrors]       = useState({})
  const [saving, setSaving]       = useState(false)

  // Photo state
  const [photoFile, setPhotoFile]       = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [savingPhoto, setSavingPhoto]   = useState(false)
  const photoRef = useRef(null)

  // Signature state
  const [sigFile, setSigFile]       = useState(null)
  const [sigPreview, setSigPreview] = useState(null)
  const [savingSig, setSavingSig]   = useState(false)
  const sigRef = useRef(null)

  // ── Load profile & subscription into form ──────────────────────────────────
  useEffect(() => {
    if (!profile) return
    setForm({
      full_name:        profile.full_name        ?? '',
      bar_number:       profile.bar_number       ?? '',
      firm_name:        profile.firm_name        ?? '',
      designation:      profile.designation      ?? '',
      years_experience: profile.years_experience != null ? String(profile.years_experience) : '',
      phone:            profile.phone            ?? '',
      email:            profile.email            ?? user?.email ?? '',
      address_line1:    profile.address_line1    ?? '',
      address_line2:    profile.address_line2    ?? '',
      city:             profile.city             ?? '',
      state:            profile.state            ?? '',
      pin_code:         profile.pin_code         ?? '',
      jurisdiction:     profile.jurisdiction     ?? '',
      languages:        profile.languages        ?? [],
      specialization:   profile.specialization   ?? '',
    })
    setPhotoPreview(profile.profile_photo_url ?? null)
    setSigPreview(profile.signature_url       ?? null)
  }, [profile, user])

  // ── Field helpers ──────────────────────────────────────────────────────────

  function set(field, value) {
    setForm(f => ({ ...f, [field]: value }))
    if (errors[field]) setErrors(e => { const n = { ...e }; delete n[field]; return n })
  }

  function toggleLanguage(lang) {
    setForm(f => ({
      ...f,
      languages: f.languages.includes(lang)
        ? f.languages.filter(l => l !== lang)
        : [...f.languages, lang],
    }))
    if (errors.languages) setErrors(e => { const n = { ...e }; delete n.languages; return n })
  }

  // ── Upload helpers ─────────────────────────────────────────────────────────

  async function uploadFile(bucket, file) {
    const ext  = file.name.split('.').pop()
    const path = `${user.id}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
    if (error) throw error
    return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
  }

  function handleFileSelect(e, kind) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) { toast.error('File must be under 2 MB'); return }
    const url = URL.createObjectURL(file)
    if (kind === 'photo') { setPhotoFile(file); setPhotoPreview(url) }
    else                  { setSigFile(file);   setSigPreview(url)   }
  }

  async function savePhoto() {
    if (!photoFile) return
    setSavingPhoto(true)
    try {
      const url = await uploadFile('profile-photos', photoFile)
      await supabase.from('lawyer_profiles').update({ profile_photo_url: url }).eq('user_id', user.id)
      await refreshProfile()
      setPhotoFile(null)
      toast.success('Profile photo updated')
    } catch (err) {
      toast.error(err.message || 'Upload failed')
    } finally { setSavingPhoto(false) }
  }

  async function saveSignature() {
    if (!sigFile) return
    setSavingSig(true)
    try {
      const url = await uploadFile('signatures', sigFile)
      await supabase.from('lawyer_profiles').update({ signature_url: url }).eq('user_id', user.id)
      await refreshProfile()
      setSigFile(null)
      toast.success('Signature updated')
    } catch (err) {
      toast.error(err.message || 'Upload failed')
    } finally { setSavingSig(false) }
  }

  // ── Save profile ───────────────────────────────────────────────────────────

  async function handleSave() {
    const errs = validate(form)
    if (Object.keys(errs).length) {
      setErrors(errs)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      toast.error('Please fix the errors before saving')
      return
    }
    setSaving(true)
    try {
      const { error } = await supabase
        .from('lawyer_profiles')
        .update({
          full_name:       form.full_name.trim(),
          bar_number:      form.bar_number.trim(),
          firm_name:       form.firm_name.trim()  || null,
          designation:     form.designation.trim() || null,
          years_experience: form.years_experience ? parseInt(form.years_experience, 10) : null,
          phone:           form.phone.trim(),
          address_line1:   form.address_line1.trim(),
          address_line2:   form.address_line2.trim() || null,
          city:            form.city.trim(),
          state:           form.state,
          pin_code:        form.pin_code.trim(),
          jurisdiction:    form.jurisdiction.trim() || null,
          languages:       form.languages,
          specialization:  form.specialization,
        })
        .eq('user_id', user.id)

      if (error) throw error
      await refreshProfile()
      toast.success('Profile saved successfully')
    } catch (err) {
      toast.error(err.message || 'Could not save. Try again.')
    } finally { setSaving(false) }
  }

  // ── Sign out ───────────────────────────────────────────────────────────────

  async function handleSignOut() {
    try { await signOut() }
    catch { toast.error('Sign out failed') }
  }

  // ── Loading skeleton ───────────────────────────────────────────────────────

  if (!form) {
    return (
      <div className="min-h-screen bg-[#f8f9fa] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-[#1e3a5f] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400">Loading your profile…</p>
        </div>
      </div>
    )
  }

  const hasUnsavedPhoto = Boolean(photoFile)
  const hasUnsavedSig  = Boolean(sigFile)

  return (
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col">
      <div className="max-w-3xl mx-auto px-4 py-10 space-y-8 flex-1 w-full">

        {/* Page title */}
        <div>
          <h1 className="text-2xl font-bold text-[#1e3a5f]">Settings</h1>
          <p className="text-sm text-gray-400 mt-1">Manage your profile and account preferences.</p>
        </div>

        {/* ── SECTION: Personal Details ── */}
        <Section icon={User} title="Personal Details">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Full Name" required error={errors.full_name}>
              <input type="text" value={form.full_name} onChange={e => set('full_name', e.target.value)}
                placeholder="Adv. Priya Sharma" className={inp(errors.full_name)} />
            </Field>
            <Field label="Bar Council Registration Number" required error={errors.bar_number}>
              <input type="text" value={form.bar_number} onChange={e => set('bar_number', e.target.value)}
                placeholder="MH/1234/2015" className={inp(errors.bar_number)} />
            </Field>
            <Field label="Law Firm / Practice Name">
              <input type="text" value={form.firm_name} onChange={e => set('firm_name', e.target.value)}
                placeholder="Sharma & Associates" className={inp()} />
            </Field>
            <Field label="Designation">
              <input type="text" value={form.designation} onChange={e => set('designation', e.target.value)}
                placeholder="Senior Advocate" className={inp()} />
            </Field>
            <Field label="Years of Experience">
              <input type="number" min="0" max="60" value={form.years_experience}
                onChange={e => set('years_experience', e.target.value)}
                placeholder="8" className={inp()} />
            </Field>
          </div>
        </Section>

        {/* ── SECTION: Contact & Location ── */}
        <Section icon={MapPin} title="Contact & Location">
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Phone Number" required error={errors.phone} hint="10-digit Indian number">
              <input type="tel" maxLength={10} value={form.phone}
                onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                placeholder="9876543210" className={inp(errors.phone)} />
            </Field>
            <Field label="Email Address" hint="From your Google account">
              <input type="email" value={form.email} readOnly
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed" />
            </Field>
            <Field label="Office Address Line 1" required error={errors.address_line1} cls="sm:col-span-2">
              <input type="text" value={form.address_line1} onChange={e => set('address_line1', e.target.value)}
                placeholder="Chamber No. 12, District Court Complex" className={inp(errors.address_line1)} />
            </Field>
            <Field label="Office Address Line 2" cls="sm:col-span-2">
              <input type="text" value={form.address_line2} onChange={e => set('address_line2', e.target.value)}
                placeholder="Near Sessions Court" className={inp()} />
            </Field>
            <Field label="City" required error={errors.city}>
              <input type="text" value={form.city} onChange={e => set('city', e.target.value)}
                placeholder="Mumbai" className={inp(errors.city)} />
            </Field>
            <Field label="PIN Code" required error={errors.pin_code}>
              <input type="text" maxLength={6} value={form.pin_code}
                onChange={e => set('pin_code', e.target.value.replace(/\D/g, ''))}
                placeholder="400001" className={inp(errors.pin_code)} />
            </Field>
            <Field label="State / Union Territory" required error={errors.state} cls="sm:col-span-2">
              <select value={form.state} onChange={e => set('state', e.target.value)} className={sel(errors.state)}>
                <option value="">Select state…</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Jurisdiction / High Court" cls="sm:col-span-2">
              <input type="text" value={form.jurisdiction} onChange={e => set('jurisdiction', e.target.value)}
                placeholder="Bombay High Court" className={inp()} />
            </Field>
          </div>
        </Section>

        {/* ── SECTION: Professional Details ── */}
        <Section icon={Briefcase} title="Professional Details">
          <div className="space-y-6">
            <Field label="Specialization" required error={errors.specialization}>
              <select value={form.specialization} onChange={e => set('specialization', e.target.value)}
                className={sel(errors.specialization)}>
                <option value="">Select specialization…</option>
                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>

            <div>
              <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
                Languages Spoken <span className="text-red-500">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-3">Select all that apply</p>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => {
                  const active = form.languages.includes(lang)
                  return (
                    <button key={lang} type="button" onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                        active
                          ? 'bg-[#1e3a5f] border-[#1e3a5f] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#1e3a5f]'
                      }`}>
                      {active && <CheckCircle className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}
                      {lang}
                    </button>
                  )
                })}
              </div>
              {errors.languages && <ErrMsg msg={errors.languages} />}
            </div>
          </div>
        </Section>

        {/* ── SECTION: Profile Photo ── */}
        <Section icon={Camera} title="Profile Photo">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Preview */}
            <div className="shrink-0">
              {photoPreview ? (
                <div className="relative">
                  <img src={photoPreview} alt="Profile"
                    className="w-24 h-24 rounded-full object-cover border-4 border-[#1e3a5f]/20 shadow-sm" />
                  {hasUnsavedPhoto && (
                    <button onClick={() => { setPhotoFile(null); setPhotoPreview(profile?.profile_photo_url ?? null); if (photoRef.current) photoRef.current.value = '' }}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-[#1e3a5f]/10 border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-300" />
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex-1 space-y-3">
              <p className="text-sm text-gray-500">
                Upload a clear, professional photo. It will appear on your exported documents.
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={() => photoRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-gray-200 hover:border-[#1e3a5f] text-[#1e3a5f] text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" />
                  {photoPreview ? 'Change Photo' : 'Upload Photo'}
                </button>
                {hasUnsavedPhoto && (
                  <button onClick={savePhoto} disabled={savingPhoto}
                    className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                    {savingPhoto
                      ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      : <CheckCircle className="w-4 h-4" />}
                    {savingPhoto ? 'Saving…' : 'Save Photo'}
                  </button>
                )}
              </div>
              <p className="text-xs text-gray-400">JPG or PNG, max 2 MB</p>
              <input ref={photoRef} type="file" accept="image/jpeg,image/png,image/webp"
                className="hidden" onChange={e => handleFileSelect(e, 'photo')} />
            </div>
          </div>
        </Section>

        {/* ── SECTION: Digital Signature ── */}
        <Section icon={PenLine} title="Digital Signature">
          <div className="space-y-4">
            <p className="text-sm text-gray-500">
              Upload a clear image of your signature on plain white paper. This will be embedded in exported legal documents.
            </p>

            {sigPreview ? (
              <div className="flex items-start gap-4">
                <div className="relative">
                  <img src={sigPreview} alt="Signature"
                    className="h-20 w-auto max-w-xs rounded-xl border-2 border-gray-200 bg-white object-contain p-2 shadow-sm" />
                  {hasUnsavedSig && (
                    <button onClick={() => { setSigFile(null); setSigPreview(profile?.signature_url ?? null); if (sigRef.current) sigRef.current.value = '' }}
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <button onClick={() => sigRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-200 hover:border-[#1e3a5f] rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-[#1e3a5f] transition-colors bg-gray-50 hover:bg-blue-50/20">
                <Upload className="w-6 h-6" />
                <span className="text-sm font-medium">Upload Signature</span>
                <span className="text-xs">JPG or PNG, max 2 MB</span>
              </button>
            )}

            <div className="flex flex-wrap gap-3">
              {sigPreview && (
                <button onClick={() => sigRef.current?.click()}
                  className="flex items-center gap-2 border-2 border-gray-200 hover:border-[#1e3a5f] text-[#1e3a5f] text-sm font-medium px-4 py-2 rounded-lg transition-colors">
                  <Upload className="w-4 h-4" /> Upload New Signature
                </button>
              )}
              {hasUnsavedSig && (
                <button onClick={saveSignature} disabled={savingSig}
                  className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] disabled:opacity-60 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
                  {savingSig
                    ? <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    : <CheckCircle className="w-4 h-4" />}
                  {savingSig ? 'Saving…' : 'Save Signature'}
                </button>
              )}
            </div>
            <input ref={sigRef} type="file" accept="image/jpeg,image/png"
              className="hidden" onChange={e => handleFileSelect(e, 'sig')} />
          </div>
        </Section>

        {/* ── Save button ── */}
        <div className="flex justify-end pt-2">
          <button onClick={handleSave} disabled={saving}
            className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-8 py-3 rounded-xl transition-colors shadow-sm">
            {saving
              ? <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> Saving…</>
              : <><CheckCircle className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>

        {/* ── SECTION: Danger Zone ── */}
        <div className="border-2 border-red-200 rounded-2xl p-6">
          <h2 className="text-base font-bold text-red-600 mb-1">Danger Zone</h2>
          <p className="text-sm text-gray-400 mb-5">Actions here cannot be undone without contacting support.</p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-red-100">
            <div>
              <p className="text-sm font-semibold text-gray-700">Sign out</p>
              <p className="text-xs text-gray-400">You will be redirected to the login page.</p>
            </div>
            <button onClick={handleSignOut}
              className="flex items-center gap-2 border-2 border-red-300 hover:bg-red-50 text-red-600 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              <LogOut className="w-4 h-4" /> Sign Out
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-t border-red-100">
            <div>
              <p className="text-sm font-semibold text-gray-700">Delete account</p>
              <p className="text-xs text-gray-400">Permanently delete your account and all documents.</p>
            </div>
            <button
              onClick={() => toast('Please contact support@legalease.in to delete your account.', { icon: '⚠️', duration: 5000 })}
              className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
              Delete Account
            </button>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Section({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100 bg-[#1e3a5f]/[0.02]">
        <div className="w-8 h-8 bg-[#1e3a5f]/10 rounded-lg flex items-center justify-center">
          <Icon className="w-4 h-4 text-[#1e3a5f]" />
        </div>
        <h2 className="text-sm font-bold text-[#1e3a5f] uppercase tracking-wide">{title}</h2>
      </div>
      <div className="p-6">{children}</div>
    </div>
  )
}

function Field({ label, required, error, hint, cls = '', children }) {
  return (
    <div className={cls}>
      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
        {hint && <span className="ml-2 text-xs font-normal text-gray-400">{hint}</span>}
      </label>
      {children}
      {error && <ErrMsg msg={error} />}
    </div>
  )
}

function ErrMsg({ msg }) {
  return (
    <p className="mt-1.5 flex items-center gap-1 text-xs text-red-500">
      <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {msg}
    </p>
  )
}

// ─── Style helpers ────────────────────────────────────────────────────────────

function inp(err) {
  return `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors
    focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]
    ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`
}

function sel(err) {
  return `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors appearance-none
    focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]
    ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`
}
