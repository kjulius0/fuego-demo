import { useState } from 'react'
import { usePOSTApiAnimal, AnimalRequest } from '../client/openAPI'

export default function AnimalGenerator() {
  const [secret, setSecret] = useState('22')
  
  const animal = usePOSTApiAnimal()

  const generateAnimal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!secret.trim()) return

    const secretNumber = parseInt(secret)
    
    if (isNaN(secretNumber)) {
      return
    }

    const payload: AnimalRequest = { secret: secretNumber }
    animal.mutate({ data: payload })
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
        <button type="submit" disabled={animal.isPending || !secret.trim()}>
          {animal.isPending ? 'Generating...' : 'Generate Animal'}
        </button>
      </form>
      
      {animal.isPending && <div className="loading">Generating random animal...</div>}
      {animal.error && <div className="error">Error: {animal.error.message}</div>}
      {animal.data && (
        <div className="response">
          {animal.data.data.secret ? (
            <div>
              <strong>🎉 Success!</strong><br/>
              Animal #{animal.data.data.id}: <strong>{animal.data.data.name}</strong> the {animal.data.data.type}<br/>
              <em>Habitat: {animal.data.data.habitat}</em>
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