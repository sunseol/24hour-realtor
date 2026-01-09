import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Search } from 'lucide-react';
import Button from '../common/Button';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 }
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950">
        <motion.div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
            backgroundSize: '60px 60px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-8"
          >
            <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-amber-400 text-sm font-medium">24시간 항상 함께합니다</span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
          >
            밤낮없이 당신의 자산을<br />
            <span className="text-amber-500">지켜드립니다</span>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto"
          >
            전문 부동산 컨설턴트가 24시간 내편으로 최적의 부동산 솔루션을 찾아드립니다.
          </motion.p>

          <motion.div 
            variants={scaleIn}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl p-2 shadow-2xl max-w-2xl mx-auto"
          >
            <form className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-slate-100 rounded-xl">
                <MapPin className="w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="원하시는 지역을 입력하세요 (예: 강남구, 마포구)"
                  className="flex-1 bg-transparent outline-none text-slate-700 placeholder-slate-400"
                />
              </div>
              <Link to="/properties">
                <Button variant="primary" size="lg" icon={Search}>
                  검색하기
                </Button>
              </Link>
            </form>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex justify-center gap-12 mt-12 pt-8 border-t border-white/10"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-bold text-white">15년+</p>
              <p className="text-slate-400 text-sm">전문 경력</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-bold text-white">2,500+</p>
              <p className="text-slate-400 text-sm">거래 건수</p>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <p className="text-3xl font-bold text-white">98%</p>
              <p className="text-slate-400 text-sm">고객 만족도</p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
