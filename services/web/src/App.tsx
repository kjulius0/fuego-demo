import { useState } from 'react'
import HealthCheck from './components/HealthCheck'
import GreetingForm from './components/GreetingForm'
import UserLookup from './components/UserLookup'
import AnimalGenerator from './components/AnimalGenerator'

function App() {
  const [apiBaseUrl] = useState('http://localhost:8888')

  return (
    <div className="container">
      <h1>Fuego API Client</h1>
      <p>API Base URL: <code>{apiBaseUrl}</code></p>
      
      <HealthCheck baseUrl={apiBaseUrl} />
      <GreetingForm baseUrl={apiBaseUrl} />
      <UserLookup baseUrl={apiBaseUrl} />
      <AnimalGenerator baseUrl={apiBaseUrl} />
    </div>
  )
}

export default App