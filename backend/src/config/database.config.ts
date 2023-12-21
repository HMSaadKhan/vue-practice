export default () => ({
    database: {
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USERNAME || 'your_username',
      password: process.env.DATABASE_PASSWORD || 'your_password',
      database: process.env.DATABASE_NAME || 'your_database_name',
      synchronize: process.env.DATABASE_SYNCHRONIZE || true,
      logging: process.env.DATABASE_LOGGING || true,
    },
  });