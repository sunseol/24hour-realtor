import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80"
          alt="프리미엄 부동산"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-900/95 via-primary-800/90 to-primary-950/95"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-primary-500/10 rounded-full blur-3xl"></div>

        <div className="absolute inset-0 opacity-[0.03]"
             style={{
               backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
               backgroundSize: '40px 40px'
             }}>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
        <div className="text-white space-y-8 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 text-gold-300 text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse"></span>
            신뢰할 수 있는 부동산 파트너
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            대한민국 <span className="text-gold-400">No.1</span><br />
            부동산 전문 그룹
          </h1>
          
          <p className="text-lg md:text-xl text-gray-300 max-w-lg leading-relaxed">
            고객님의 소중한 자산 가치를 극대화하는 최고의 부동산 솔루션을 제공합니다. 
            24시간 언제 어디서나 전문 컨설턴트가 함께합니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-white rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-gold-500/25 transform hover:-translate-y-1 flex items-center justify-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              매물 검색하기
            </button>
            <button className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-lg font-bold text-lg transition-all backdrop-blur-sm flex items-center justify-center gap-2">
              서비스 소개
            </button>
          </div>
          
          <div className="pt-8 flex items-center gap-8 border-t border-white/10 mt-8">
            <div>
              <p className="text-3xl font-bold text-white">15+</p>
              <p className="text-sm text-gray-400">Years Experience</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">2.5k+</p>
              <p className="text-sm text-gray-400">Properties Sold</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-sm text-gray-400">Client Satisfaction</p>
            </div>
          </div>
        </div>

        <div className="relative hidden md:block h-[600px] w-full animate-fade-in">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-80 h-96 bg-white/5 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl transform -rotate-6 z-20 p-6 flex flex-col justify-between">
              <div className="h-40 bg-gradient-to-br from-primary-700 to-primary-900 rounded-lg overflow-hidden relative">
                 <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                    <svg className="w-16 h-16 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                 </div>
              </div>
              <div>
                <div className="h-4 w-2/3 bg-white/20 rounded mb-2"></div>
                <div className="h-3 w-1/2 bg-white/10 rounded"></div>
              </div>
              <div className="flex justify-between items-center">
                 <div className="h-8 w-24 bg-gold-500/80 rounded flex items-center justify-center text-xs font-bold text-white">PREMIUM</div>
                 <div className="h-8 w-8 rounded-full bg-white/20"></div>
              </div>
            </div>

            <div className="absolute top-20 right-20 w-72 h-80 bg-primary-800/80 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl transform rotate-12 z-10"></div>
            
            <div className="absolute bottom-20 left-20 w-64 h-64 bg-gold-600/20 backdrop-blur-md border border-gold-500/30 rounded-2xl shadow-xl transform -rotate-12 z-0"></div>
            
            <div className="absolute top-1/4 left-10 p-3 bg-white rounded-lg shadow-lg animate-bounce z-30">
               <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-primary-900 font-bold text-xs">매매 완료</span>
               </div>
            </div>
            
            <div className="absolute bottom-1/3 right-10 p-4 bg-primary-900/90 text-white rounded-lg shadow-xl border border-white/10 z-30 transform hover:scale-105 transition-transform cursor-pointer">
               <p className="text-xs text-gray-400">최근 실거래가</p>
               <p className="font-bold text-gold-400">₩ 25.4 억</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
