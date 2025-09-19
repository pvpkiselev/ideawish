import { z } from 'zod'

import { zStringRequired, zStringOptional } from '@/shared/zod'

export const zGetIdeaInput = z.object({
  nick: zStringRequired,
  limit: z.number().min(1).max(100).default(10),
  search: zStringOptional,
})

export type GetIdeaInput = z.infer<typeof zGetIdeaInput>
