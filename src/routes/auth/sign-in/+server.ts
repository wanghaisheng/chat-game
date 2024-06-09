import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env as publicEnv } from '$env/dynamic/public';
import jwt from "jsonwebtoken";
import type { IProfile } from "$lib/types";
import { env as privateEnv } from '$env/dynamic/private';
import { StaticAuthProvider, getTokenInfo } from "@twurple/auth";
import { ApiClient } from "@twurple/api";

const prepareJwtToken = async (accessToken: string) => {
  const clientId = publicEnv.PUBLIC_TWITCH_CLIENT_ID
  if (!clientId) {
    error(500, "Config problem")
  }

  const jwtSecret = privateEnv.PRIVATE_JWT_SECRET_KEY
  if (!jwtSecret) {
    error(500, "Config problem")
  }

  const tokenInfo = await getTokenInfo(accessToken)
  if (!tokenInfo.userId) {
    error(400, "Wrong userId")
  }

  const authProvider = new StaticAuthProvider(clientId, accessToken);
  const apiClient = new ApiClient({ authProvider });
  const user = await apiClient.users.getUserById(tokenInfo.userId)
  if (!user) {
    error(400, "Wrong user data")
  }

  const profile: IProfile = {
    twitchToken: accessToken,
    twitchId: user.id,
    userName: user.name
  }

  return jwt.sign({ profile }, jwtSecret, { expiresIn: '24h' })
}

export const POST: RequestHandler = async ({ request, cookies }) => {
  const data = await request.json()
  if (!data?.hash) {
    error(400, "Wrong data")
  }

  const cookieKey = publicEnv.PUBLIC_COOKIE_KEY
  if (!cookieKey) {
    error(500, "Config problem")
  }

  const justString = data.hash.split("#")[1]
  const items = new URLSearchParams(justString);

  if (items.has("access_token")) {
    const accessToken = items.get("access_token")
    if (accessToken) {
      const jwtToken = await prepareJwtToken(accessToken)
      cookies.set(cookieKey, jwtToken, { path: "/" })
    }
  }

  return json({
    ok: true
  })
};