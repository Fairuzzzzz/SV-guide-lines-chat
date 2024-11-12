import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
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
            <Link
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
              href="#contact"
            >
              Kontak
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
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
                <Link href="#about">
                  <Button variant="outline" size="lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
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
        <section id="contact" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Butuh Bantuan?
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Tim kami siap membantu Anda dengan pertanyaan atau masalah
                  yang Anda hadapi.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <Button className="w-full" size="lg">
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
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
