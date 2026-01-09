import React from 'react';
import { motion } from 'framer-motion';
import { Home, Building2, TrendingUp, Shield } from 'lucide-react';
import { useServices } from '../../hooks';
import { Card } from '../common';

const iconMap = {
  home: Home,
  building: Building2,
  trending: TrendingUp,
  shield: Shield,
};

function ServiceIcon({ service, index }) {
  if (service.icon && typeof service.icon === 'string' && service.icon.startsWith('http')) {
    return (
      <img
        src={service.icon}
        alt={service.title}
        className="w-8 h-8"
        onError={(e) => {
          e.target.style.display = 'none';
        }}
      />
    );
  }

  const iconType = service.iconType || ['home', 'building', 'trending', 'shield'][index % 4];
  const IconComponent = iconMap[iconType] || Home;
  return <IconComponent className="w-8 h-8" />;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function Services() {
  const { data: services } = useServices();

  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
            Our Services
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
            완벽한 부동산 서비스
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            고객님의 다양한 니즈에 맞춘 전문적이고 체계적인 서비스를 제공합니다.
          </p>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <motion.div key={service._id || index} variants={itemVariants}>
              <Card hover className="group h-full">
                <motion.div 
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.colorClass || 'from-blue-600 to-blue-800'} flex items-center justify-center text-white mb-6`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ServiceIcon service={service} index={index} />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{service.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
