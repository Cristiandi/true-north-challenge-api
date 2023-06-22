import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    environment: process.env.NODE_ENV || 'development',
    app: {
      port: parseInt(process.env.PORT, 10) || 8080,
      initialBalance: parseInt(process.env.INITIAL_BALANCE, 10) || 10,
    },
    database: {
      client: process.env.DATABASE_CLIENT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      log: process.env.DATABASE_LOG || 'yes',
    },
    acl: {
      companyUid: process.env.BASIC_ACL_COMPANY_UID,
      accessKey: process.env.BASIC_ACL_ACCESS_KEY,
      roles: {
        customerCode: process.env.BASIC_ACL_CUSTOMER_ROLE_CODE,
      },
    },
    randomOrg: {
      url: process.env.RANDOM_ORG_URL,
    },
  };
});
