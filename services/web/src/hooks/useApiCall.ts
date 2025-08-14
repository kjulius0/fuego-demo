import { useState, useCallback, useEffect } from 'react'
import { AxiosResponse, AxiosError } from 'axios'

export interface ApiState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface ApiCallResult<T> extends ApiState<T> {
  execute: (...args: any[]) => Promise<void>
  reset: () => void
}

/**
 * Generic hook for API calls that automatically manages loading, error, and response states.
 * Works with any API method from the generated OpenAPI client.
 * 
 * @param apiCall - Function that returns a promise from the API client
 * @returns Object with data, loading, error states and execute function
 * 
 * @example
 * ```tsx
 * const api = new ApiApi(undefined, baseUrl)
 * const greeting = useApiCall((payload: GreetingInput) => api.pOSTApiGreeting(payload))
 * 
 * // In component:
 * const handleSubmit = () => greeting.execute({ name: 'John' })
 * 
 * if (greeting.loading) return <div>Loading...</div>
 * if (greeting.error) return <div>Error: {greeting.error}</div>
 * if (greeting.data) return <div>{greeting.data.message}</div>
 * ```
 */
export function useApiCall<TData, TArgs extends any[]>(
  apiCall: (...args: TArgs) => Promise<AxiosResponse<TData>>
): ApiCallResult<TData> {
  const [state, setState] = useState<ApiState<TData>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(async (...args: TArgs): Promise<void> => {
    setState(prev => ({ ...prev, loading: true, error: null }))

    try {
      const response = await apiCall(...args)
      setState({
        data: response.data,
        loading: false,
        error: null,
      })
    } catch (err) {
      const error = err as AxiosError
      const errorMessage = error.response?.data 
        ? JSON.stringify(error.response.data)
        : error.message || 'Unknown error'
      
      setState({
        data: null,
        loading: false,
        error: errorMessage,
      })
    }
  }, [apiCall])

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

/**
 * Hook for API calls that should execute immediately on mount.
 * Useful for data fetching on component load.
 * 
 * @param apiCall - Function that returns a promise from the API client
 * @param args - Arguments to pass to the API call
 * @param deps - Dependency array for when to re-execute the call
 * @returns Object with data, loading, error states and refetch function
 * 
 * @example
 * ```tsx
 * const api = new ApiApi(undefined, baseUrl)
 * const user = useApiQuery(() => api.gETApiUserId('123'), ['123'])
 * 
 * if (user.loading) return <div>Loading...</div>
 * if (user.error) return <div>Error: {user.error}</div>
 * if (user.data) return <div>{user.data.name}</div>
 * ```
 */
export function useApiQuery<TData, TArgs extends any[]>(
  apiCall: (...args: TArgs) => Promise<AxiosResponse<TData>>,
  args: TArgs,
  deps: React.DependencyList = []
): Omit<ApiCallResult<TData>, 'execute'> & { refetch: () => void } {
  const { execute, ...rest } = useApiCall(apiCall)

  const refetch = useCallback(() => {
    execute(...args)
  }, [execute, ...args])

  // Execute on mount and when deps change
  useEffect(() => {
    execute(...args)
  }, [execute, ...deps])

  return {
    ...rest,
    refetch,
  }
}