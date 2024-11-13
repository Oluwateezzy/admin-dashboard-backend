export default () => ({
  ports: {
    coreService: parseInt(process.env.PORT || '', 10),
  },
  database: {
    url: process.env.DATABASE_URL,
  },
  bcrypt: {
    salt: process.env.GEN_SALT,
  },
  jwt: {
    secrets: {
      default: process.env.JWT_SECRET,
      refreshTokenDefault: process.env.REFRESH_TOKEN_SECRET,
    },
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenAge: process.env.REFRESH_TOKEN_AGE,
  },
  randomToken: {
    length: process.env.RANDOM_TOKEN_LENGTH,
  },
  encryptor: {
    keys: {
      default: process.env.ENCRYPTOR_SECRET_KEY,
    },
  },
});
