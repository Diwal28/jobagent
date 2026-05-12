import { useState } from 'react'
import { api } from '../lib/api.js'

const SCORE_COLOR = (score) => {
  if (score >= 80) return 'bg-green-100 text-green-800'
  if (score >= 60) return 'bg-yellow-100 text-yellow-800'
  return 'bg-red-100 text-red-800'
}

export default function Dashboard() {
  const [query, setQuery] = useState('')
  const [location, setLocation] = useState('')
  const [contractType, setContractType] = useState('')
  const [profile, setProfile] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [results, setResults] = useState(null)

  async function handleSearch(e) {
    e.preventDefault()
    setError(null)
    setResults(null)
    setLoading(true)
    try {
      const data = await api.searchJobs({
        query,
        location: location || undefined,
        contract_type: contractType || undefined,
        candidate_profile: profile,
      })
      setResults(data.results)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Lancer une recherche d'emploi automatisée</p>
      </div>

      <form onSubmit={handleSearch} className="bg-white rounded-xl border border-gray-200 p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mots-clés *</label>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ex: développeur React, data engineer..."
              required
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Localisation</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Paris, Lyon, Remote..."
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type de contrat</label>
          <select
            value={contractType}
            onChange={(e) => setContractType(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Tous</option>
            <option value="CDI">CDI</option>
            <option value="CDD">CDD</option>
            <option value="stage">Stage</option>
            <option value="alternance">Alternance</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Votre profil *</label>
          <textarea
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            placeholder="Décrivez vos compétences, expériences et objectifs..."
            required
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Recherche en cours...' : 'Lancer la recherche'}
        </button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700 text-sm">
          {error}
        </div>
      )}

      {results && (
        <div className="space-y-3">
          <h2 className="font-semibold text-gray-800">
            Résultats — {results.jobs_found ?? 0} offres trouvées, {results.jobs_scored ?? 0} scorées,{' '}
            {results.letters_generated ?? 0} lettres générées
          </h2>
          {results.summary && (
            <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{results.summary}</p>
          )}
        </div>
      )}
    </div>
  )
}
