import { useState } from 'react'
import { DefaultApi, HealthResponse } from '../client/api'

interface Props {
  baseUrl: string
}

export default function HealthCheck({ baseUrl }: Props) {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<HealthResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const checkHealth = async () => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const api = new DefaultApi(undefined, baseUrl)
      const result = await api.gETHealth()
      setResponse(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>Health Check</h2>
      <button onClick={checkHealth} disabled={loading}>
        {loading ? 'Checking...' : 'Check Health'}
      </button>
      
      {loading && <div className="loading">Checking API health...</div>}
      {error && <div className="error">Error: {error}</div>}
      {response && (
        <div className="response">
          {JSON.stringify(response, null, 2)}
        </div>
      )}
    </div>
  )
}