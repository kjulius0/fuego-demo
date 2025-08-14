import { useState } from 'react'
import { usePOSTApiGreeting } from '../client/openAPI'

export default function GreetingForm() {
  const [name, setName] = useState('')

  const greeting = usePOSTApiGreeting()

  const sendGreeting = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    greeting.mutate({ data: { name: name.trim() } })
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
        <button type="submit" disabled={greeting.isPending || !name.trim()}>
          {greeting.isPending ? 'Sending...' : 'Send Greeting'}
        </button>
      </form>

      {greeting.isPending && <div className="loading">Sending greeting...</div>}
      {greeting.error && <div className="error">Error: {greeting.error.message}</div>}
      {greeting.data && (
        <div className="response">
          {JSON.stringify(greeting.data.data, null, 2)}
        </div>
      )}
    </div>
  )
}
