import { createTRPCContext } from './context'
import { appRouter } from './router'

export const createCaller = async () => {
  const context = await createTRPCContext()
  return appRouter.createCaller(context)
}
