interface LoadingSpinnerProps {
  text?: string
}

export const LoadingSpinner = ({text}: LoadingSpinnerProps) => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4">
      <span className="loading loading-spinner loading-lg"></span>
      <p className="text-lg font-semibold">{text}</p>
    </div>
  )
}