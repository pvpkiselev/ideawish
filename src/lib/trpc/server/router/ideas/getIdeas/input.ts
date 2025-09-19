import { z } from 'zod'

import { zStringOptional } from '@/shared/zod'

export const zGetIdeasInput = z.object({
  cursor: z.coerce.number().optional(),
  limit: z.number().min(1).max(100).default(10),
  search: zStringOptional,
})

export type GetIdeasInput = z.infer<typeof zGetIdeasInput>
