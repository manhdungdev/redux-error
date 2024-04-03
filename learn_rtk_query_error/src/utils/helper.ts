import { SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query'

interface ErrorFormObject {
  [key: string | number]: string | ErrorFormObject | ErrorFormObject[]
}

interface EntityError {
  status: 422
  data: {
    error: ErrorFormObject
  }
}

export const isFetchBaseQueryError = (error: unknown): error is FetchBaseQueryError => {
  return typeof error === 'object' && error !== null && 'status' in error
}

export const isErrorWithMessage = (error: unknown): error is SerializedError => {
  return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string'
}

export const isEntityError = (error: unknown): error is EntityError => {
  return (
    isFetchBaseQueryError(error) &&
    error.status === 422 &&
    typeof error.data === 'object' &&
    error.data !== null &&
    !(error.data instanceof Array)
  )
}
