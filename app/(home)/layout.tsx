import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col min-h-[200vh] pt-16">
        {children}
        <Footer />
      </div>
    </div>
  );
}
