import React from 'react';

const Stats = () => {
  const stats = [
    { label: "부동산 중개 경력", value: "15+", suffix: "년" },
    { label: "누적 거래 건수", value: "2,500+", suffix: "건" },
    { label: "고객 만족도", value: "98.5", suffix: "%" },
    { label: "전문 컨설턴트", value: "40+", suffix: "명" },
  ];

  return (
    <section className="bg-primary-900 text-white py-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          {stats.map((stat, index) => (
            <div key={index} className="text-center px-4 group hover:-translate-y-1 transition-transform duration-300">
              <p className="text-4xl md:text-5xl font-bold text-gold-400 mb-2 font-mono">
                {stat.value}<span className="text-2xl ml-1 text-gold-600">{stat.suffix}</span>
              </p>
              <p className="text-gray-300 font-medium text-sm md:text-base tracking-wide uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
