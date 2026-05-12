const BASE_URL = import.meta.env.VITE_API_URL || '/api'

async function request(method, path, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (body) options.body = JSON.stringify(body)

  try {
    const res = await fetch(`${BASE_URL}${path}`, options)
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: res.statusText }))
      throw new Error(error.detail || `HTTP ${res.status}`)
    }
    if (res.status === 204) return null
    return res.json()
  } catch (err) {
    if (err instanceof TypeError) {
      throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion.')
    }
    throw err
  }
}

export const api = {
  searchJobs: (payload) => request('POST', '/agent/search', payload),
  getJobs: (params = {}) => {
    const qs = new URLSearchParams()
    if (params.status) qs.set('status', params.status)
    if (params.min_score !== undefined) qs.set('min_score', params.min_score)
    const query = qs.toString() ? `?${qs}` : ''
    return request('GET', `/jobs${query}`)
  },
  updateStatus: (jobId, status) => request('PUT', `/jobs/${jobId}/status`, { status }),
  deleteJob: (jobId) => request('DELETE', `/jobs/${jobId}`),
}
