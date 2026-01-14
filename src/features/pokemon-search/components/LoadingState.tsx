export function LoadingState() {
  return (
    <div className="text-center">
      <div className="inline-block h-16 w-16 animate-spin rounded-full border-8 border-white border-t-transparent"></div>
      <p className="mt-4 text-2xl text-white font-bold">Searching...</p>
    </div>
  )
}
