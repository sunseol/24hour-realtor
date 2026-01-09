import React from 'react';
import { Link } from 'react-router-dom';
import { Award, Users, Building, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { SEO, Button, Card } from '../components/common';
import { useCompanyInfo } from '../hooks';

const stats = [
  { icon: Clock, value: '15+', label: '년 경력' },
  { icon: Building, value: '2,500+', label: '거래 건수' },
  { icon: Users, value: '1,000+', label: '고객 수' },
  { icon: Award, value: '98%', label: '만족도' },
];

const timeline = [
  { year: '2010', title: '회사 설립', description: '강남구에 24시부동산 창립' },
  { year: '2014', title: '서초 지점 오픈', description: '서초구 지역 확장' },
  { year: '2018', title: '거래 1,000건 돌파', description: '누적 거래 1,000건 달성' },
  { year: '2022', title: '온라인 플랫폼 런칭', description: '디지털 부동산 서비스 시작' },
  { year: '2024', title: '고객만족도 98% 달성', description: '업계 최고 수준의 서비스 인정' },
];

const team = [
  { 
    name: '김영수', 
    role: '대표 공인중개사', 
    experience: '20년 경력',
    description: '강남, 서초 지역 전문가'
  },
  { 
    name: '이미경', 
    role: '수석 컨설턴트', 
    experience: '15년 경력',
    description: '상업용 부동산 전문가'
  },
  { 
    name: '박준호', 
    role: '투자 자문역', 
    experience: '12년 경력',
    description: '부동산 투자 분석 전문가'
  },
  { 
    name: '최수진', 
    role: '고객 서비스팀장', 
    experience: '8년 경력',
    description: '고객 상담 및 관리'
  },
];

const certifications = [
  '공인중개사 자격증',
  '부동산 투자 분석사',
  '주택관리사',
  '금융투자전문인력',
];

export default function AboutPage() {
  const { data: companyInfo } = useCompanyInfo();

  return (
    <>
      <SEO 
        title="회사 소개"
        description="24시부동산은 15년 이상의 경력으로 고객님께 최고의 부동산 서비스를 제공합니다."
        keywords="24시부동산, 부동산 중개, 공인중개사, 강남 부동산"
      />

      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">About Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            24시간 함께하는<br />
            <span className="text-amber-500">부동산 파트너</span>
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            고객님의 소중한 자산을 24시간 지키고, 최적의 부동산 솔루션을 제공합니다.
          </p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center" hover>
                <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-slate-500">{stat.label}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Our Story</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">회사 연혁</h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-amber-200 hidden md:block" />
            
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <Card padding="md">
                      <span className="text-amber-600 font-bold text-lg">{item.year}</span>
                      <h3 className="text-xl font-bold text-slate-900 mt-1">{item.title}</h3>
                      <p className="text-slate-600 mt-1">{item.description}</p>
                    </Card>
                  </div>
                  <div className="hidden md:flex w-4 h-4 bg-amber-500 rounded-full z-10" />
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Our Team</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-3">전문가 팀</h2>
            <p className="text-slate-600 mt-2">각 분야 최고의 전문가들이 함께합니다</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <Card key={index} hover className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-900 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-white">{member.name.charAt(0)}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-amber-600 font-medium">{member.role}</p>
                <p className="text-sm text-slate-500 mt-1">{member.experience}</p>
                <p className="text-sm text-slate-600 mt-2">{member.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">Certifications</span>
              <h2 className="text-3xl font-bold text-slate-900 mt-3 mb-6">자격 및 인증</h2>
              <p className="text-slate-600 mb-8">
                24시부동산의 모든 컨설턴트는 공인된 자격을 보유하고 있으며, 
                지속적인 교육을 통해 전문성을 유지합니다.
              </p>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-amber-500" />
                    <span className="text-slate-700">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card padding="lg" className="bg-gradient-to-br from-slate-900 to-slate-800 text-white">
              <h3 className="text-2xl font-bold mb-4">신뢰할 수 있는 파트너</h3>
              <p className="text-slate-300 mb-6">
                정직과 신뢰를 바탕으로 고객님의 부동산 거래를 안전하게 도와드립니다.
                첫 상담부터 계약 완료까지 전 과정을 함께합니다.
              </p>
              <Link to="/contact">
                <Button variant="primary" size="lg" icon={ArrowRight} iconPosition="right">
                  상담 예약하기
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
