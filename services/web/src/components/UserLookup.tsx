import { useState } from 'react'
import { useGETApiUserId } from '../client/openAPI'

export default function UserLookup() {
  const [userId, setUserId] = useState('')
  const [shouldFetch, setShouldFetch] = useState(false)
  
  const { data, error, isLoading, refetch } = useGETApiUserId(
    userId, 
    { 
      query: { 
        enabled: shouldFetch && !!userId.trim() 
      }
    }
  )

  const lookupUser = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId.trim()) return
    
    setShouldFetch(true)
    refetch()
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
        <button type="submit" disabled={isLoading || !userId.trim()}>
          {isLoading ? 'Looking up...' : 'Lookup User'}
        </button>
      </form>
      
      {isLoading && <div className="loading">Looking up user...</div>}
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="response">
          {JSON.stringify(data.data, null, 2)}
        </div>
      )}
    </div>
  )
}