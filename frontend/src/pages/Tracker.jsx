import { useState, useEffect, useCallback } from 'react'
import { api } from '../lib/api.js'

const STATUS_LABELS = {
  nouveau: { label: 'Nouveau', color: 'bg-gray-100 text-gray-700' },
  postule: { label: 'Postulé', color: 'bg-blue-100 text-blue-700' },
  relance: { label: 'Relancé', color: 'bg-yellow-100 text-yellow-700' },
  refus: { label: 'Refus', color: 'bg-red-100 text-red-700' },
  accepte: { label: 'Accepté', color: 'bg-green-100 text-green-700' },
}

const STATUSES = Object.keys(STATUS_LABELS)

function ScoreBadge({ score }) {
  const color = score >= 80 ? 'bg-green-100 text-green-800' : score >= 60 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
  return <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>{score}/100</span>
}

function StatusBadge({ status }) {
  const { label, color } = STATUS_LABELS[status] || STATUS_LABELS.nouveau
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${color}`}>{label}</span>
}

export default function Tracker() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filterStatus, setFilterStatus] = useState('')
  const [minScore, setMinScore] = useState(0)
  const [updating, setUpdating] = useState(null)

  const fetchJobs = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await api.getJobs({
        status: filterStatus || undefined,
        min_score: minScore,
      })
      setJobs(data.jobs || [])
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [filterStatus, minScore])

  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  async function handleStatusChange(jobId, newStatus) {
    setUpdating(jobId)
    try {
      await api.updateStatus(jobId, newStatus)
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: newStatus } : j))
      )
    } catch (err) {
      setError(err.message)
    } finally {
      setUpdating(null)
    }
  }

  async function handleDelete(jobId) {
    if (!window.confirm('Supprimer cette candidature ? Cette action est irréversible.')) return
    try {
      await api.deleteJob(jobId)
      setJobs((prev) => prev.filter((j) => j.id !== jobId))
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tracker</h1>
        <p className="text-gray-500 mt-1">Gérez vos candidatures et leur statut</p>
      </div>

      {/* Filtres */}
      <div className="flex flex-wrap gap-3 items-center">
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">Tous les statuts</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s].label}</option>
          ))}
        </select>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-600">Score min :</label>
          <input
            type="number"
            value={minScore}
            onChange={(e) => setMinScore(Number(e.target.value))}
            min={0}
            max={100}
            className="w-16 border border-gray-300 rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12 text-gray-400">Chargement...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Aucune candidature. Lancez une recherche depuis le Dashboard.
        </div>
      ) : (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-gray-900 truncate">{job.title}</h3>
                  <ScoreBadge score={job.score} />
                  <StatusBadge status={job.status} />
                </div>
                <p className="text-sm text-gray-500 mt-0.5">
                  {job.company} {job.location && `· ${job.location}`} {job.contract_type && `· ${job.contract_type}`}
                </p>
                {job.url && (
                  <a href={job.url} target="_blank" rel="noopener noreferrer" className="text-xs text-indigo-600 hover:underline mt-1 inline-block">
                    Voir l'offre
                  </a>
                )}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <select
                  value={job.status}
                  disabled={updating === job.id}
                  onChange={(e) => handleStatusChange(job.id, e.target.value)}
                  className="border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>{STATUS_LABELS[s].label}</option>
                  ))}
                </select>
                <button
                  onClick={() => handleDelete(job.id)}
                  className="text-xs text-red-500 hover:text-red-700 px-2 py-1.5 border border-red-200 rounded-lg hover:bg-red-50"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
