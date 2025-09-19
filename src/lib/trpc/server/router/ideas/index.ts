import { createAppRouter } from '../../trpc'

import { createIdeaRoute } from './createIdea'
import { getIdeaRoute } from './getIdea'
import { getIdeasRoute } from './getIdeas'

export const ideasRouter = createAppRouter({
  getIdeas: getIdeasRoute,
  getIdea: getIdeaRoute,
  createIdea: createIdeaRoute,
})
