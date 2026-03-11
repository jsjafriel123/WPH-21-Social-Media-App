export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-screen justify-center overflow-hidden">
      <div
        className="flex min-h-screen w-full items-center justify-center px-6"
        style={{
          backgroundImage: "url('/assets/bg-Gradient-lg.svg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {children}
      </div>
    </main>
  );
}
