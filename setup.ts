import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import failOnConsole from 'vitest-fail-on-console'

failOnConsole({ shouldFailOnError: true, shouldFailOnWarn: true })

afterEach(() => {
  cleanup()
  localStorage.clear()
})
