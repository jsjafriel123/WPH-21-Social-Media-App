export function EmptyUserPost() {
  return (
    <section className="flex h-93.75 w-full flex-col items-center justify-center gap-6 lg:h-42 lg:w-113.25">
      <div className="flex h-29.5 w-full flex-col gap-1 lg:h-24">
        <p className="text-md text-center font-bold tracking-[-2%] lg:text-lg lg:tracking-[-3%]">
          Your story starts here
        </p>
        <p className="lg:text-md text-center text-sm font-normal tracking-[-2%] text-neutral-400">
          Share your first post and let the world see your moments, passions,
          and memories. Make this space truly yours.
        </p>
      </div>
      <button className="lg:text-md bg-primary-300 h-10 w-64.75 rounded-full p-2 text-center text-sm font-bold tracking-[-1%] lg:h-12 lg:tracking-[-2%]">
        Upload My First Post
      </button>
    </section>
  );
}
