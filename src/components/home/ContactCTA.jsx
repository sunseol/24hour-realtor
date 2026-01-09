import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, Mail } from 'lucide-react';
import { useCompanyInfo } from '../../hooks';
import Button from '../common/Button';

export default function ContactCTA() {
  const { data: companyInfo } = useCompanyInfo();

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div 
          className="bg-white/5 backdrop-blur-lg rounded-3xl p-10 md:p-16 border border-white/10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Phone className="w-8 h-8 text-white" />
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            무료 상담을 받아보세요
          </h2>
          <p className="text-slate-300 mb-8 max-w-xl mx-auto">
            전문가와의 1:1 상담을 통해 당신에게 맞는 최적의 부동산 솔루션을 찾아보세요.
            첫 상담은 무료입니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a 
              href={`tel:${companyInfo.phone}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="primary" size="lg" icon={Phone}>
                {companyInfo.phone}
              </Button>
            </motion.a>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link to="/contact">
                <Button variant="secondary" size="lg" icon={Mail}>
                  상담 신청하기
                </Button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
