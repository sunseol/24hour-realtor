import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from 'lucide-react';
import { SEO, Button, Input, Card } from '../components/common';
import { useCompanyInfo } from '../hooks';

const contactSchema = z.object({
  name: z.string().min(2, '이름을 2자 이상 입력해주세요'),
  phone: z.string().min(10, '올바른 전화번호를 입력해주세요').regex(/^[0-9-]+$/, '숫자만 입력해주세요'),
  email: z.string().email('올바른 이메일을 입력해주세요').optional().or(z.literal('')),
  propertyType: z.string().optional(),
  budget: z.string().optional(),
  message: z.string().min(10, '문의 내용을 10자 이상 입력해주세요'),
});

export default function ContactPage() {
  const { data: companyInfo } = useCompanyInfo();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Contact form submitted:', data);
    toast.success('상담 신청이 완료되었습니다. 빠른 시일 내에 연락드리겠습니다.');
    reset();
  };

  return (
    <>
      <SEO 
        title="상담 예약"
        description="24시 코리아 부동산에 상담을 예약하세요. 전문 컨설턴트가 맞춤 상담을 제공합니다."
        keywords="부동산 상담, 상담 예약, 무료 상담, 부동산 컨설팅"
      />

      <section className="pt-24 pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-amber-400 font-semibold text-sm uppercase tracking-wider">Contact Us</span>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mt-4 mb-6">
            상담 예약
          </h1>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            전문 컨설턴트와 1:1 맞춤 상담을 받아보세요. 첫 상담은 무료입니다.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">상담 신청서</h2>
                
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="이름 *"
                      placeholder="홍길동"
                      error={errors.name?.message}
                      {...register('name')}
                    />
                    <Input
                      label="연락처 *"
                      placeholder="010-1234-5678"
                      error={errors.phone?.message}
                      {...register('phone')}
                    />
                  </div>

                  <Input
                    label="이메일"
                    type="email"
                    placeholder="example@email.com"
                    error={errors.email?.message}
                    {...register('email')}
                  />

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        관심 매물 유형
                      </label>
                      <select
                        {...register('propertyType')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="">선택해주세요</option>
                        <option value="apartment">아파트</option>
                        <option value="villa">빌라</option>
                        <option value="officetel">오피스텔</option>
                        <option value="office">오피스</option>
                        <option value="store">상가</option>
                        <option value="other">기타</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">
                        예산
                      </label>
                      <select
                        {...register('budget')}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                      >
                        <option value="">선택해주세요</option>
                        <option value="under3">3억 이하</option>
                        <option value="3to5">3억 ~ 5억</option>
                        <option value="5to10">5억 ~ 10억</option>
                        <option value="10to20">10억 ~ 20억</option>
                        <option value="over20">20억 이상</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">
                      문의 내용 *
                    </label>
                    <textarea
                      {...register('message')}
                      rows={5}
                      placeholder="원하시는 지역, 조건, 기타 문의사항을 자유롭게 작성해주세요."
                      className={`w-full px-4 py-3 rounded-xl border bg-white text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all duration-200 ${
                        errors.message ? 'border-red-500' : 'border-slate-200'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1.5 text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <Button 
                    type="submit" 
                    variant="primary" 
                    size="lg" 
                    icon={Send}
                    loading={isSubmitting}
                    className="w-full md:w-auto"
                  >
                    상담 신청하기
                  </Button>
                </form>
              </Card>
            </div>

            <div className="space-y-6">
              <Card padding="lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">연락처 정보</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">전화</p>
                      <a href={`tel:${companyInfo.phone}`} className="font-semibold text-slate-900 hover:text-amber-600">
                        {companyInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">이메일</p>
                      <a href={`mailto:${companyInfo.email}`} className="font-semibold text-slate-900 hover:text-amber-600">
                        {companyInfo.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">주소</p>
                      <p className="font-semibold text-slate-900">{companyInfo.address}</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card padding="lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">영업 시간</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">평일</span>
                    <span className="font-medium text-slate-900">{companyInfo.businessHours?.weekday || '09:00 - 20:00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">주말</span>
                    <span className="font-medium text-slate-900">{companyInfo.businessHours?.weekend || '10:00 - 18:00'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-600 font-medium">24시간</span>
                    <span className="font-medium text-slate-900">온라인 상담</span>
                  </div>
                </div>
              </Card>

              <Card padding="lg" className="bg-gradient-to-br from-amber-500 to-amber-600 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle className="w-6 h-6" />
                  <h3 className="text-lg font-bold">빠른 상담</h3>
                </div>
                <p className="text-amber-100 text-sm mb-4">
                  카카오톡으로 빠르게 상담받으세요
                </p>
                <Button 
                  variant="dark" 
                  size="md" 
                  className="w-full bg-slate-900 hover:bg-slate-800"
                >
                  카카오톡 상담
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">오시는 길</h2>
          </div>
          <div className="aspect-video bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400">
            <div className="text-center">
              <MapPin className="w-16 h-16 mx-auto mb-4 text-slate-300" />
              <p className="text-lg">지도 서비스 준비중입니다</p>
              <p className="mt-2">{companyInfo.address}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
