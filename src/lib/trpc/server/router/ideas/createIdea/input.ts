import { z } from 'zod'

import { zStringRequired, zNickRequired, zStringMin } from '@/shared/zod'

export const zCreateIdeaInput = z.object({
  name: zStringRequired,
  nick: zNickRequired,
  description: zStringRequired,
  text: zStringMin(10),
})

export type CreateIdeaInput = z.infer<typeof zCreateIdeaInput>
