export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="h-20 w-20 bg-muted rounded-full" />
        <div className="h-10 w-64 bg-muted rounded" />
      </div>
    </div>
  );
}
