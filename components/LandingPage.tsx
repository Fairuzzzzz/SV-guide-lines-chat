import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center px-4 max-w-screen-xl mx-auto">
          <Link className="flex items-center space-x-2" href="#">
            <ShieldCheck className="h-6 w-6" />
            <span className="font-bold">SV Guidelines Chat</span>
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              href="#about"
            >
              Tentang
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Pahami Hak dan Kewajiban Anda sebagai Mahasiswa
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Jelajahi panduan interaktif kami dan dapatkan jawaban instan
                  untuk semua pertanyaan Anda tentang kehidupan kampus.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/chat">
                  <Button size="lg">Mulai Chat</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Tentang SV Guidelines Chat
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  SV Guidelines Chat adalah platform inovatif yang dirancang
                  untuk membantu mahasiswa memahami hak dan kewajiban mereka di
                  lingkungan kampus. Dengan menggunakan teknologi AI, kami
                  menyediakan informasi yang akurat dan up-to-date.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-screen-xl flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Sv Guidelines Chat. Hak Cipta Dilindungi.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
              href="#"
            >
              Kebijakan Privasi
            </Link>
            <Link
              className="text-sm text-muted-foreground hover:underline underline-offset-4"
              href="#"
            >
              Syarat dan Ketentuan
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
