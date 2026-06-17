import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Scale, Upload, X, CheckCircle, ChevronRight, ChevronLeft, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import Footer from '../components/Footer'

// ─── Static data ────────────────────────────────────────────────────────────

const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
  'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
  // Union Territories
  'Andaman and Nicobar Islands', 'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu', 'Delhi (NCT)',
  'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
]

const SPECIALIZATIONS = [
  'Criminal Lawyer',
  'Financial / Corporate Lawyer',
  'Family Lawyer',
  'Civil Lawyer',
  'Property / Real Estate Lawyer',
  'Tax Lawyer',
  'Immigration Lawyer',
  'Intellectual Property (IP) Lawyer',
  'Labour / Employment Lawyer',
  'Other',
]

const LANGUAGES = [
  'English', 'Hindi', 'Tamil', 'Telugu', 'Kannada',
  'Malayalam', 'Marathi', 'Bengali', 'Gujarati', 'Punjabi', 'Other',
]

const SECTION_TITLES = [
  { label: 'Personal Details',      desc: 'Your name and bar registration' },
  { label: 'Contact & Location',    desc: 'How clients and courts can reach you' },
  { label: 'Professional Details',  desc: 'Your practice area and languages' },
  { label: 'Uploads',               desc: 'Profile photo and digital signature' },
]

const STORAGE_KEY = 'legalease_onboarding_draft'

// ─── Default form state ──────────────────────────────────────────────────────

function defaultForm(email = '') {
  return {
    full_name: '', bar_number: '', firm_name: '', designation: '',
    years_experience: '',
    phone: '', email, address_line1: '', address_line2: '',
    city: '', state: '', pin_code: '', jurisdiction: '',
    languages: [], specialization: '',
  }
}

// ─── Validators ──────────────────────────────────────────────────────────────

