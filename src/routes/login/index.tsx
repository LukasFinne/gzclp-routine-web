import { createFileRoute, type LinkComponentProps } from '@tanstack/react-router'
import { z } from 'zod'
import Login from '../../components/login/login'

const loginSearchSchema = z.object({
  redirect: z.custom<LinkComponentProps["to"]>().optional(),
})

export const Route = createFileRoute('/login/')({
  validateSearch: loginSearchSchema,
  component: RouteComponent,
})

function RouteComponent() {
  const { redirect } = Route.useSearch()
  return (
    <div className="hero flex-1">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Login redirect={redirect} />
      </div>
    </div>
  )
}

