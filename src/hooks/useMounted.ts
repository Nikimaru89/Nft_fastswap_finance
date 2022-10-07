import { useMemo, useEffect } from "react"

const useMounted = () => {
  const mounted = useMemo(() => ({ current: true }), [])
  useEffect(() => {
    return () => { mounted.current = false }
  }, [mounted])
  return mounted
}

export default useMounted