function validateSection(section, form) {
  const errs = {}
  if (section === 0) {
    if (!form.full_name.trim())  errs.full_name  = 'Full name is required'
    if (!form.bar_number.trim()) errs.bar_number = 'Bar Council number is required'
  }
  if (section === 1) {
    if (!form.phone.trim()) {
      errs.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ''))) {
      errs.phone = 'Enter a valid 10-digit Indian mobile number'
    }
    if (!form.address_line1.trim()) errs.address_line1 = 'Address is required'
    if (!form.city.trim())          errs.city          = 'City is required'
    if (!form.state)                errs.state         = 'State is required'
    if (!/^\d{6}$/.test(form.pin_code)) errs.pin_code  = 'Enter a valid 6-digit PIN code'
  }
  if (section === 2) {
    if (!form.specialization) errs.specialization = 'Please select a specialization'
    if (form.languages.length === 0) errs.languages = 'Select at least one language'
  }
  return errs
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const { user, refreshProfile } = useAuth()
  const navigate = useNavigate()

  useEffect(() => { document.title = 'LegalEase — Set Up Your Profile' }, [])

  const [section, setSection]   = useState(0)
  const [form, setForm]         = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...defaultForm(user?.email ?? ''), ...JSON.parse(saved) }
    } catch { /* ignore */ }
    return defaultForm(user?.email ?? '')
  })
  const [errors, setErrors]     = useState({})
  const [photoFile, setPhotoFile]   = useState(null)
  const [photoPreview, setPhotoPreview] = useState(null)
  const [sigFile, setSigFile]       = useState(null)
  const [sigPreview, setSigPreview] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const photoInputRef = useRef(null)
  const sigInputRef   = useRef(null)

  // Hydrate email from auth
  useEffect(() => {
    if (user?.email && !form.email) {
      setForm(f => ({ ...f, email: user.email }))
    }
  }, [user])

  // Persist to localStorage on every change (except uploads)
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(form)) } catch { /* ignore */ }
  }, [form])

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

  function handleFileSelect(e, kind) {
    const file = e.target.files?.[0]
    if (!file) return
    if (file.size > 2 * 1024 * 1024) {
      toast.error('File must be under 2 MB')
      return
    }
    const url = URL.createObjectURL(file)
    if (kind === 'photo') { setPhotoFile(file); setPhotoPreview(url) }
    else                  { setSigFile(file);   setSigPreview(url)   }
  }

  function clearFile(kind) {
    if (kind === 'photo') { setPhotoFile(null); setPhotoPreview(null); if (photoInputRef.current) photoInputRef.current.value = '' }
    else                  { setSigFile(null);   setSigPreview(null);   if (sigInputRef.current)   sigInputRef.current.value   = '' }
  }

  // ── Navigation ─────────────────────────────────────────────────────────────

  function goNext() {
    const errs = validateSection(section, form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSection(s => s + 1)
    window.scrollTo(0, 0)
  }

  function goBack() {
    setErrors({})
    setSection(s => s - 1)
    window.scrollTo(0, 0)
  }

  // ── Upload helpers ─────────────────────────────────────────────────────────

  async function uploadFile(bucket, file, userId) {
    const ext  = file.name.split('.').pop()
    const path = `${userId}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from(bucket).getPublicUrl(path)
    return data.publicUrl
  }

  // ── Submit ─────────────────────────────────────────────────────────────────

  async function handleSubmit() {
    setSubmitting(true)
    try {
      const userId = user.id
      let photoUrl = null
      let sigUrl   = null

      if (photoFile) photoUrl = await uploadFile('profile-photos', photoFile, userId)
      if (sigFile)   sigUrl   = await uploadFile('signatures',     sigFile,   userId)

      const payload = {
        user_id:           userId,
        full_name:         form.full_name.trim(),
        bar_number:        form.bar_number.trim(),
        firm_name:         form.firm_name.trim() || null,
        designation:       form.designation.trim() || null,
        years_experience:  form.years_experience ? parseInt(form.years_experience, 10) : null,
        phone:             form.phone.trim(),
        email:             form.email.trim(),
        address_line1:     form.address_line1.trim(),
        address_line2:     form.address_line2.trim() || null,
        city:              form.city.trim(),
        state:             form.state,
        pin_code:          form.pin_code.trim(),
        jurisdiction:      form.jurisdiction.trim() || null,
        languages:         form.languages,
        specialization:    form.specialization,
        profile_photo_url: photoUrl,
        signature_url:     sigUrl,
        profile_complete:  true,
      }

      const { error } = await supabase
        .from('lawyer_profiles')
        .upsert(payload, { onConflict: 'user_id' })

      if (error) throw error

      localStorage.removeItem(STORAGE_KEY)
      await refreshProfile()
      toast.success('Profile saved! Welcome to LegalEase.')
      navigate('/dashboard')
    } catch (err) {
      console.error(err)
      toast.error(err.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#f8f9fa] py-10 px-4 flex flex-col">

      {/* Header */}
      <div className="max-w-xl mx-auto mb-8 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-9 h-9 bg-[#1e3a5f] rounded-xl flex items-center justify-center">
            <Scale className="text-[#c9a84c] w-5 h-5" />
          </div>
          <span className="text-xl font-bold text-[#1e3a5f]">LegalEase</span>
        </div>
        <h1 className="text-2xl font-bold text-[#1e3a5f]">Set up your profile</h1>
        <p className="text-gray-400 text-sm mt-1">This information auto-fills your legal documents.</p>
      </div>

      {/* Progress bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="flex items-center gap-2 mb-3">
          {SECTION_TITLES.map((s, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full h-1.5 rounded-full transition-colors duration-300 ${
                  i < section ? 'bg-[#c9a84c]' : i === section ? 'bg-[#1e3a5f]' : 'bg-gray-200'
                }`}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between">
          {SECTION_TITLES.map((s, i) => (
            <span
              key={i}
              className={`text-xs font-medium hidden sm:block ${
                i === section ? 'text-[#1e3a5f]' : i < section ? 'text-[#c9a84c]' : 'text-gray-300'
              }`}
            >
              {s.label}
            </span>
          ))}
        </div>
        <p className="text-center text-xs text-gray-400 sm:hidden mt-1">
          Step {section + 1} of 4 — {SECTION_TITLES[section].label}
        </p>
      </div>

      {/* Card */}
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-[#1e3a5f]">{SECTION_TITLES[section].label}</h2>
          <p className="text-sm text-gray-400">{SECTION_TITLES[section].desc}</p>
        </div>

        {/* ── Section 0: Personal ── */}
        {section === 0 && (
          <div className="space-y-5">
            <Field label="Full Name" required error={errors.full_name}>
              <input
                type="text"
                placeholder="Adv. Priya Sharma"
                value={form.full_name}
                onChange={e => set('full_name', e.target.value)}
                className={input(errors.full_name)}
              />
            </Field>
            <Field label="Bar Council Registration Number" required error={errors.bar_number}>
              <input
                type="text"
                placeholder="MH/1234/2015"
                value={form.bar_number}
                onChange={e => set('bar_number', e.target.value)}
                className={input(errors.bar_number)}
              />
            </Field>
            <Field label="Law Firm / Practice Name" error={errors.firm_name}>
              <input
                type="text"
                placeholder="Sharma & Associates"
                value={form.firm_name}
                onChange={e => set('firm_name', e.target.value)}
                className={input()}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Designation" error={errors.designation}>
                <input
                  type="text"
                  placeholder="Senior Advocate"
                  value={form.designation}
                  onChange={e => set('designation', e.target.value)}
                  className={input()}
                />
              </Field>
              <Field label="Years of Experience" error={errors.years_experience}>
                <input
                  type="number"
                  min="0"
                  max="60"
                  placeholder="8"
                  value={form.years_experience}
                  onChange={e => set('years_experience', e.target.value)}
                  className={input()}
                />
              </Field>
            </div>
          </div>
        )}

        {/* ── Section 1: Contact ── */}
        {section === 1 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Phone Number" required error={errors.phone} hint="10-digit Indian mobile number">
                <input
                  type="tel"
                  placeholder="9876543210"
                  maxLength={10}
                  value={form.phone}
                  onChange={e => set('phone', e.target.value.replace(/\D/g, ''))}
                  className={input(errors.phone)}
                />
              </Field>
              <Field label="Email Address" hint="From your Google account">
                <input
                  type="email"
                  value={form.email}
                  readOnly
                  className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-lg bg-gray-50 text-gray-400 cursor-not-allowed"
                />
              </Field>
            </div>
            <Field label="Office Address Line 1" required error={errors.address_line1}>
              <input
                type="text"
                placeholder="Chamber No. 12, District Court Complex"
                value={form.address_line1}
                onChange={e => set('address_line1', e.target.value)}
                className={input(errors.address_line1)}
              />
            </Field>
            <Field label="Office Address Line 2">
              <input
                type="text"
                placeholder="Near Sessions Court"
                value={form.address_line2}
                onChange={e => set('address_line2', e.target.value)}
                className={input()}
              />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="City" required error={errors.city}>
                <input
                  type="text"
                  placeholder="Mumbai"
                  value={form.city}
                  onChange={e => set('city', e.target.value)}
                  className={input(errors.city)}
                />
              </Field>
              <Field label="PIN Code" required error={errors.pin_code}>
                <input
                  type="text"
                  placeholder="400001"
                  maxLength={6}
                  value={form.pin_code}
                  onChange={e => set('pin_code', e.target.value.replace(/\D/g, ''))}
                  className={input(errors.pin_code)}
                />
              </Field>
            </div>
            <Field label="State / Union Territory" required error={errors.state}>
              <select
                value={form.state}
                onChange={e => set('state', e.target.value)}
                className={select(errors.state)}
              >
                <option value="">Select state…</option>
                {INDIAN_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </Field>
            <Field label="Jurisdiction / High Court" hint="Optional — e.g. Bombay High Court">
              <input
                type="text"
                placeholder="Bombay High Court"
                value={form.jurisdiction}
                onChange={e => set('jurisdiction', e.target.value)}
                className={input()}
              />
            </Field>
          </div>
        )}

        {/* ── Section 2: Professional ── */}
        {section === 2 && (
          <div className="space-y-6">
            <Field label="Specialization" required error={errors.specialization}>
              <select
                value={form.specialization}
                onChange={e => set('specialization', e.target.value)}
                className={select(errors.specialization)}
              >
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
                    <button
                      key={lang}
                      type="button"
                      onClick={() => toggleLanguage(lang)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                        active
                          ? 'bg-[#1e3a5f] border-[#1e3a5f] text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-[#1e3a5f]'
                      }`}
                    >
                      {active && <CheckCircle className="inline w-3.5 h-3.5 mr-1 -mt-0.5" />}
                      {lang}
                    </button>
                  )
                })}
              </div>
              {errors.languages && <ErrMsg msg={errors.languages} />}
            </div>
          </div>
        )}

        {/* ── Section 3: Uploads ── */}
        {section === 3 && (
          <div className="space-y-8">
            <UploadField
              label="Profile Photo"
              hint="Clear, professional photo (JPG or PNG, max 2 MB)"
              preview={photoPreview}
              inputRef={photoInputRef}
              onSelect={e => handleFileSelect(e, 'photo')}
              onClear={() => clearFile('photo')}
              accept="image/jpeg,image/png,image/webp"
            />
            <UploadField
              label="Digital Signature"
              hint="Upload a clear image of your signature on white paper (JPG or PNG, max 2 MB)"
              preview={sigPreview}
              inputRef={sigInputRef}
              onSelect={e => handleFileSelect(e, 'sig')}
              onClear={() => clearFile('sig')}
              accept="image/jpeg,image/png"
            />
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
              <p className="font-semibold mb-1">Both uploads are optional</p>
              <p className="text-xs">You can skip and add them later from Settings. They'll appear on exported documents.</p>
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
          {section > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-[#1e3a5f] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {section < 3 ? (
            <button
              type="button"
              onClick={goNext}
              className="flex items-center gap-2 bg-[#c9a84c] hover:bg-[#a8882f] text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting}
              className="flex items-center gap-2 bg-[#1e3a5f] hover:bg-[#142840] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-6 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  Complete Setup
                </>
              )}
            </button>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-gray-400 mt-6">
        Your data is encrypted and never shared.
      </p>
      <Footer />
    </div>
  )
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function Field({ label, required, error, hint, children }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
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

function UploadField({ label, hint, preview, inputRef, onSelect, onClear, accept }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-[#1e3a5f] mb-1">{label}</label>
      <p className="text-xs text-gray-400 mb-3">{hint}</p>

      {preview ? (
        <div className="relative inline-block">
          <img
            src={preview}
            alt={label}
            className="h-32 w-auto max-w-full rounded-xl border-2 border-[#1e3a5f]/20 object-contain bg-gray-50 p-1"
          />
          <button
            type="button"
            onClick={onClear}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-sm"
            title="Remove"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="w-full border-2 border-dashed border-gray-200 hover:border-[#1e3a5f] rounded-xl py-8 flex flex-col items-center gap-2 text-gray-400 hover:text-[#1e3a5f] transition-colors bg-gray-50 hover:bg-blue-50/30 cursor-pointer"
        >
          <Upload className="w-6 h-6" />
          <span className="text-sm font-medium">Click to upload</span>
          <span className="text-xs">JPG, PNG up to 2 MB</span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={onSelect}
      />
    </div>
  )
}

// ─── Style helpers ───────────────────────────────────────────────────────────

function input(err) {
  return `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors
    focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]
    ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`
}

function select(err) {
  return `w-full px-3 py-2.5 text-sm border rounded-lg outline-none transition-colors appearance-none
    focus:ring-2 focus:ring-[#1e3a5f]/20 focus:border-[#1e3a5f]
    ${err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`
}
