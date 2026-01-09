import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useListings } from '../../hooks';
import PropertyCard from '../property/PropertyCard';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

export default function FeaturedProperties() {
  const { data: listings } = useListings();
  const featuredListings = listings.slice(0, 3);

  return (
    <section id="listings" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className="text-amber-600 font-semibold text-sm uppercase tracking-wider">
              Featured Properties
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-2">
              추천 매물
            </h2>
            <p className="text-slate-600">전문가가 엄선한 프리미엄 매물입니다.</p>
          </div>
          <motion.div
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link 
              to="/properties"
              className="inline-flex items-center gap-2 text-slate-700 font-medium hover:text-amber-600 transition-colors group"
            >
              전체 매물 보기
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {featuredListings.map((listing) => (
            <motion.div key={listing._id} variants={itemVariants}>
              <PropertyCard listing={listing} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
