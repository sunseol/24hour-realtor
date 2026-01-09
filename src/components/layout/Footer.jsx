import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';
import { useCompanyInfo } from '../../hooks';
import { navLinks } from '../../data/defaults';

export default function Footer() {
  const { data: companyInfo } = useCompanyInfo();

  return (
    <footer className="bg-slate-950 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-amber-500">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xl font-bold">{companyInfo.companyName}</span>
                <p className="text-xs text-slate-500">{companyInfo.companyNameEn}</p>
              </div>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              24시간 언제나 고객님의 곁에서<br />
              최고의 부동산 서비스를 제공합니다.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">바로가기</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.hash ? `/${link.hash}` : link.href} 
                    className="hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Contact</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="whitespace-pre-line">{companyInfo.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href={`tel:${companyInfo.phone}`} className="hover:text-amber-500 transition-colors">
                  {companyInfo.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-amber-500 flex-shrink-0" />
                <a href={`mailto:${companyInfo.email}`} className="hover:text-amber-500 transition-colors">
                  {companyInfo.email}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">운영시간</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li className="flex justify-between">
                <span>평일</span>
                <span className="text-white">{companyInfo.businessHours?.weekday || "09:00 - 20:00"}</span>
              </li>
              <li className="flex justify-between">
                <span>주말</span>
                <span className="text-white">{companyInfo.businessHours?.weekend || "10:00 - 18:00"}</span>
              </li>
              <li className="flex justify-between">
                <span className="text-amber-500 font-medium">24시간</span>
                <span className="text-white">{companyInfo.businessHours?.online || "온라인 상담"}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {companyInfo.companyName}. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/terms" className="text-slate-500 hover:text-white transition-colors">
              이용약관
            </Link>
            <Link to="/privacy" className="text-slate-500 hover:text-white transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
