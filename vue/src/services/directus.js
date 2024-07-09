import { Directus } from '@directus/sdk';

const directus = new Directus(process.env.VUE_APP_DIRECTUS_URL);

export default directus;

export async function login(email, password) {
  return await directus.auth.login({ email, password });
}
