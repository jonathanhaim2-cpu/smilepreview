import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import Papa from 'papaparse'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell, CartesianGrid
} from 'recharts'
import KPIPage from './KPIPage'
import './App.css'

// ── צבעים ─────────────────────────────────────────────────────────────────
const KNOWN_COLORS = {
  'תוכנית טיפול':                    '#3b82f6',
  'תוכנית יישור שי':                 '#06b6d4',
  'סיים טיפול':                      '#10b981',
  'הצעת מחיר':                       '#f59e0b',
  'בדיקה':                           '#8b5cf6',
  'לא פעיל':                         '#4b5563',
  'לאחר יעוץ לא עבודה':             '#ef4444',
  'לאחר ייעוץ לא שילם':             '#ef4444',
  'הפסיק / השהה':                    '#f97316',
  'הפסיק / השהה טיפול':             '#f97316',
  'בטיפול':                          '#22c55e',
  'ריפיימנטס':                       '#a78bfa',
  'צילומים וסריקה לריפיימנטס':      '#38bdf8',
  'ממתין לתוכנית טיפול':            '#fb923c',
  'ממתין לתחילת טיפול':             '#fbbf24',
  'ביטל טיפול':                      '#6b7280',
  'לא ניתן לבצע טיפול':             '#6b7280',
  'מכחיש תשלום':                     '#dc2626',
  'פעיל':                             '#4b5563',
}
const EXTRA = ['#ec4899','#14b8a6','#84cc16','#f43f5e','#0ea5e9','#a855f7','#fb923c']
const getColor = (s, i) => KNOWN_COLORS[s] ?? EXTRA[i % EXTRA.length]

// ── סטטוסים "מתים" — יוסתרו מהגרף ברירת מחדל ─────────────────────────────
const DEFAULT_HIDDEN_BAR = [
  'סיים טיפול', 'לאחר ייעוץ לא שילם', 'לאחר יעוץ לא עבודה',
  'ביטל טיפול', 'הפסיק / השהה טיפול', 'הפסיק / השהה',
  'לא פעיל', 'לא ניתן לבצע טיפול', 'פעיל', 'מכחיש תשלום',
]

// ── סטטוסים לחישוב KPIs ───────────────────────────────────────────────────
const WAITING_STATUSES = new Set(['ממתין לתוכנית טיפול', 'ממתין לתחילת טיפול'])

// ── localStorage ───────────────────────────────────────────────────────────
const load = (k, fb) => { try { return JSON.parse(localStorage.getItem(k)) ?? fb } catch { return fb } }
const save = (k, v)  => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

// ── PIN ─────────────────────────────────────────────────────────────────────
const KPI_VIEW_PIN = '123123'
const KPI_EDIT_PIN = '207042433'

function PinDialog({ onSuccess, onCancel }) {
  const [pin, setPin]     = useState('')
  const [error, setError] = useState(false)

  const attempt = () => {
    if (pin === KPI_EDIT_PIN) { onSuccess('edit') }
    else if (pin === KPI_VIEW_PIN) { onSuccess('view') }
    else { setError(true); setPin('') }
  }

  return (
    <div className="pin-overlay" onClick={e => e.target === e.currentTarget && onCancel()}>
      <div className="pin-dialog">
        <div className="pin-icon">🔒</div>
        <div className="pin-title">KPI חודשי</div>
        <div className="pin-sub">הזן קוד גישה להמשך</div>
        <input
          className={`pin-input ${error ? 'error' : ''}`}
          type="password" inputMode="numeric" maxLength={12}
          value={pin} autoFocus
          onChange={e => { setError(false); setPin(e.target.value) }}
          onKeyDown={e => e.key === 'Enter' && attempt()}
          onAnimationEnd={() => setError(false)}
        />
        {error && <div className="pin-error">קוד שגוי, נסה שוב</div>}
        <div className="pin-btns">
          <button className="pin-cancel" onClick={onCancel}>ביטול</button>
          <button className="pin-submit" onClick={attempt}>כניסה ←</button>
        </div>
      </div>
    </div>
  )
}

