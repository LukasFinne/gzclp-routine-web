import { createFileRoute } from '@tanstack/react-router'
import Login from '../../components/login/login'

export const Route = createFileRoute('/login/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
  <div className="hero flex-1">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <Login/>
    </div>
  </div>
  )
}
