import { useState, useEffect, useCallback } from 'react'
import { checkHealth } from '../api'

/**
 * useBackendStatus — polls GET / every intervalMs milliseconds.
 * Returns 'checking' | 'online' | 'offline'
 */
export function useBackendStatus(intervalMs = 30_000) {
  const [status, setStatus] = useState('checking')

  const ping = useCallback(async () => {
    try {
      await checkHealth()
      setStatus('online')
    } catch {
      setStatus('offline')
    }
  }, [])

  useEffect(() => {
    ping()
    const id = setInterval(ping, intervalMs)
    return () => clearInterval(id)
  }, [ping, intervalMs])

  return status
}
