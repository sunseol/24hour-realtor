import React, { useState, useEffect } from 'react';
import {
  Home,
  Building2,
  TrendingUp,
  Shield,
  Search,
  Phone,
  MapPin,
  Mail,
  Menu,
  X,
  Clock
} from 'lucide-react';
import { client, getServices, getListings, getCompanyInfo, urlFor } from './lib/sanity';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [listings, setListings] = useState([]);
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        const [servicesData, listingsData, companyData] = await Promise.all([
          getServices(),
          getListings(),
          getCompanyInfo()
        ]);

        if (servicesData.length > 0) setServices(servicesData);
        if (listingsData.length > 0) setListings(listingsData);
        if (companyData) setCompanyInfo(companyData);
      } catch (error) {
        console.log('Sanity not connected, using static data');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const defaultServices = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "주거용 부동산",
      description: "아파트, 빌라, 원룸 등 다양한 주거 형태의 매물을 전문적으로 관리합니다.",
      colorClass: "from-blue-600 to-blue-800"
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "상업용 부동산",
      description: "오피스, 상가, 투자용 부동산의 입지 분석과 컨설팅을 제공합니다.",
      colorClass: "from-amber-600 to-amber-800"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "부동산 투자 자문",
      description: "시장 분석 기반의 안정적이고 수익성 높은 투자 포트폴리오를 제안합니다.",
      colorClass: "from-emerald-600 to-emerald-800"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "자산 관리",
      description: "고객님의 자산을 안전하게 관리하고 가치를 극대화하는 솔루션을 제공합니다.",
      colorClass: "from-purple-600 to-purple-800"
    }
  ];

  const defaultListings = [
    {
      _id: 1,
      title: "삼성동 래미안 아파트",
      type: "매매",
      price: "12억 5,000만",
      typeColor: "bg-amber-500",
      specs: "84㎡ · 3 bedroom · 2 bath",
      tags: ["남향", "역세권", "단기"],
      gradientClass: "from-slate-700 to-slate-900"
    },
    {
      _id: 2,
      title: "역삼동 프라임 오피스",
      type: "전세",
      price: "5억",
      typeColor: "bg-blue-500",
      specs: "120㎡ · 4인 사무실",
      tags: ["신축", "주차가능", "역세권"],
      gradientClass: "from-slate-600 to-slate-800"
    },
    {
      _id: 3,
      title: "청담동 빌라",
      type: "월세",
      price: "300/80",
      typeColor: "bg-emerald-500",
      specs: "65㎡ · 2 bedroom · 1 bath",
      tags: ["풀옵션", "즉시입주"],
      gradientClass: "from-slate-800 to-slate-950"
    }
  ];

  const displayServices = services.length > 0 ? services : defaultServices;
  const displayListings = listings.length > 0 ? listings : defaultListings;

  const navLinks = [
    { name: "서비스", href: "#services" },
    { name: "매물안내", href: "#listings" },
    { name: "회사소개", href: "#about" },
    { name: "상담예약", href: "#contact" }
  ];

  const phoneNumber = companyInfo?.phone || "1588-0000";
  const address = companyInfo?.address || "서울특별시 중구 을지로 281 DDP (동대문디자인플라자)";

  return (
    <div className="min-h-screen font-sans bg-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-lg py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                isScrolled ? "bg-slate-900 text-amber-500" : "bg-white/20 backdrop-blur text-white"
              }`}>
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex flex-col">
                <span className={`text-xl font-bold leading-none ${isScrolled ? "text-slate-900" : "text-white"}`}>
                  24시<span className="text-amber-500">부동산</span>
                </span>
                <span className={`text-xs font-medium tracking-wider ${isScrolled ? "text-slate-500" : "text-white/70"}`}>
                  24-HOUR REALTOR
                </span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`font-medium transition-colors hover:text-amber-500 ${
                    isScrolled ? "text-slate-700" : "text-white/90"
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <button className="bg-amber-500 hover:bg-amber-400 text-white px-6 py-2.5 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25">
                상담하기
              </button>
            </div>

            <button
              className={`md:hidden p-2 rounded-lg ${isScrolled ? "text-slate-900" : "text-white"}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl rounded-b-2xl p-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block py-2 text-slate-700 font-medium hover:text-amber-500"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button className="w-full bg-amber-500 text-white py-3 rounded-xl font-semibold">
                상담하기
              </button>
            </div>
          )}
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 opacity-10"
               style={{
                 backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
                 backgroundSize: '60px 60px'
               }}>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              <span className="text-amber-400 text-sm font-medium">24시간 항상 함께합니다</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              밤낮없이 당신의 자산을<br />
              <span className="text-amber-500">지켜드립니다</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              전문 부동산 컨설턴트가 24시간 내편으로为您提供 최적의 부동산 솔루션을 찾아드립니다.
            </p>

            <div className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-xl">
                  <MapPin className="w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="원하시는 지역을 입력하세요 (예: 강남구, 마포구)"
                    className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
                  />
                </div>
                <button className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-white px-8 py-3 rounded-xl font-semibold transition-all hover:shadow-lg hover:shadow-amber-500/25">
                  <Search className="w-5 h-5" />
                  검색하기
                </button>
              </div>
            </div>

            <div className="flex justify-center gap-12 mt-12 pt-8 border-t border-white/10">
              <div>
                <p className="text-3xl font-bold text-white">15년+</p>
                <p className="text-slate-400 text-sm">전문 경력</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">2,500+</p>
                <p className="text-slate-400 text-sm">거래 건수</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white">98%</p>
                <p className="text-slate-400 text-sm">고객 만족도</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
              완벽한 부동산 서비스
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              고객님의 다양한 니즈에 맞춘 전문적이고 체계적인 서비스를 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayServices.map((service, index) => (
              <div
                key={service._id || index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.colorClass || 'from-blue-600 to-blue-800'} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  {service.icon ? (
                    <img src={service.icon} alt={service.title} className="w-8 h-8" />
                  ) : (
                    service.iconReact
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="listings" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Featured Properties</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-2">
                추천 매물
              </h2>
              <p className="text-slate-600">전문가가 엄선한 프리미엄 매물입니다.</p>
            </div>
            <button className="inline-flex items-center gap-2 text-slate-700 font-medium hover:text-amber-600 transition-colors">
              전체 매물 보기
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayListings.map((listing) => (
              <div
                key={listing._id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
              >
                <div className={`h-56 bg-gradient-to-br ${listing.gradientClass} relative overflow-hidden`}>
                  {listing.image && (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`${listing.typeColor || "bg-amber-500"} text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase tracking-wide`}>
                        {listing.type}
                      </span>
                    </div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="text-2xl font-bold">{listing.price}</p>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/30 backdrop-blur-sm">
                    <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-semibold hover:bg-amber-500 hover:text-white transition-all transform hover:scale-105">
                      상세보기
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {listing.title}
                  </h3>
                  <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                    <Building2 className="w-4 h-4" />
                    {listing.specs}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags?.map((tag, idx) => (
                      <span key={idx} className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-lg">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-white/10">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Phone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              무료 상담을 받아보세요
            </h2>
            <p className="text-slate-300 mb-8 max-w-xl mx-auto">
              전문가와의 1:1 상담을 통해 당신에게 맞는 최적의 부동산 솔루션을 찾아보세요.
              첫 상담은 무료입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:shadow-lg hover:shadow-amber-500/25 flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                {phoneNumber}
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2">
                <Mail className="w-5 h-5" />
                상담 신청하기
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-500">
                  <Clock className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xl font-bold">24시부동산</span>
                  <p className="text-xs text-slate-500">24-HOUR REALTOR</p>
                </div>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                24시간 언제나 고객님의 곁에서<br />
                최고의 부동산 서비스를 제공합니다.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">바로가기</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li><a href="#" className="hover:text-amber-500 transition-colors">서비스 소개</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">추천 매물</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">회사 소개</a></li>
                <li><a href="#" className="hover:text-amber-500 transition-colors">상담 예약</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contact</h4>
              <ul className="space-y-3 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-amber-500 mt-0.5" />
                  <span>{address}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-amber-500" />
                  <span>{phoneNumber}</span>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-amber-500" />
                  <span>contact@24realtor.com</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">운영시간</h4>
              <ul className="space-y-2 text-slate-400 text-sm">
                <li className="flex justify-between">
                  <span>평일</span>
                  <span className="text-white">09:00 - 20:00</span>
                </li>
                <li className="flex justify-between">
                  <span>주말</span>
                  <span className="text-white">10:00 - 18:00</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-amber-500 font-medium">24시간</span>
                  <span className="text-white">온라인 상담</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2024 24시부동산. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-slate-500 hover:text-white transition-colors">이용약관</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors">개인정보처리방침</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
