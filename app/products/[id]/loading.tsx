export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-20 animate-pulse">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="aspect-square bg-muted rounded-[2rem]" />
        <div className="space-y-6">
          <div className="h-10 w-3/4 bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-16 w-full bg-muted rounded-full mt-10" />
        </div>
      </div>
    </div>
  );
}
