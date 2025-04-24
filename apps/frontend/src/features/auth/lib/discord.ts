import { Discord } from 'arctic';
import { z } from 'zod';

const imageBaseUrl = 'https://cdn.discordapp.com';

const getUserUrl = 'https://discord.com/api/users/@me';

const callbackUrl = `${process.env.AUTH_URL!}/signin/discord/callback`;

const signinUrl = `${process.env.AUTH_URL!}/signin/discord`;

const scopes = ['identify', 'email'];

const tokenType = 'Bearer';

const accountSchema = z.object({
  id: z.string(),
  global_name: z.string(),
  avatar: z.string(),
  email: z.string(),
});

const providerType = 'oauth';

const providerName = 'discord';

const provider = new Discord(
  process.env.AUTH_DISCORD_ID!,
  process.env.AUTH_DISCORD_SECRET!,
  callbackUrl,
);

export const discord = {
  providerName,
  providerType,
  accountSchema,
  imageBaseUrl,
  getUserUrl,
  provider,
  callbackUrl,
  signinUrl,
  scopes,
  tokenType,
};
