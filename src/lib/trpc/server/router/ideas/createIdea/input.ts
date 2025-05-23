import { z } from 'zod'

import { zStringRequired, zNickRequired, zStringMin } from '@/shared/zod'

export const zCreateIdeaTrpcInput = z.object({
  name: zStringRequired,
  nick: zNickRequired,
  description: zStringRequired,
  text: zStringMin(10),
})
