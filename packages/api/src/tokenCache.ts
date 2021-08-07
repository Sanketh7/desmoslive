import { createNodeRedisClient } from "handy-redis";

// invalid tokens expire in the cache after 2 hours to save space
const TOKEN_EXPIRE_TIME = 60 * 60 * 2;

const tokenCache = createNodeRedisClient();

export const invalidateToken = async (token: string): Promise<void> => {
  await tokenCache.set(token, "invalid");
  await tokenCache.expire(token, TOKEN_EXPIRE_TIME);
};

export const checkInvalid = async (token: string): Promise<boolean> => {
  const val = await tokenCache.get(token);
  return Boolean(val);
};