// ── mock ───────────────────────────────────────────────────────────────────
const MOCK_ROWS = [
  ...Array(30).fill({ branch:'נתניה',   doctor:"ד\"ר קן",    status:'בטיפול',                          appt:true  }),
  ...Array(15).fill({ branch:'נתניה',   doctor:"ד\"ר קן",    status:'ריפיימנטס',                        appt:true  }),
  ...Array(10).fill({ branch:'נתניה',   doctor:"ד\"ר קן",    status:'ממתין לתחילת טיפול',              appt:false }),
  ...Array(20).fill({ branch:'תל אביב', doctor:"ד\"ר ליסה",  status:'בטיפול',                          appt:true  }),
  ...Array(8).fill({  branch:'תל אביב', doctor:"ד\"ר ליסה",  status:'ממתין לתוכנית טיפול',             appt:false }),
  ...Array(12).fill({ branch:'ירושלים', doctor:"ד\"ר אליס",  status:'צילומים וסריקה לריפיימנטס',       appt:true  }),
  ...Array(25).fill({ branch:'נתניה',   doctor:"ד\"ר קן",    status:'סיים טיפול',                      appt:false }),
  ...Array(18).fill({ branch:'תל אביב', doctor:"ד\"ר ליסה",  status:'סיים טיפול',                      appt:false }),
]
const MOCK_STATUSES = ['בטיפול','ריפיימנטס','צילומים וסריקה לריפיימנטס','ממתין לתחילת טיפול','ממתין לתוכנית טיפול','סיים טיפול']

