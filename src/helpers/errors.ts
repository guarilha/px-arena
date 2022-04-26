export const createMissingProviderError = (providerName: string) =>
  new Error(`use${providerName} must be used within ${providerName}`)
