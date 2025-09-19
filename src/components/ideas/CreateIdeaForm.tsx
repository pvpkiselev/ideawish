'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { trpc } from '@/lib/trpc/client'
import { CreateIdeaInput, zCreateIdeaInput } from '@/lib/trpc/server/router/ideas/createIdea/input'

import { Button } from '../ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

export default function CreateIdeaForm() {
  const router = useRouter()

  const form = useForm<CreateIdeaInput>({
    resolver: zodResolver(zCreateIdeaInput),
    defaultValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
  })

  const { mutate, isPending } = trpc.ideas.createIdea.useMutation({
    onSuccess: () => {
      toast.success(`Idea created!`)
      router.push('/')
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSubmit = (values: CreateIdeaInput) => {
    mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="w-full rounded-lg border px-4 py-2" />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nick"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Nick</FormLabel>
              <FormControl>
                <Input {...field} className="w-full rounded-lg border px-4 py-2" />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} className="w-full rounded-lg border px-4 py-2" />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="text"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Text</FormLabel>
              <FormControl>
                <Textarea {...field} rows={6} className="w-full rounded-lg border px-4 py-2" />
              </FormControl>
              {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isPending}>
          {isPending ? 'Creating...' : 'Create Idea'}
        </Button>
      </form>
    </Form>
  )
}
