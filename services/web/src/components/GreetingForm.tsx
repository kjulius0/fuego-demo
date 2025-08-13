import { useState } from 'react'
import axios from 'axios'

interface GreetingInput {
  name: string
}

interface GreetingResponse {
  message: string
  timestamp: string
}

interface Props {
  baseUrl: string
}

export default function GreetingForm({ baseUrl }: Props) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<GreetingResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const sendGreeting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const payload: GreetingInput = { name: name.trim() }
      const result = await axios.post<GreetingResponse>(`${baseUrl}/api/greeting`, payload)
      setResponse(result.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>Send Greeting</h2>
      <form onSubmit={sendGreeting}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <button type="submit" disabled={loading || !name.trim()}>
          {loading ? 'Sending...' : 'Send Greeting'}
        </button>
      </form>
      
      {loading && <div className="loading">Sending greeting...</div>}
      {error && <div className="error">Error: {error}</div>}
      {response && (
        <div className="response">
          {JSON.stringify(response, null, 2)}
        </div>
      )}
    </div>
  )
}