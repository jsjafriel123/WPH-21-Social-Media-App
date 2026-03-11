import Header from "@/components/layout/Header";
import FloatingMenu from "@/components/layout/FloatingMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center">
      <Header />
      <main className="mx-auto flex h-auto max-w-full flex-col items-center px-4 pt-20 lg:pt-30">
        {children}
      </main>
      <FloatingMenu />
    </div>
  );
}
