'use client'

import Link from 'next/link'
import InfiniteScroll from 'react-infinite-scroller'

import { useLayoutContentRef } from '@/context/LayoutContentRefContext'
import { trpc } from '@/lib/TrpcProvider'
import { TrpcRouterOutput } from '@/server/router'

interface AllIdeasProps {
  initialIdeas: TrpcRouterOutput['getIdeas']
}

export default function AllIdeas({ initialIdeas }: AllIdeasProps) {
  const layoutContentElRef = useLayoutContentRef()

  const { data, error, isLoading, isError, hasNextPage, fetchNextPage, isFetchingNextPage, isRefetching } =
    trpc.getIdeas.useInfiniteQuery(
      {
        search: '',
      },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.nextCursor
        },
        initialData: {
          pageParams: [undefined],
          pages: [initialIdeas],
        },
      }
    )

  if (!data || !data.pages[0].ideas.length) {
    return <div className="text-center">No ideas data available.</div>
  }

  if (isLoading || isRefetching) {
    return <div className="text-center">Loading ideas...</div>
  }

  if (isError) {
    return <div className="text-center text-red-500">Error loading ideas: {error.message}</div>
  }

  const allIdeas = data.pages.flatMap((page) => page.ideas)

  return (
    <div className="mb-2 flex max-w-2xl flex-col space-y-4">
      <InfiniteScroll
        threshold={250}
        loadMore={() => {
          if (!isFetchingNextPage && hasNextPage) {
            void fetchNextPage()
          }
        }}
        hasMore={!!hasNextPage}
        loader={<div key="loader">Loading…</div>}
        getScrollParent={() => layoutContentElRef.current}
        useWindow={
          (layoutContentElRef.current && getComputedStyle(layoutContentElRef.current).overflow !== 'auto') || false
        }
      >
        {allIdeas.map((idea) => (
          <Link
            key={idea.id}
            href={`/ideas/${idea.nick}`}
            className="flex flex-col rounded-lg px-2 py-2 transition-all hover:bg-neutral-100 hover:underline dark:hover:bg-neutral-800"
          >
            <span className="text-lg font-semibold">{idea.name}</span>
            <span className="text-sm">by {idea.nick}</span>
          </Link>
        ))}
      </InfiniteScroll>
    </div>
  )
}
