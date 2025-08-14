import { useGETHealth } from '../client/openAPI'

export default function HealthCheck() {
  // Query runs automatically on mount - no configuration needed!
  const { data, error, isLoading, refetch } = useGETHealth()

  return (
    <div className="section">
      <h2>Health Check</h2>
      <button onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Check Health'}
      </button>
      
      {isLoading && <div className="loading">Checking API health...</div>}
      {error && <div className="error">Error: {error.message}</div>}
      {data && (
        <div className="response">
          {JSON.stringify(data.data, null, 2)}
        </div>
      )}
    </div>
  )
}