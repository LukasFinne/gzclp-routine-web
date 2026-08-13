import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/onboard/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/onboard/"!</div>
}