// ── נרמול שמות (מסיר גרש/ניקוד) ──────────────────────────────────────────
function normName(s) {
  return s.replace(/[''`׳]/g, '').replace(/\s+/g, ' ').trim()
}

// ── נרמול שם סניף ─────────────────────────────────────────────────────────
const BRANCH_ALIASES = {
  'רמת החייל': 'תל אביב',
  'רמל החייל': 'תל אביב',
  'קיסריה':    'נתניה',
}
const KNOWN_CITIES = new Set(['תל אביב', 'נתניה', 'ירושלים', 'חיפה', 'באר שבע'])

function canonicalizeBranch(raw) {
  if (!raw) return ''
  // מנקה "NeoSmile / WeSmile - " מכל חלק, מפצל לפי /
  const parts = raw.split('/').map(p => p.replace(/(?:NeoSmile|WeSmile)\s*[-–]?\s*/gi, '').trim())
  // מחפש חלק שמכיל עיר מוכרת או alias
  for (const p of parts) {
    if (BRANCH_ALIASES[p]) return BRANCH_ALIASES[p]
    if (KNOWN_CITIES.has(p))  return p
  }
  // fallback: חלק ראשון לא ריק אחרי ניקוי
  const first = parts.find(p => p) || ''
  return BRANCH_ALIASES[first] || first
}

function normBranch(s) {
  return (s || '').trim().replace(/\s+/g, ' ')
}

// ── שליפת שם רופא ─────────────────────────────────────────────────────────
function extractDoctor(raw) {
  if (!raw) return ''
  const parts = raw.split(/[\/,+\n]/)
  const doc = parts.find(p => /ד["״']ר/.test(p))
  return normName((doc || '').trim())
}

// ── עיבוד CSV ─────────────────────────────────────────────────────────────
function processCSV(rows) {
  const parsed = []
  const statusOrder = []
  const seen = new Set()

  rows.forEach(row => {
    const branch = canonicalizeBranch(row['סניף/מחלקה'] || row['סניף'] || '')
    const doctor = normName((row['שירותי בריאות'] || '').trim())
    const status = (row['סטטוס'] || '').trim()
    const appt   = !!(row['פגישה הבאה'] || '').trim()

    if (!doctor || !status) return

    parsed.push({ branch, doctor, status, appt })
    if (!seen.has(status)) { seen.add(status); statusOrder.push(status) }
  })

  const branches = [...new Set(parsed.map(r => r.branch))].filter(Boolean).sort()
  const doctors  = [...new Set(parsed.map(r => r.doctor))].sort()
  const b2d = {}
  parsed.forEach(r => {
    if (!r.branch) return
    if (!b2d[r.branch]) b2d[r.branch] = new Set()
    b2d[r.branch].add(r.doctor)
  })

  return {
    parsed, branches, doctors, statuses: statusOrder,
    branchToDoctors: Object.fromEntries(Object.entries(b2d).map(([k, v]) => [k, [...v]])),
  }
}

// ── אגרגציה לגרף ──────────────────────────────────────────────────────────
function aggregate(rows) {
  const map = {}
  rows.forEach(({ doctor, status, appt }) => {
    if (!map[doctor]) map[doctor] = { name: doctor, appointments: 0 }
    map[doctor][status] = (map[doctor][status] || 0) + 1
    if (appt) map[doctor].appointments++
  })
  return Object.values(map).sort((a, b) => {
    const tot = o => Object.entries(o).filter(([k]) => k !== 'name' && k !== 'appointments').reduce((s, [, v]) => s + v, 0)
    return tot(b) - tot(a)
  })
}

// ── hook: נתונים ראשיים ───────────────────────────────────────────────────
function useData() {
  const [data, setData]   = useState(null)
  const [isMock, setIsMock] = useState(false)

  const setMock = () => {
    setData({ parsed:MOCK_ROWS, branches:['נתניה','תל אביב','ירושלים'],
      doctors:["ד\"ר קן","ד\"ר ליסה","ד\"ר אליס"],
      branchToDoctors:{נתניה:["ד\"ר קן"],'תל אביב':["ד\"ר ליסה"],ירושלים:["ד\"ר אליס"]},
      statuses:MOCK_STATUSES })
    setIsMock(true)
  }

  useEffect(() => {
    fetch('/api/data')
      .then(r => { if (!r.ok) throw new Error(); return r.text() })
      .then(text => {
        const { data: rows } = Papa.parse(text, { header: true, skipEmptyLines: true })
        const r = processCSV(rows)
        if (r.parsed.length) { setData(r); setIsMock(false) }
        else setMock()
      })
      .catch(setMock)
  }, [])

  return { data, isMock }
}

// ── hook: סיימו טיפול החודש (גיליון דשבורד — שורה לחודש, עמודה לסניף) ───
const MONTHLY_SKIP_COLS = new Set(['חודש', 'סה"כ', '% מהיעד', ''])

function useMonthlyCompleted() {
  const [byBranch, setByBranch] = useState({})   // { "תל אביב": 8, ... }
  const [updatedAt, setUpdatedAt] = useState(null)

  const REFRESH_MS = (parseInt(import.meta.env.VITE_REFRESH_MINUTES || '5')) * 60_000

  const doFetch = useCallback(() => {
    fetch('/api/monthly')
      .then(r => r.text())
      .then(text => {
        const { data } = Papa.parse(text, { header: false, skipEmptyLines: true })

        // מחפשים שורת כותרות — זו שמכילה 'חודש'
        let headerIdx = -1, headers = []
        for (let i = 0; i < data.length; i++) {
          if (data[i].some(c => String(c).trim() === 'חודש')) {
            headerIdx = i
            headers = data[i].map(h => String(h).trim())
            break
          }
        }
        if (headerIdx < 0) { setUpdatedAt(new Date()); return }

        const monthCol = headers.indexOf('חודש')
        const now = new Date()
        const monthStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`

        const row = data.slice(headerIdx + 1).find(r => String(r[monthCol] || '').trim() === monthStr)
        if (!row) { setByBranch({}); setUpdatedAt(new Date()); return }

        const result = {}
        headers.forEach((h, idx) => {
          if (!MONTHLY_SKIP_COLS.has(h) && h) result[h] = parseInt(row[idx]) || 0
        })
        setByBranch(result)
        setUpdatedAt(new Date())
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    doFetch()
    const id = setInterval(doFetch, REFRESH_MS)
    return () => clearInterval(id)
  }, [doFetch, REFRESH_MS])

  return { byBranch, updatedAt }
}

