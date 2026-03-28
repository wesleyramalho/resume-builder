export default function EditorLoading() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Toolbar skeleton */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-background animate-pulse">
        <div className="w-4 h-4 rounded bg-muted" />
        <div className="h-4 w-px bg-border" />
        <div className="flex-1 h-4 rounded bg-muted max-w-[200px]" />
        <div className="h-7 w-20 rounded bg-muted" />
        <div className="h-7 w-24 rounded bg-muted" />
      </div>

      {/* Content skeleton */}
      <div className="flex-1 flex">
        {/* Left panel skeleton */}
        <div className="hidden lg:block w-[240px] border-r border-border p-4 space-y-3">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-8 rounded bg-muted animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
          ))}
        </div>

        {/* Center form skeleton */}
        <div className="flex-1 border-r border-border p-6 space-y-6 animate-pulse">
          <div className="space-y-3">
            <div className="h-3 w-24 rounded bg-muted" />
            <div className="h-10 rounded bg-muted" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-32 rounded bg-muted" />
            <div className="h-10 rounded bg-muted" />
          </div>
          <div className="space-y-3">
            <div className="h-3 w-20 rounded bg-muted" />
            <div className="h-24 rounded bg-muted" />
          </div>
        </div>

        {/* Right preview skeleton */}
        <div className="hidden lg:block flex-1 bg-zinc-100 p-4">
          <div className="bg-white shadow-lg rounded aspect-[210/297] max-w-md mx-auto animate-pulse">
            <div className="p-8 space-y-4">
              <div className="h-6 w-48 rounded bg-muted" />
              <div className="h-3 w-32 rounded bg-muted" />
              <div className="h-px bg-muted mt-4" />
              <div className="space-y-2 mt-4">
                <div className="h-3 w-full rounded bg-muted" />
                <div className="h-3 w-3/4 rounded bg-muted" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
