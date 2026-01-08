import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="absolute left-0 bottom-0 w-1/3 h-full bg-primary-50 -z-10 hidden lg:block"></div>
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
          <div className="grid lg:grid-cols-2">
            <div className="p-12 lg:p-16 bg-primary-900 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500 rounded-full blur-[100px] opacity-20 -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-500 rounded-full blur-[100px] opacity-20 -ml-32 -mb-32"></div>
              
              <div className="relative z-10">
                <h3 className="text-gold-500 font-bold tracking-wider uppercase mb-3">Contact Us</h3>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">부동산 전문가와 상담하세요</h2>
                <p className="text-gray-300 mb-12 leading-relaxed">
                  궁금하신 점이나 상담이 필요하신가요? <br/>
                  24시간 언제든지 문의주시면 친절하게 안내해 드리겠습니다.
                </p>
                
                <div className="space-y-8">
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">상담 전화</p>
                      <p className="text-xl font-bold">02-1234-5678</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">이메일</p>
                      <p className="text-xl font-bold">contact@24korea.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 group">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-gold-500 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm mb-1">오시는 길</p>
                      <p className="text-lg font-bold">서울특별시 강남구 테헤란로 123</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 lg:p-16 bg-white">
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">이름</label>
                    <input type="text" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 focus:bg-white transition-all" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">연락처</label>
                    <input type="tel" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 focus:bg-white transition-all" placeholder="010-0000-0000" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">관심 매물 / 문의 유형</label>
                  <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 focus:bg-white transition-all">
                    <option>아파트 매매</option>
                    <option>오피스/상가 임대</option>
                    <option>부동산 투자 상담</option>
                    <option>기타 문의</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">문의 내용</label>
                  <textarea className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gold-500 focus:bg-white transition-all h-32 resize-none" placeholder="문의하실 내용을 자유롭게 적어주세요."></textarea>
                </div>
                
                <button type="button" className="w-full bg-primary-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-primary-800 transition-colors shadow-lg shadow-primary-900/20 transform hover:-translate-y-1">
                  상담 신청하기
                </button>
                
                <p className="text-xs text-center text-gray-500 mt-4">
                  * 개인정보는 상담 목적으로만 사용되며 안전하게 보호됩니다.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
