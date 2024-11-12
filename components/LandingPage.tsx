import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, Scroll, Users, MessageSquare } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col main-h-screen bg-background">
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <Link className="flex items-center justify-center" href="#">
          <BookOpen className="h-6 w-6 mr-2" />
          <span className="font-bold">Panduan Mahasiswa</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#hak-kewajiban"
          >
            Hak & Kewajiban
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#fitur"
          >
            Fitur
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#faq"
          >
            FAQ
          </Link>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Panduan Hak dan Kewajiban Mahasiswa
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Pelajari hak dan kewajiban Anda sebagai mahasiswa dengan
                  bantuan AI. Dapatkan jawaban instan untuk pertanyaan Anda.
                </p>
              </div>
              <div className="space-x-4">
                <Link href="/chat">
                  <Button size="lg">Mulai Chat</Button>
                </Link>
                <Link href="#hak-kewajiban">
                  <Button variant="outline" size="lg">
                    Pelajari Lebih Lanjut
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          id="hak-kewajiban"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Hak dan Kewajiban Utama
            </h2>
            <Tabs defaultValue="hak" className="w-full max-w-3xl mx-auto">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="hak">Hak Mahasiswa</TabsTrigger>
                <TabsTrigger value="kewajiban">Kewajiban Mahasiswa</TabsTrigger>
              </TabsList>
              <TabsContent value="hak">
                <Card>
                  <CardHeader>
                    <CardTitle>Hak Mahasiswa</CardTitle>
                    <CardDescription>
                      Beberapa hak penting yang dimiliki mahasiswa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>1. Mendapatkan pendidikan berkualitas</p>
                    <p>2. Menggunakan fasilitas akademik</p>
                    <p>3. Mendapatkan bimbingan dari dosen</p>
                    <p>4. Berpartisipasi dalam kegiatan organisasi mahasiswa</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="kewajiban">
                <Card>
                  <CardHeader>
                    <CardTitle>Kewajiban Mahasiswa</CardTitle>
                    <CardDescription>
                      Beberapa kewajiban penting yang harus dipenuhi mahasiswa
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>1. Mematuhi semua peraturan/ketentuan yang berlaku</p>
                    <p>2. Menjaga integritas akademik</p>
                    <p>3. Menghormati sivitas akademika lainnya</p>
                    <p>4. Memelihara sarana dan prasarana kampus</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        <section id="fitur" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Fitur Utama
            </h2>
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              <Card>
                <CardHeader>
                  <MessageSquare className="w-8 h-8 mb-2" />
                  <CardTitle>Chat AI</CardTitle>
                </CardHeader>
                <CardContent>
                  Dapatkan jawaban instan untuk pertanyaan Anda tentang hak dan
                  kewajiban mahasiswa melalui chatbot AI kami.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Scroll className="w-8 h-8 mb-2" />
                  <CardTitle>Panduan Lengkap</CardTitle>
                </CardHeader>
                <CardContent>
                  Akses panduan komprehensif tentang hak dan kewajiban mahasiswa
                  yang selalu diperbarui.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Users className="w-8 h-8 mb-2" />
                  <CardTitle>Komunitas</CardTitle>
                </CardHeader>
                <CardContent>
                  Bergabung dengan komunitas mahasiswa untuk berbagi pengalaman
                  dan mendiskusikan isu-isu terkini.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Pertanyaan Umum
            </h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Bagaimana cara menggunakan chatbot?</CardTitle>
                </CardHeader>
                <CardContent>
                  Cukup klik tombol "Mulai Chat" dan ajukan pertanyaan Anda
                  tentang hak dan kewajiban mahasiswa. AI kami akan memberikan
                  jawaban instan.
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Apakah informasi selalu diperbarui?</CardTitle>
                </CardHeader>
                <CardContent>
                  Ya, kami secara rutin memperbarui database kami dengan
                  informasi terkini tentang peraturan dan kebijakan universitas.
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © 2023 Universitas Contoh. Hak Cipta Dilindungi.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Kebijakan Privasi
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Syarat dan Ketentuan
          </Link>
        </nav>
      </footer>
    </div>
  );
}
