export function getErrorMessage(err, fallback = 'Something went wrong') {
  if (!err) return fallback
  // try common places
  if (err.response && err.response.data && err.response.data.message) return err.response.data.message
  if (err.message) return err.message
  if (typeof err === 'string') return err
  return fallback
}
