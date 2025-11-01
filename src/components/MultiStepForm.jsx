import React, {useState, useEffect} from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const currentYear = new Date().getFullYear()
const years = Array.from({length: currentYear - 1949}, (_,i) => 1950 + i).reverse()

// XAMPP PHP Backend Configuration
const DB_API_CONFIG = {
  BASE_URL: 'http://localhost/cv-backend', // Your XAMPP backend URL
  CV_SUBMISSION: '/submit_cv.php',
  HEALTH_CHECK: '/health.php'
}

// Utility functions
function saveState(key, state) {
  try { 
    sessionStorage.setItem(key, JSON.stringify(state)) 
  } catch(e) {
    console.error('Error saving to sessionStorage:', e)
  }
}

function loadState(key, fallback) {
  try { 
    const v = sessionStorage.getItem(key); 
    return v ? JSON.parse(v) : fallback 
  } catch(e) { 
    return fallback 
  }
}

// NIC parsing for Sri Lanka
function parseNIC(nicRaw) {
  if(!nicRaw) return {ok: false, msg: 'NIC required'}
  const nic = String(nicRaw).trim().toUpperCase()
  let digits = nic.replace(/[^0-9]/g,'')
  const oldMatch = nic.match(/^(\d{9})([VX])$/i)
  if(oldMatch) digits = oldMatch[1]

  if(!(digits.length === 9 || digits.length === 12)) return {ok: false, msg: 'NIC format not recognized'}

  let year, daycode
  if(digits.length === 9){
    year = 1900 + Number(digits.slice(0,2))
    daycode = Number(digits.slice(2,5))
  } else {
    year = Number(digits.slice(0,4))
    daycode = Number(digits.slice(4,7))
  }

  let gender = 'Male'
  if(daycode > 500){ 
    gender = 'Female'; 
    daycode -= 500 
  }
  if(daycode < 1 || daycode > 366) return {ok: false, msg: 'NIC day-of-year invalid'}
  
  // Convert day of year to date (simplified)
  const date = new Date(year, 0, daycode)
  const dob = date.toISOString().split('T')[0]
  return {ok: true, dob, gender}
}