// ── Dropdown ───────────────────────────────────────────────────────────────
function MultiDropdown({ label, options, selected, onChange, disabled }) {
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const allSel   = selected.length === 0
  const btnLabel = disabled          ? label :
                   allSel            ? `כל ה${label}` :
                   selected.length === 1 ? selected[0] :
                   `${selected.length} נבחרו`

  const toggle = name =>
    onChange(selected.includes(name) ? selected.filter(s => s !== name) : [...selected, name])

  return (
    <div className={`dd-wrap ${disabled ? 'dd-disabled' : ''}`} ref={ref} dir="rtl">
      <button className={`dd-trigger ${open ? 'open' : ''}`}
        onClick={() => !disabled && setOpen(o => !o)} disabled={disabled}>
        <span className="dd-label">{btnLabel}</span>
        <span className={`dd-arrow ${open ? 'open' : ''}`}>▾</span>
      </button>
      {open && !disabled && (
        <div className="dd-menu">
          <div className="dd-item" onClick={() => { onChange([]); setOpen(false) }}>
            <span className={`dd-check ${allSel ? 'on' : ''}`} />
            <span>כל ה{label}</span>
          </div>
          <div className="dd-divider" />
          {options.map(opt => (
            <div key={opt} className="dd-item" onClick={() => toggle(opt)}>
              <span className={`dd-check ${selected.includes(opt) ? 'on' : ''}`} />
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ── KPI Card ───────────────────────────────────────────────────────────────
function KPICard({ label, value, color, icon, sub }) {
  return (
    <div className="kpi-card" style={{ '--accent': color }}>
      <span className="kpi-icon">{icon}</span>
      <div className="kpi-value" style={{ color }}>{value != null ? value.toLocaleString('he-IL') : '—'}</div>
      <div className="kpi-label">{label}</div>
      {sub && <div className="kpi-sub">{sub}</div>}
    </div>
  )
}

// ── Tooltip ────────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const rows = payload.filter(p => p.value > 0)
  return (
    <div className="tooltip">
      <p className="tooltip-label">{label}</p>
      {rows.map(p => (
        <div key={p.name} className="tooltip-row">
          <span className="tooltip-dot" style={{ background: p.fill }} />
          <span className="tooltip-name">{p.name}</span>
          <span className="tooltip-val">{p.value}</span>
        </div>
      ))}
      <div className="tooltip-total">סה"כ: {rows.reduce((s, p) => s + p.value, 0)}</div>
    </div>
  )
}

// ── App ────────────────────────────────────────────────────────────────────
export default function App() {
  const { data, isMock }              = useData()
  const { byBranch: monthlyByBranchRaw,
          updatedAt: monthlyAt }      = useMonthlyCompleted()

  const [theme,           setTheme]           = useState(() => localStorage.getItem('neo_theme') || 'dark')
  const [kpiAccess,      setKpiAccess]       = useState(null)   // null | 'view' | 'edit'
  const [showPin,        setShowPin]         = useState(false)
  const [activePage,     setActivePage]      = useState('patients')
  const [selBranches,     setSelBranches]     = useState(() => load('neo_branches', []))
  const [selDoctors,      setSelDoctors]      = useState(() => load('neo_doctors',  []))
  const [exDonut,         setExDonut]         = useState(() => load('neo_donut_ex', ['סיים טיפול']))
  const [hiddenBarStats,  setHiddenBarStats]  = useState(() => load('neo_hidden_bar', DEFAULT_HIDDEN_BAR))

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('neo_theme', theme)
  }, [theme])

  useEffect(() => { save('neo_branches',    selBranches)    }, [selBranches])
  useEffect(() => { save('neo_doctors',     selDoctors)     }, [selDoctors])
  useEffect(() => { save('neo_donut_ex',    exDonut)        }, [exDonut])
  useEffect(() => { save('neo_hidden_bar',  hiddenBarStats) }, [hiddenBarStats])

  const handleBranchChange = newBranches => {
    setSelBranches(newBranches)
    if (newBranches.length > 0 && data) {
      const allowed = new Set(newBranches.flatMap(b => data.branchToDoctors[b] || []))
      setSelDoctors(prev => prev.filter(d => allowed.has(d)))
    }
  }

  const colorMap = useMemo(() =>
    Object.fromEntries((data?.statuses || []).map((s, i) => [s, getColor(s, i)])),
    [data]
  )

  const filteredRows = useMemo(() => {
    if (!data) return []
    return data.parsed.filter(r => {
      const bOk = selBranches.length === 0 || selBranches.includes(r.branch)
      const dOk = selDoctors.length  === 0 || selDoctors.includes(r.doctor)
      return bOk && dOk
    })
  }, [data, selBranches, selDoctors])

  const chartData = useMemo(() => aggregate(filteredRows), [filteredRows])

  const statusTotals = useMemo(() =>
    (data?.statuses || []).map((s, i) => ({
      name: s, color: colorMap[s],
      value: filteredRows.filter(r => r.status === s).length,
    })).filter(s => s.value > 0),
    [filteredRows, data, colorMap]
  )

  const donutData  = statusTotals.filter(s => !exDonut.includes(s.name))
  const donutTotal = donutData.reduce((s, x) => s + x.value, 0)

  // סטטוסים גלויים בגרף
  const visibleBarStatuses = (data?.statuses || []).filter(s => !hiddenBarStats.includes(s))

  // KPIs
  const totalActive  = filteredRows.filter(r => !hiddenBarStats.includes(r.status)).length
  const totalWaiting = filteredRows.filter(r => WAITING_STATUSES.has(r.status)).length
  const appointments = filteredRows.filter(r => r.appt).length

  // סיימו החודש — מסוננים לפי סניפים שנבחרו
  const monthlyByBranch = Object.entries(monthlyByBranchRaw)
    .filter(([b]) => selBranches.length === 0 || selBranches.some(s => normBranch(s) === normBranch(b)))
    .sort((a, b) => b[1] - a[1])

  const monthlyCount = monthlyByBranch.reduce((s, [, v]) => s + v, 0)

  const toggleDonut     = name => setExDonut(p => p.includes(name) ? p.filter(s=>s!==name) : [...p,name])
  const toggleBarStatus = name => setHiddenBarStats(p => p.includes(name) ? p.filter(s=>s!==name) : [...p,name])

  const availableDoctors = useMemo(() => {
    if (!data) return []
    if (selBranches.length === 0) return data.doctors
    return [...new Set(selBranches.flatMap(b => data.branchToDoctors[b] || []))].sort()
  }, [data, selBranches])

  const hasFilter = selBranches.length > 0 || selDoctors.length > 0
  const today = new Date().toLocaleDateString('he-IL', { day:'numeric', month:'long', year:'numeric' })

  // קיבועים חיים לפי סניף — יועברו לדף KPI
  const liveBookings = useMemo(() => {
    if (!data) return {}
    const map = {}
    data.parsed.forEach(r => {
      if (r.appt && r.branch) map[r.branch] = (map[r.branch] || 0) + 1
    })
    return map
  }, [data])

  // הודעת עדכון אחרון לנתוני החודש
  const monthlySubLabel = monthlyAt
    ? `עודכן ${monthlyAt.toLocaleTimeString('he-IL', { hour:'2-digit', minute:'2-digit' })}`
    : null

  if (!data) return (
    <div className="app loading" dir="rtl">
      <div className="spinner" /><p>טוען נתונים...</p>
    </div>
  )

  return (
    <div className="app" dir="rtl">

      {/* Header */}
      <header className="header">
        <div className="header-brand">
          <span className="logo-icon">🦷</span>
          <div>
            <div className="brand-title">NeoSmile</div>
            <span className="brand-sub">{activePage === 'patients' ? 'דוח מטופלים' : 'KPI חודשי'}</span>
          </div>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <div className="theme-switcher" title="שנה עיצוב">
            {[['dark','🌙'],['light','☀️'],['cream','🌤']].map(([t, icon]) => (
              <button key={t} className={`theme-btn ${t} ${theme === t ? 'active' : ''}`}
                onClick={() => setTheme(t)} title={t === 'dark' ? 'כהה' : t === 'light' ? 'בהיר' : 'שמנת'}
              />
            ))}
          </div>
          {isMock && <span className="mock-badge">נתוני דוגמה</span>}
          <div className="live-badge"><span className="live-dot" />עודכן {today}</div>
        </div>
      </header>

      {/* ניווט */}
      <nav className="page-nav">
        <button className={`nav-tab ${activePage === 'patients' ? 'active' : ''}`}
          onClick={() => setActivePage('patients')}>דוח מטופלים</button>
        <button className={`nav-tab ${activePage === 'kpi' ? 'active' : ''}`}
          onClick={() => {
            if (kpiAccess) setActivePage('kpi')
            else setShowPin(true)
          }}>📊 KPI חודשי {!kpiAccess && '🔒'}</button>
      </nav>

      {showPin && (
        <PinDialog
          onSuccess={level => { setKpiAccess(level); setShowPin(false); setActivePage('kpi') }}
          onCancel={() => setShowPin(false)}
        />
      )}

      {activePage === 'kpi' && <KPIPage liveBookings={liveBookings} canEdit={kpiAccess === 'edit'} />}

      {activePage === 'patients' && <>
      {/* Filters */}
      <div className="filter-row">
        <div className="filter-group">
          <span className="filter-label">סניף</span>
          <MultiDropdown label="סניפים" options={data.branches}
            selected={selBranches} onChange={handleBranchChange} />
        </div>
        <div className="filter-group">
          <span className="filter-label">רופא</span>
          <MultiDropdown label="רופאים" options={availableDoctors}
            selected={selDoctors} onChange={setSelDoctors}
            disabled={availableDoctors.length === 0} />
        </div>
        {hasFilter && (
          <button className="clear-btn" onClick={() => { setSelBranches([]); setSelDoctors([]) }}>
            נקה סינון ✕
          </button>
        )}
      </div>

      {/* KPIs */}
      <div className="kpi-row">
        <KPICard label="מטופלים פעילים"         value={totalActive}   color="#00d4ff" icon="⚡" />
        <KPICard label="פגישות מתואמות קדימה"  value={appointments}  color="#a78bfa" icon="📅" />
        <KPICard label="ממתינים לטיפול"         value={totalWaiting}  color="#fb923c" icon="⏳" />
        <KPICard
          label="סיימו טיפול החודש"
          value={monthlyCount}
          color="#10b981"
          icon="✓"
          sub={monthlySubLabel}
        />
      </div>

      {/* Charts */}
      <div className="charts-row">

        {/* Bar chart */}
        <div className="card">
          <h2 className="card-heading">מטופלים לפי רופא וסטטוס</h2>
          <div dir="ltr">
            <ResponsiveContainer width="100%" height={Math.max(200, chartData.length * 64 + 40)}>
              <BarChart data={chartData} layout="vertical" margin={{ top:0, right:16, left:0, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
                <XAxis type="number" tick={{ fill:'#374151', fontSize:11 }} axisLine={false} tickLine={false} />
                <YAxis dataKey="name" type="category" tick={{ fill:'#9ca3af', fontSize:13, fontWeight:600 }} width={130} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill:'rgba(255,255,255,0.025)' }} />
                {visibleBarStatuses.map((s, i) => (
                  <Bar key={s} dataKey={s} stackId="s" fill={colorMap[s]}
                    radius={i === visibleBarStatuses.length-1 ? [0,4,4,0] : [0,0,0,0]} />
                ))}
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Chips — ניתן ללחוץ להסתיר/להציג בגרף */}
          <div className="status-chips">
            {(data?.statuses || []).map(s => {
              const visible = !hiddenBarStats.includes(s)
              return (
                <div key={s} className={`chip ${visible ? '' : 'chip-off'}`}
                  onClick={() => toggleBarStatus(s)}
                  title={visible ? 'לחץ להסתיר' : 'לחץ להציג'}>
                  <span className="chip-dot" style={{ background: visible ? colorMap[s] : '#4b5563' }} />
                  {s}
                  {!visible && <span className="chip-x">✕</span>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Donut */}
        <div className="card">
          <h2 className="card-heading">פילוח לפי סטטוס</h2>
          <div className="donut-wrap" dir="ltr">
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                <Pie data={donutData} cx="50%" cy="50%" innerRadius={68} outerRadius={100}
                  paddingAngle={2} dataKey="value" startAngle={90} endAngle={-270}>
                  {donutData.map(e => <Cell key={e.name} fill={e.color} stroke="transparent" />)}
                </Pie>
                <Tooltip formatter={(val, name) => [`${val} מטופלים`, name]}
                  contentStyle={{ background:'rgba(5,5,20,0.97)', border:'1px solid rgba(255,255,255,0.1)', borderRadius:10, fontSize:12, direction:'rtl' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <span className="donut-total">{donutTotal}</span>
              <span className="donut-label">מטופלים</span>
            </div>
          </div>

          <div className="status-list">
            {statusTotals.map(s => {
              const pct     = (filteredRows.length > 0) ? Math.round((s.value / filteredRows.length) * 100) : 0
              const inDonut = !exDonut.includes(s.name)
              return (
                <div key={s.name} className="status-row">
                  <span className="status-dot" style={{ background: s.color }} />
                  <span className="status-name">{s.name}</span>
                  <span className="status-bar-wrap">
                    <span className="status-bar" style={{ width:`${pct}%`, background:s.color }} />
                  </span>
                  <span className="status-pct">{pct}%</span>
                  <span className="status-count">{s.value}</span>
                  <button className={`eye-btn ${inDonut ? 'on' : 'off'}`}
                    onClick={() => toggleDonut(s.name)}
                    title={inDonut ? 'הסר מהעוגה' : 'הוסף לעוגה'}>
                    {inDonut ? '👁' : '✕'}
                  </button>
                </div>
              )
            })}
          </div>
          <p className="donut-hint">👁 / ✕ להוספה/הסרה מהעוגה</p>
        </div>

      </div>

      {/* סיימו החודש — פירוט לפי סניף */}
      {Object.keys(monthlyByBranchRaw).length > 0 && (
        <div className="card monthly-card" style={{ marginTop: 14 }}>
          <h2 className="card-heading">
            סיימו טיפול החודש — פירוט לפי סניף
            {monthlyAt && (
              <span className="monthly-updated">
                עודכן {monthlyAt.toLocaleTimeString('he-IL', { hour:'2-digit', minute:'2-digit' })}
              </span>
            )}
          </h2>

          <div className="monthly-grid">
            {monthlyByBranch.map(([branch, count]) => {
              const pct = monthlyCount > 0 ? Math.round((count / monthlyCount) * 100) : 0
              return (
                <div key={branch} className="monthly-row">
                  <span className="monthly-branch">{branch}</span>
                  <span className="monthly-bar-wrap">
                    <span className="monthly-bar" style={{ width:`${pct}%` }} />
                  </span>
                  <span className="monthly-count">{count}</span>
                  <span className="monthly-pct">{pct}%</span>
                </div>
              )
            })}

            {monthlyByBranch.length === 0 && (
              <p style={{ color:'var(--muted)', fontSize:13, textAlign:'center', padding:'12px 0' }}>
                אין נתונים לחודש הנוכחי לפי הסינון שנבחר
              </p>
            )}
          </div>
        </div>
      )}

      </>}

    </div>
  )
}
