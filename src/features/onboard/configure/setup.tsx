import type { Steps } from "./steps"

interface setupProps {
  step: Steps
}

export const Setup = ({step}: setupProps) => {

  return (
    <div className="flex flex-col space-y-4 p-4 w-full">
      <p>{step}</p>
    </div>
  )
}