export default function MultiStepForm({templateId, onClose}){
  const [step, setStep] = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [backendStatus, setBackendStatus] = useState('checking')
  
  // Check backend connection on component mount
  useEffect(() => {
    checkBackendConnection()
  }, [])

  const [form, setForm] = useState(() => loadState('kl_cv_form', {
    personal: { 
      fullName: '', 
      email: '', 
      nic: '',
      dob: '',
      gender: '',
      whatsapp: '',
      phoneSameAsWA: true,
      phone: '',
      photo: null
    },
    olevels: [{ 
      index: '', 
      year: '', 
      core: {
        Mathematics: '', Science: '', English: '', 
        Sinhala: '', History: '', Religion: ''
      },
      categorySubjects: []
    }],
    alevel: { 
      completed: false, 
      index: '', 
      school: '', 
      year: '', 
      stream: '', 
      subjects: []
    },
    work: [],
    skills: [],
    qualifications: [],
    extras: [],
    references: [{ name: '', workplace: '', position: '', phone: '' }],
    profile: ''
  }))

  useEffect(() => {
    saveState('kl_cv_form', form)
  }, [form])

  // Check backend connection
  const checkBackendConnection = async () => {
    try {
      const response = await fetch(`${DB_API_CONFIG.BASE_URL}${DB_API_CONFIG.HEALTH_CHECK}`)
      const result = await response.json()
      if (result.success) {
        setBackendStatus('connected')
      } else {
        setBackendStatus('error')
      }
    } catch (error) {
      console.error('Backend connection failed:', error)
      setBackendStatus('error')
    }
  }

  // Auto-fill from NIC
  useEffect(() => {
    if(form.personal.nic && form.personal.nic.length >= 9) {
      const result = parseNIC(form.personal.nic)
      if(result.ok) {
        setForm(prev => ({
          ...prev,
          personal: {
            ...prev.personal,
            dob: result.dob,
            gender: result.gender
          }
        }))
      }
    }
  }, [form.personal.nic])

  function update(path, value) {
    const parts = path.split('.')
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      let cur = copy
      for(let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]]
      }
      cur[parts[parts.length - 1]] = value
      return copy
    })
  }

  function addArrayItem(path, newItem) {
    const parts = path.split('.')
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      let cur = copy
      for(let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]]
      }
      const arrayName = parts[parts.length - 1]
      cur[arrayName] = [...cur[arrayName], newItem]
      return copy
    })
  }

  function removeArrayItem(path, index) {
    const parts = path.split('.')
    setForm(prev => {
      const copy = JSON.parse(JSON.stringify(prev))
      let cur = copy
      for(let i = 0; i < parts.length - 1; i++) {
        cur = cur[parts[i]]
      }
      const arrayName = parts[parts.length - 1]
      cur[arrayName] = cur[arrayName].filter((_, i) => i !== index)
      return copy
    })
  }

  // Photo upload handler
  function handlePhotoUpload(e) {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('File size too large. Please select an image under 5MB.');
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        update('personal.photo', reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function validateStep(stepNum) {
    if(stepNum === 1) {
      const p = form.personal
      if(!p.fullName?.trim()) return 'Full Name is required'
      if(!p.email?.trim() || !/^[^@]+@[^@]+\.[^@]+$/.test(p.email)) return 'Valid email is required'
      if(!p.whatsapp?.trim()) return 'WhatsApp number is required'
    }
    return null
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const err = validateStep(step)
    if(err){ 
      alert(err) 
      return 
    }
    
    if(step < 10) {
      setStep(s => s + 1)
      return
    }

    // Check backend connection before submitting
    if (backendStatus === 'error') {
      alert('⚠️ Backend connection failed. Please make sure XAMPP is running with Apache and MySQL.')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch(`${DB_API_CONFIG.BASE_URL}${DB_API_CONFIG.CV_SUBMISSION}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          templateId: templateId
        })
      });

      const result = await response.json();
      
      if (result.success) {
        setSubmitting(false)
        sessionStorage.removeItem('kl_cv_form')
        alert('🎉 CV data saved successfully in database! Your information has been stored securely.')
        onClose && onClose()
      } else {
        throw new Error(result.message || 'Failed to save data')
      }
    } catch (error) {
      setSubmitting(false)
      alert('❌ Failed to save data: ' + error.message)
      console.error('Database submission error:', error)
    }
  }

  const steps = [
    { number: 1, title: 'Personal' },
    { number: 2, title: 'O/L' },
    { number: 3, title: 'A/L' },
    { number: 4, title: 'Work' },
    { number: 5, title: 'Skills' },
    { number: 6, title: 'Qualifications' },
    { number: 7, title: 'Extra' },
    { number: 8, title: 'Profile' },
    { number: 9, title: 'References' },
    { number: 10, title: 'Submit' }
  ]

  const coreSubjects = ['Mathematics', 'Science', 'English', 'Sinhala', 'History', 'Religion']
  const alStreams = ['Science', 'Commerce', 'Arts', 'Technology']
  const grades = ['', 'A', 'B', 'C', 'S', 'F', 'Absent']

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Backend Status Indicator */}
      <div className={`text-sm p-3 rounded-lg ${
        backendStatus === 'connected' ? 'bg-green-500/20 text-green-300' : 
        backendStatus === 'error' ? 'bg-red-500/20 text-red-300' : 
        'bg-blue-500/20 text-blue-300'
      }`}>
        {backendStatus === 'connected' && '✅ Database connection successful'}
        {backendStatus === 'error' && '❌ Database connection failed - Please check XAMPP'}
        {backendStatus === 'checking' && '🔍 Checking database connection...'}
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8 overflow-x-auto">
        {steps.map((s, index) => (
          <div key={s.number} className="flex items-center flex-shrink-0">
            <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                step >= s.number 
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg' 
                  : 'glass text-slate-400'
              }`}>
                {step > s.number ? '✓' : s.number}
              </div>
              <span className={`text-xs mt-2 text-center ${step >= s.number ? 'text-white' : 'text-slate-400'}`}>
                {s.title}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div className={`flex-1 h-1 mx-2 rounded min-w-8 ${
                step > s.number ? 'bg-gradient-to-r from-primary to-accent' : 'bg-slate-600'
              }`} />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Personal Information</h3>
              
              {/* Photo Upload */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex-shrink-0">
                  {form.personal.photo ? (
                    <img 
                      src={form.personal.photo} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full bg-slate-700 flex items-center justify-center border-2 border-dashed border-slate-500">
                      <span className="text-slate-400 text-sm">No Photo</span>
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Upload Profile Photo</label>
                  <input 
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-full p-2 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <p className="text-xs text-slate-400 mt-1">JPG, PNG or GIF (Max 5MB)</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input 
                    value={form.personal.fullName} 
                    onChange={e => update('personal.fullName', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email Address *</label>
                  <input 
                    type="email" 
                    value={form.personal.email} 
                    onChange={e => update('personal.email', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">NIC Number</label>
                  <input 
                    value={form.personal.nic} 
                    onChange={e => update('personal.nic', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="200755700479"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Date of Birth</label>
                  <input 
                    type="date"
                    value={form.personal.dob} 
                    onChange={e => update('personal.dob', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Gender</label>
                  <select 
                    value={form.personal.gender} 
                    onChange={e => update('personal.gender', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">WhatsApp Number *</label>
                  <input 
                    value={form.personal.whatsapp} 
                    onChange={e => update('personal.whatsapp', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="07XXXXXXXX"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Same as WhatsApp?</label>
                  <select 
                    value={form.personal.phoneSameAsWA ? 'true' : 'false'} 
                    onChange={e => update('personal.phoneSameAsWA', e.target.value === 'true')} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                  </select>
                </div>
              </div>

              {!form.personal.phoneSameAsWA && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                  <input 
                    value={form.personal.phone} 
                    onChange={e => update('personal.phone', e.target.value)} 
                    className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                    placeholder="07XXXXXXXX"
                    required
                  />
                </div>
              )}
            </section>
          )}

          {/* Step 2: O/L Results */}
          {step === 2 && (
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">O/L Examination Details (Optional)</h3>
                <span className="text-slate-400 text-sm">You can skip this section</span>
              </div>
              
              {form.olevels.map((attempt, attemptIndex) => (
                <div key={attemptIndex} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Attempt {attemptIndex + 1}</h4>
                    {attemptIndex > 0 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayItem('olevels', attemptIndex)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">O/L Index Number</label>
                      <input 
                        value={attempt.index} 
                        onChange={e => {
                          const newOlevels = [...form.olevels]
                          newOlevels[attemptIndex].index = e.target.value
                          update('olevels', newOlevels)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Year Completed</label>
                      <select 
                        value={attempt.year} 
                        onChange={e => {
                          const newOlevels = [...form.olevels]
                          newOlevels[attemptIndex].year = e.target.value
                          update('olevels', newOlevels)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h5 className="font-semibold text-white">Core Subjects</h5>
                    <div className="grid md:grid-cols-2 gap-4">
                      {coreSubjects.map(subject => (
                        <div key={subject} className="flex items-center justify-between">
                          <label className="text-slate-300 flex-1">{subject}</label>
                          <select 
                            value={attempt.core[subject] || ''} 
                            onChange={e => {
                              const newOlevels = [...form.olevels]
                              newOlevels[attemptIndex].core[subject] = e.target.value
                              update('olevels', newOlevels)
                            }} 
                            className="ml-2 p-2 rounded glass border border-white/10 focus:border-primary/50"
                          >
                            {grades.map(grade => (
                              <option key={grade} value={grade}>{grade || 'Select Grade'}</option>
                            ))}
                          </select>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category Subjects Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold text-white">Category Subjects</h5>
                      <button 
                        type="button"
                        onClick={() => {
                          const newOlevels = [...form.olevels]
                          newOlevels[attemptIndex].categorySubjects.push({ subject: '', grade: '' })
                          update('olevels', newOlevels)
                        }}
                        className="text-primary hover:text-accent text-sm flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Category Subject
                      </button>
                    </div>
                    
                    {attempt.categorySubjects.map((catSubject, catIndex) => (
                      <div key={catIndex} className="flex gap-3 items-center">
                        <input
                          value={catSubject.subject}
                          onChange={e => {
                            const newOlevels = [...form.olevels]
                            newOlevels[attemptIndex].categorySubjects[catIndex].subject = e.target.value
                            update('olevels', newOlevels)
                          }}
                          className="flex-1 p-2 rounded glass border border-white/10 focus:border-primary/50"
                          placeholder="Subject name (e.g., Accounting, ICT)"
                        />
                        <select
                          value={catSubject.grade}
                          onChange={e => {
                            const newOlevels = [...form.olevels]
                            newOlevels[attemptIndex].categorySubjects[catIndex].grade = e.target.value
                            update('olevels', newOlevels)
                          }}
                          className="w-24 p-2 rounded glass border border-white/10 focus:border-primary/50"
                        >
                          {grades.map(grade => (
                            <option key={grade} value={grade}>{grade || 'Grade'}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            const newOlevels = [...form.olevels]
                            newOlevels[attemptIndex].categorySubjects = newOlevels[attemptIndex].categorySubjects.filter((_, i) => i !== catIndex)
                            update('olevels', newOlevels)
                          }}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('olevels', { 
                  index: '', 
                  year: '', 
                  core: {
                    Mathematics: '', Science: '', English: '', 
                    Sinhala: '', History: '', Religion: ''
                  },
                  categorySubjects: []
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Another O/L Attempt
              </button>
            </section>
          )}

          {/* Step 3: A/L Results */}
          {step === 3 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">A-Level Examination Details (Optional)</h3>
                <span className="text-slate-400 text-sm">You can skip this section</span>
              </div>
              
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-300">Did you complete A-Levels?</label>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={form.alevel.completed === true} 
                      onChange={() => update('alevel.completed', true)} 
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-slate-300">Yes</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input 
                      type="radio" 
                      checked={form.alevel.completed === false} 
                      onChange={() => update('alevel.completed', false)} 
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-slate-300">No</span>
                  </label>
                </div>
              </div>

              {form.alevel.completed && (
                <div className="space-y-4 mt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">A/L Index Number</label>
                      <input 
                        value={form.alevel.index} 
                        onChange={e => update('alevel.index', e.target.value)} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Year Completed</label>
                      <select 
                        value={form.alevel.year} 
                        onChange={e => update('alevel.year', e.target.value)} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">School</label>
                      <input 
                        value={form.alevel.school} 
                        onChange={e => update('alevel.school', e.target.value)} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Stream/Category</label>
                      <select 
                        value={form.alevel.stream} 
                        onChange={e => update('alevel.stream', e.target.value)} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select Stream</option>
                        {alStreams.map(stream => (
                          <option key={stream} value={stream}>{stream}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* A/L Subjects Section */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h5 className="font-semibold text-white">A/L Subjects & Results</h5>
                      <button 
                        type="button"
                        onClick={() => {
                          update('alevel.subjects', [...form.alevel.subjects, { subject: '', grade: '' }])
                        }}
                        className="text-primary hover:text-accent text-sm flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Subject
                      </button>
                    </div>
                    
                    {form.alevel.subjects.map((alSubject, alIndex) => (
                      <div key={alIndex} className="flex gap-3 items-center">
                        <input
                          value={alSubject.subject}
                          onChange={e => {
                            const newSubjects = [...form.alevel.subjects]
                            newSubjects[alIndex].subject = e.target.value
                            update('alevel.subjects', newSubjects)
                          }}
                          className="flex-1 p-2 rounded glass border border-white/10 focus:border-primary/50"
                          placeholder="Subject name (e.g., Combined Maths, Physics)"
                        />
                        <select
                          value={alSubject.grade}
                          onChange={e => {
                            const newSubjects = [...form.alevel.subjects]
                            newSubjects[alIndex].grade = e.target.value
                            update('alevel.subjects', newSubjects)
                          }}
                          className="w-24 p-2 rounded glass border border-white/10 focus:border-primary/50"
                        >
                          {grades.map(grade => (
                            <option key={grade} value={grade}>{grade || 'Grade'}</option>
                          ))}
                        </select>
                        <button
                          type="button"
                          onClick={() => {
                            update('alevel.subjects', form.alevel.subjects.filter((_, i) => i !== alIndex))
                          }}
                          className="text-red-400 hover:text-red-300 p-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Step 4: Work Experience */}
          {step === 4 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Work Experience</h3>
              
              {form.work.map((job, index) => (
                <div key={index} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Job {index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeArrayItem('work', index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Job Title</label>
                      <input 
                        value={job.title} 
                        onChange={e => {
                          const newWork = [...form.work]
                          newWork[index].title = e.target.value
                          update('work', newWork)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g., Software Engineer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                      <input 
                        value={job.company} 
                        onChange={e => {
                          const newWork = [...form.work]
                          newWork[index].company = e.target.value
                          update('work', newWork)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">From Date</label>
                      <input 
                        type="date"
                        value={job.from} 
                        onChange={e => {
                          const newWork = [...form.work]
                          newWork[index].from = e.target.value
                          update('work', newWork)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">To Date</label>
                      <input 
                        type="date"
                        value={job.to} 
                        onChange={e => {
                          const newWork = [...form.work]
                          newWork[index].to = e.target.value
                          update('work', newWork)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea 
                      value={job.description} 
                      onChange={e => {
                        const newWork = [...form.work]
                        newWork[index].description = e.target.value
                        update('work', newWork)
                      }} 
                      className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      rows="3"
                      placeholder="Describe your responsibilities and achievements..."
                    />
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('work', { 
                  title: '', 
                  company: '', 
                  from: '', 
                  to: '', 
                  description: '' 
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Work Experience
              </button>
            </section>
          )}

          {/* Step 5: Skills */}
          {step === 5 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Skills</h3>
              
              {form.skills.map((skill, index) => (
                <div key={index} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Skill {index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeArrayItem('skills', index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Skill Name</label>
                      <input 
                        value={skill.name} 
                        onChange={e => {
                          const newSkills = [...form.skills]
                          newSkills[index].name = e.target.value
                          update('skills', newSkills)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g., JavaScript, Photoshop, Leadership"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Proficiency Level</label>
                      <select 
                        value={skill.level} 
                        onChange={e => {
                          const newSkills = [...form.skills]
                          newSkills[index].level = e.target.value
                          update('skills', newSkills)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select Level</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
                    <textarea 
                      value={skill.description} 
                      onChange={e => {
                        const newSkills = [...form.skills]
                        newSkills[index].description = e.target.value
                        update('skills', newSkills)
                      }} 
                      className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      rows="2"
                      placeholder="Brief description of your skill level or experience..."
                    />
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('skills', { 
                  name: '', 
                  level: '', 
                  description: '' 
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Skill
              </button>
            </section>
          )}

          {/* Step 6: Qualifications */}
          {step === 6 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Qualifications</h3>
              
              {form.qualifications.map((qualification, index) => (
                <div key={index} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Qualification {index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeArrayItem('qualifications', index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Qualification Name</label>
                      <input 
                        value={qualification.name} 
                        onChange={e => {
                          const newQualifications = [...form.qualifications]
                          newQualifications[index].name = e.target.value
                          update('qualifications', newQualifications)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g., BSc in Computer Science, PMP Certification"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Institution</label>
                      <input 
                        value={qualification.institution} 
                        onChange={e => {
                          const newQualifications = [...form.qualifications]
                          newQualifications[index].institution = e.target.value
                          update('qualifications', newQualifications)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="University or Organization"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Year Completed</label>
                      <select 
                        value={qualification.year} 
                        onChange={e => {
                          const newQualifications = [...form.qualifications]
                          newQualifications[index].year = e.target.value
                          update('qualifications', newQualifications)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      >
                        <option value="">Select Year</option>
                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Duration</label>
                      <input 
                        value={qualification.duration} 
                        onChange={e => {
                          const newQualifications = [...form.qualifications]
                          newQualifications[index].duration = e.target.value
                          update('qualifications', newQualifications)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g., 3 years, 6 months"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description (Optional)</label>
                    <textarea 
                      value={qualification.description} 
                      onChange={e => {
                        const newQualifications = [...form.qualifications]
                        newQualifications[index].description = e.target.value
                        update('qualifications', newQualifications)
                      }} 
                      className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      rows="2"
                      placeholder="Details about the qualification, achievements, or specializations..."
                    />
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('qualifications', { 
                  name: '', 
                  institution: '', 
                  year: '', 
                  duration: '', 
                  description: '' 
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Qualification
              </button>
            </section>
          )}

          {/* Step 7: Extra-curricular Activities */}
          {step === 7 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Extra-curricular Activities</h3>
              
              {form.extras.map((activity, index) => (
                <div key={index} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Activity {index + 1}</h4>
                    <button 
                      type="button" 
                      onClick={() => removeArrayItem('extras', index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Activity Name</label>
                      <input 
                        value={activity.name} 
                        onChange={e => {
                          const newExtras = [...form.extras]
                          newExtras[index].name = e.target.value
                          update('extras', newExtras)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="e.g., Football Team Captain, Drama Club President"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Role/Position</label>
                      <input 
                        value={activity.role} 
                        onChange={e => {
                          const newExtras = [...form.extras]
                          newExtras[index].role = e.target.value
                          update('extras', newExtras)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Your role in the activity"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">From Date</label>
                      <input 
                        type="date"
                        value={activity.from} 
                        onChange={e => {
                          const newExtras = [...form.extras]
                          newExtras[index].from = e.target.value
                          update('extras', newExtras)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">To Date</label>
                      <input 
                        type="date"
                        value={activity.to} 
                        onChange={e => {
                          const newExtras = [...form.extras]
                          newExtras[index].to = e.target.value
                          update('extras', newExtras)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                    <textarea 
                      value={activity.description} 
                      onChange={e => {
                        const newExtras = [...form.extras]
                        newExtras[index].description = e.target.value
                        update('extras', newExtras)
                      }} 
                      className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                      rows="3"
                      placeholder="Describe your involvement, achievements, and responsibilities..."
                    />
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('extras', { 
                  name: '', 
                  role: '', 
                  from: '', 
                  to: '', 
                  description: '' 
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Activity
              </button>
            </section>
          )}

          {/* Step 8: Personal Profile */}
          {step === 8 && (
            <section className="space-y-4">
              <h3 className="text-xl font-semibold text-white mb-4">Personal Profile / Summary</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Write a brief professional summary about yourself
                </label>
                <textarea 
                  value={form.profile} 
                  onChange={e => update('profile', e.target.value)} 
                  className="w-full p-4 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                  rows="6"
                  placeholder="Describe your professional background, career objectives, key strengths, and what makes you unique. This will be featured prominently in your CV."
                />
                <p className="text-xs text-slate-400 mt-2">
                  Recommended: 150-300 words. Focus on your key achievements and career goals.
                </p>
              </div>
            </section>
          )}

          {/* Step 9: References */}
          {step === 9 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">References</h3>
              
              {form.references.map((reference, index) => (
                <div key={index} className="glass rounded-lg p-4 space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-white">Reference {index + 1}</h4>
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => removeArrayItem('references', index)}
                        className="text-red-400 hover:text-red-300 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Name</label>
                      <input 
                        value={reference.name} 
                        onChange={e => {
                          const newReferences = [...form.references]
                          newReferences[index].name = e.target.value
                          update('references', newReferences)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Position</label>
                      <input 
                        value={reference.position} 
                        onChange={e => {
                          const newReferences = [...form.references]
                          newReferences[index].position = e.target.value
                          update('references', newReferences)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Job title/position"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Workplace</label>
                      <input 
                        value={reference.workplace} 
                        onChange={e => {
                          const newReferences = [...form.references]
                          newReferences[index].workplace = e.target.value
                          update('references', newReferences)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Company/Organization"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                      <input 
                        value={reference.phone} 
                        onChange={e => {
                          const newReferences = [...form.references]
                          newReferences[index].phone = e.target.value
                          update('references', newReferences)
                        }} 
                        className="w-full p-3 rounded-lg glass border border-white/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all"
                        placeholder="Phone number"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button 
                type="button" 
                onClick={() => addArrayItem('references', { 
                  name: '', 
                  workplace: '', 
                  position: '', 
                  phone: '' 
                })} 
                className="text-primary hover:text-accent transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Another Reference
              </button>
            </section>
          )}

          {/* Step 10: Review and Submit */}
          {step === 10 && (
            <section className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Review Your Information</h3>
              
              <div className="glass rounded-lg p-6 space-y-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Personal Information</h4>
                  <div className="grid md:grid-cols-2 gap-4 text-slate-300">
                    <div><strong>Name:</strong> {form.personal.fullName}</div>
                    <div><strong>Email:</strong> {form.personal.email}</div>
                    <div><strong>NIC:</strong> {form.personal.nic || 'Not provided'}</div>
                    <div><strong>Date of Birth:</strong> {form.personal.dob || 'Not provided'}</div>
                    <div><strong>Gender:</strong> {form.personal.gender || 'Not provided'}</div>
                    <div><strong>WhatsApp:</strong> {form.personal.whatsapp}</div>
                    <div><strong>Phone:</strong> {form.personal.phoneSameAsWA ? 'Same as WhatsApp' : form.personal.phone}</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Education Summary</h4>
                  <div className="text-slate-300">
                    <p><strong>O/L Attempts:</strong> {form.olevels.length}</p>
                    <p><strong>A/L Completed:</strong> {form.alevel.completed ? 'Yes' : 'No'}</p>
                    <p><strong>Additional Qualifications:</strong> {form.qualifications.length}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Experience & Skills</h4>
                  <div className="text-slate-300">
                    <p><strong>Work Experiences:</strong> {form.work.length}</p>
                    <p><strong>Skills:</strong> {form.skills.length}</p>
                    <p><strong>Extra-curricular Activities:</strong> {form.extras.length}</p>
                    <p><strong>References:</strong> {form.references.length}</p>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-4">
                  <p className="text-slate-300 text-sm">
                    <strong>Note:</strong> Your data will be stored securely in our MySQL database and used to create your professional CV. 
                    You can request updates or deletion of your data at any time by contacting us.
                  </p>
                </div>
              </div>
            </section>
          )}

        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-white/10">
        <div>
          {step > 1 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button" 
              onClick={() => setStep(s => s - 1)} 
              className="px-6 py-3 rounded-lg glass border border-white/10 text-slate-300 hover:text-white hover:bg-white/5 transition-all"
            >
              ← Previous
            </motion.button>
          )}
        </div>
        
        <div className="flex gap-3">
          {step < 10 ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button" 
              onClick={() => {
                const err = validateStep(step)
                if(err) return alert(err)
                setStep(s => s + 1)
              }} 
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-accent text-white font-semibold hover:shadow-lg transition-all"
            >
              Continue →
            </motion.button>
          ) : (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit" 
              disabled={submitting || backendStatus === 'error'} 
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                  </svg>
                  Saving to Database...
                </span>
              ) : backendStatus === 'error' ? (
                '❌ Database Offline'
              ) : (
                'Save to Database 🚀'
              )}
            </motion.button>
          )}
        </div>
      </div>
    </motion.form>
  )
}