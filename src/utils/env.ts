export const isProduction = (): boolean => process.env.NODE_ENV === 'production'

export const isTest = (): boolean => process.env.NODE_ENV === 'test'

export const isDevelopment = (): boolean => process.env.NODE_ENV === 'development'
