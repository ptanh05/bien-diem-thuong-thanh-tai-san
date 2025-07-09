import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles, Star, Wallet, Zap, Shield, DollarSign } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>

        <div className="container mx-auto text-center relative z-10">
          <div className="max-w-5xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-100 to-green-50 border border-green-200 text-green-700 text-sm font-medium mb-8 shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Web3 Loyalty Platform trên Lisk Blockchain
              <Star className="w-4 h-4 ml-2 text-yellow-500" />
            </div>

            <h1 className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-tight tracking-tight">
              Biến điểm thưởng
              <br />
              <span className="bg-gradient-to-r from-green-600 via-green-500 to-emerald-500 bg-clip-text text-transparent">
                thành tài sản
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
              Gom Gom giúp bạn quản lý tất cả điểm thưởng trong một ví duy nhất,
              <br className="hidden md:block" />
              chuyển đổi thành token và tận dụng tối đa giá trị loyalty của bạn
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
              <Link href="/my-profile">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all transform hover:scale-105"
                >
                  Khám phá MVP
                  <ArrowRight className="ml-3 w-6 h-6" />
                </Button>
              </Link>
              <Link href="/mvp-features">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-300 text-green-700 hover:bg-green-50 px-10 py-6 text-xl font-bold rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all"
                >
                  Tìm hiểu tính năng
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">Web3</div>
                <div className="text-sm text-gray-600 font-medium">Blockchain Native</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">$0.001</div>
                <div className="text-sm text-gray-600 font-medium">Phí giao dịch trung bình</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24/7</div>
                <div className="text-sm text-gray-600 font-medium">Hoạt động liên tục</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Giải pháp Web3 Loyalty</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Chúng tôi sử dụng công nghệ blockchain để giải quyết các vấn đề cốt lõi của loyalty truyền thống
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Wallet,
                title: "Ví duy nhất",
                description: "Tập trung tất cả điểm thưởng từ nhiều thương hiệu vào một ví Web3 duy nhất",
              },
              {
                icon: Zap,
                title: "Token hóa",
                description: "Chuyển đổi điểm thưởng thành token blockchain, có thể giao dịch và chuyển nhượng",
              },
              {
                icon: DollarSign,
                title: "Phí thấp",
                description: "Sử dụng Lisk blockchain với phí giao dịch cực thấp, tối ưu cho micro-transactions",
              },
              {
                icon: Shield,
                title: "Minh bạch & Bảo mật",
                description: "Tất cả giao dịch được ghi nhận trên blockchain, đảm bảo minh bạch và bảo mật tuyệt đối",
              },
            ].map((solution, index) => (
              <div
                key={index}
                className="bg-white border border-green-100 rounded-2xl p-6 text-center hover:shadow-lg transition-all hover:scale-105"
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <solution.icon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{solution.title}</h3>
                <p className="text-gray-600">{solution.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-green-600 to-emerald-600">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Sẵn sàng bắt đầu?</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Kết nối ví Web3 của bạn và trải nghiệm tương lai của loyalty program
          </p>
          <Link href="/my-profile">
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-gray-100 px-10 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all"
            >
              Bắt đầu ngay
              <ArrowRight className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
