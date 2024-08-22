import { createId } from '@paralleldrive/cuid2'
import type { EventHandlerRequest } from 'h3'
import type { TokenCreateResponse, TwitchToken } from '@chat-game/types'
import { db } from '@chat-game/prisma-client'

export default defineEventHandler<EventHandlerRequest, Promise<TokenCreateResponse>>(
  async (event) => {
    const body = await readBody(event)

    if (!body.profileId) {
      throw createError({
        statusCode: 400,
        message: 'You must provide profileId',
      })
    }

    const profile = await db.profile.findFirst({
      where: { id: body.profileId },
    })
    if (!profile) {
      throw createError({
        statusCode: 400,
        message: 'Not correct profile',
      })
    }

    const ai = await db.twitchToken.findFirst({
      where: { profileId: profile.id, type: 'AI_VIEW' },
    })
    if (ai) {
      throw createError({
        statusCode: 400,
        message: 'Already have one',
      })
    }

    const token = await db.twitchToken.create({
      data: {
        id: createId(),
        profileId: profile.id,
        status: 'ACTIVE',
        type: 'AI_VIEW',
      },
    })

    return {
      ok: true,
      result: token as TwitchToken,
    }
  }
)