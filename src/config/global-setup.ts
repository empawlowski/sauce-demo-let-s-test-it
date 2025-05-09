import * as dotenv from 'dotenv';
import * as path from 'path';

async function globalSetup(): Promise<void> {
  enum environments {
    local = 'local',
    prod = 'prod',
  }

  const environment = process.env['ENV'] ?? environments.prod;
  dotenv.config({ path: path.resolve(`.env.${environment}`) });

  // eslint-disable-next-line no-console
  console.log('🌍 Environment: ', environment);
  // console.log('🕵️‍♂️ User: ', Configuration.user);
  // console.log('🔐 Password: ', Configuration.password);
}

export default globalSetup;
