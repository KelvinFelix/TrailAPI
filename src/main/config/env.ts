export const env = {
  weatherDataApi: {
    appid: process.env.WEATHER_DATA_API_APP_ID ?? ''
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'jk43h5jk43h5k34'
}
