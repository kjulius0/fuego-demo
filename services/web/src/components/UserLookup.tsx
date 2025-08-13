import { useState } from 'react'
import { ApiApi, UserResponse } from '../client/api'

interface Props {
  baseUrl: string
}

export default function UserLookup({ baseUrl }: Props) {
  const [userId, setUserId] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<UserResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const lookupUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const api = new ApiApi(undefined, baseUrl)
      const result = await api.gETApiUserId(userId)
      setResponse(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>User Lookup</h2>
      <p>Try user IDs: 123, 456, or 789</p>
      <form onSubmit={lookupUser}>
        <div className="form-group">
          <label htmlFor="userId">User ID:</label>
          <input
            id="userId"
            type="number"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            placeholder="Enter user ID"
            required
          />
        </div>
        <button type="submit" disabled={loading || !userId.trim()}>
          {loading ? 'Looking up...' : 'Lookup User'}
        </button>
      </form>
      
      {loading && <div className="loading">Looking up user...</div>}
      {error && <div className="error">Error: {error}</div>}
      {response && (
        <div className="response">
          {JSON.stringify(response, null, 2)}
        </div>
      )}
    </div>
  )
}