import { useState } from 'react'
import { ApiApi, AnimalRequest, AnimalResponse } from '../client/api'

interface Props {
  baseUrl: string
}

export default function AnimalGenerator({ baseUrl }: Props) {
  const [secret, setSecret] = useState('22')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState<AnimalResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateAnimal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secret.trim()) return

    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const api = new ApiApi(undefined, baseUrl)
      const secretNumber = parseInt(secret)
      
      if (isNaN(secretNumber)) {
        throw new Error('Secret must be a number')
      }

      const payload: AnimalRequest = { secret: secretNumber }
      const result = await api.pOSTApiAnimal(payload)
      setResponse(result.data)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Unknown error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="section">
      <h2>Random Animal Generator</h2>
      <p>Enter the secret number to get a random animal. Try 22!</p>
      <form onSubmit={generateAnimal}>
        <div className="form-group">
          <label htmlFor="secret">Secret Number:</label>
          <input
            id="secret"
            type="number"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Enter secret number"
            required
          />
        </div>
        <button type="submit" disabled={loading || !secret.trim()}>
          {loading ? 'Generating...' : 'Generate Animal'}
        </button>
      </form>
      
      {loading && <div className="loading">Generating random animal...</div>}
      {error && <div className="error">Error: {error}</div>}
      {response && (
        <div className="response">
          {response.secret ? (
            <div>
              <strong>🎉 Success!</strong><br/>
              Animal #{response.id}: <strong>{response.name}</strong> the {response.type}<br/>
              <em>Habitat: {response.habitat}</em>
            </div>
          ) : (
            <div>
              <strong>❌ Access Denied</strong><br/>
              Invalid secret number. Try 22!
            </div>
          )}
        </div>
      )}
    </div>
  )
}