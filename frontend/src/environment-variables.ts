export const isProduction = process.env.NODE_ENV === 'production';

export const apiUrl = isProduction ? '' : 'http://localhost:3000';
