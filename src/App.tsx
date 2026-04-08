/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Phone, 
  User, 
  Star, 
  CheckCircle, 
  MapPin, 
  Clock, 
  Shield, 
  Menu, 
  X, 
  MessageSquare,
  Send,
  ChevronRight,
  Instagram,
  Facebook,
  Mail,
  MessageCircle,
  ChevronDown
} from 'lucide-react';
import { db, OperationType, handleFirestoreError } from './firebase';
import { collection, addDoc, serverTimestamp, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { cn } from './utils';
import { askGemini } from './services/geminiService';
import ReactMarkdown from 'react-markdown';
import { translations, Language } from './translations';

// --- Components ---

const Navbar = ({ 
  onOpenEstimate, 
  lang, 
  setLang 
}: { 
  onOpenEstimate: () => void, 
  lang: Language, 
  setLang: (l: Language) => void 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const t = translations[lang].nav;

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'ar', label: 'العربية', flag: '🇲🇦' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <div className="flex flex-col">
              <span className="text-blue-900 font-bold text-lg leading-tight">{t.businessName}</span>
              <span className="text-blue-600 font-medium text-sm tracking-widest uppercase">{t.city}</span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t.services}</a>
            <a href="#about" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t.about}</a>
            <a href="#reviews" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">{t.reviews}</a>
            
            <div className="flex items-center gap-4 ml-4">
              {/* Language Switcher */}
              <div className="relative">
                <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <span>{languages.find(l => l.code === lang)?.flag}</span>
                  <ChevronDown size={14} className={cn("transition-transform", isLangOpen && "rotate-180")} />
                </button>
                
                <AnimatePresence>
                  {isLangOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full mt-2 right-0 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[140px]"
                    >
                      {languages.map((l) => (
                        <button
                          key={l.code}
                          onClick={() => {
                            setLang(l.code);
                            setIsLangOpen(false);
                          }}
                          className={cn(
                            "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center gap-3",
                            lang === l.code ? "text-blue-600 bg-blue-50/50 font-bold" : "text-gray-700",
                            lang === 'ar' ? "text-right flex-row-reverse" : "text-left"
                          )}
                        >
                          <span>{l.flag}</span>
                          <span>{l.label}</span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <a href="tel:+212770621868" className="flex items-center gap-2 text-blue-600 font-bold">
                <Phone size={18} />
                <span dir="ltr">+212 770-621868</span>
              </a>
              <button 
                onClick={onOpenEstimate}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
              >
                {t.estimate}
              </button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Language Switcher Mobile */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium"
              >
                <span>{languages.find(l => l.code === lang)?.flag}</span>
              </button>
              
              <AnimatePresence>
                {isLangOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full mt-2 right-0 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden min-w-[140px]"
                  >
                    {languages.map((l) => (
                      <button
                        key={l.code}
                        onClick={() => {
                          setLang(l.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors flex items-center gap-3",
                          lang === l.code ? "text-blue-600 bg-blue-50/50 font-bold" : "text-gray-700",
                          lang === 'ar' ? "text-right flex-row-reverse" : "text-left"
                        )}
                      >
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <button className="text-gray-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-b border-gray-100 px-4 py-6 flex flex-col gap-4 shadow-xl"
          >
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">{t.services}</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">{t.about}</a>
            <a href="#reviews" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium text-gray-800">{t.reviews}</a>
            <hr className="border-gray-100" />
            <div className="flex flex-col gap-4">
              <a href="tel:+212770621868" className="flex items-center gap-2 text-blue-600 font-bold text-lg">
                <Phone size={20} />
                <span dir="ltr">+212 770-621868</span>
              </a>
              <button 
                onClick={() => { onOpenEstimate(); setIsMenuOpen(false); }}
                className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg"
              >
                {t.estimate}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenEstimate, lang }: { onOpenEstimate: () => void, lang: Language }) => {
  const t = translations[lang].hero;
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1613665813446-82a78c468a1d?auto=format&fit=crop&q=80&w=2000" 
          alt="Clean Windows" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/80 via-white/40 to-white"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-bold text-sm mb-6">
              <Star size={16} fill="currentColor" />
              {t.badge}
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-blue-950 mb-8 leading-tight">
              {lang === 'ar' ? (
                <>
                  زجاج كيشعل <span className="text-blue-600">فكل ركن</span> من دارك أو شركتك
                </>
              ) : t.title}
            </h1>
            <p className="text-xl text-gray-600 mb-10 leading-relaxed max-w-2xl mx-auto">
              {t.desc}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={onOpenEstimate}
                className="w-full sm:w-auto bg-blue-600 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 flex items-center justify-center gap-2"
              >
                {t.ctaEstimate}
                <ChevronRight size={24} className={cn(lang === 'ar' ? "rotate-180" : "")} />
              </button>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <a 
                  href="tel:+212770621868"
                  className="w-full sm:w-auto bg-white text-blue-900 border-2 border-blue-100 px-10 py-5 rounded-2xl font-bold text-xl hover:border-blue-600 transition-all flex items-center justify-center gap-2"
                >
                  <Phone size={24} />
                  {t.ctaCall}
                </a>
                <a 
                  href="https://wa.me/212770621868" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto bg-green-500 text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-green-100"
                >
                  <MessageCircle size={24} />
                  {t.ctaWhatsapp}
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Features = ({ lang }: { lang: Language }) => {
  const t = translations[lang].features;
  const icons = [
    <User className="text-blue-600" />,
    <Star className="text-blue-600" fill="currentColor" />,
    <Shield className="text-blue-600" />,
    <CheckCircle className="text-blue-600" />,
    <Clock className="text-blue-600" />
  ];

  return (
    <section className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue-950 mb-4">{t.title}</h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {t.items.map((f, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-blue-50 border border-blue-100 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-6">
                {React.cloneElement(icons[i] as React.ReactElement, { size: 32 } as any)}
              </div>
              <h3 className="text-xl font-bold text-blue-900 mb-3">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Services = ({ lang }: { lang: Language }) => {
  const t = translations[lang].services;
  const images = [
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581578731548-c64695cc6958?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1528740561666-dc2479dc08ab?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1521791136064-7986c2959213?auto=format&fit=crop&q=80&w=800"
  ];

  return (
    <section id="services" className="py-24 bg-gray-50">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue-950 mb-4">{t.title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{t.subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.items.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all border border-gray-100"
            >
              <div className="h-64 overflow-hidden relative">
                <img 
                  src={images[i]} 
                  alt={s.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-blue-900/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-blue-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Reviews = ({ lang }: { lang: Language }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const t = translations[lang].reviews;

  useEffect(() => {
    const q = query(collection(db, 'reviews'), orderBy('date', 'desc'), limit(10));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setReviews(docs);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    });
    return () => unsubscribe();
  }, []);

  const defaultReviews = [
    { authorName: lang === 'ar' ? "عمر من أكادير" : (lang === 'fr' ? "Omar d'Agadir" : "Omar from Agadir"), rating: 5, comment: lang === 'ar' ? "خدمة رائعة جداً، الزجاج رجع كيشعل بحال يلا جديد. تبارك الله عليكم." : (lang === 'fr' ? "Service fantastique, les vitres brillent comme neuves. Merci beaucoup." : "Fantastic service, the windows shine like new. Thank you very much."), date: { seconds: Date.now() / 1000 } },
    { authorName: lang === 'ar' ? "ليلى من تغازوت" : (lang === 'fr' ? "Layla de Taghazout" : "Layla from Taghazout"), rating: 5, comment: lang === 'ar' ? "الدراري محترفين بزاف وجاو فالوقت. شكراً بزاف على الخدمة المتقنة." : (lang === 'fr' ? "Très professionnels et ponctuels. Merci pour l'excellent travail." : "Very professional and on time. Thanks for the excellent work."), date: { seconds: Date.now() / 1000 } },
    { authorName: lang === 'ar' ? "ياسين من إنزكان" : (lang === 'fr' ? "Yassine d'Inezgane" : "Yassine from Inezgane"), rating: 5, comment: lang === 'ar' ? "أحسن شركة تنظيف تعاملت معاها فالمغرب. جودة عالية وثمن مناسب." : (lang === 'fr' ? "Meilleure entreprise de nettoyage au Maroc. Haute qualité et bon prix." : "Best cleaning company in Morocco. High quality and good price."), date: { seconds: Date.now() / 1000 } },
  ];

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  useEffect(() => {
    if (displayReviews.length <= 1) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % displayReviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [displayReviews.length, currentIndex]); // Added currentIndex to reset timer on manual swipe

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + displayReviews.length) % displayReviews.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0
    })
  };

  return (
    <section id="reviews" className="py-24 bg-white overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue-950 mb-4">{t.title}</h2>
          <div className="flex items-center justify-center gap-1 text-yellow-400 mb-2">
            {[...Array(5)].map((_, i) => <Star key={i} size={24} fill="currentColor" />)}
          </div>
          <p className="text-blue-600 font-bold">{t.stats}</p>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4">
          <div className="relative h-[400px] sm:h-[350px] flex items-center justify-center">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) > 50;
                  if (swipe) {
                    paginate(offset.x > 0 ? -1 : 1);
                  }
                }}
                className="absolute w-full"
              >
                <div className="p-8 sm:p-12 rounded-[3rem] bg-blue-50 border border-blue-100 shadow-sm text-center">
                  <div className="flex justify-center gap-1 text-yellow-400 mb-6">
                    {[...Array(displayReviews[currentIndex].rating)].map((_, i) => (
                      <Star key={i} size={24} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xl sm:text-2xl text-gray-700 italic mb-10 leading-relaxed">
                    "{displayReviews[currentIndex].comment}"
                  </p>
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-2xl shadow-sm border border-blue-100">
                      {displayReviews[currentIndex].authorName[0]}
                    </div>
                    <span className="font-bold text-blue-900 text-xl">
                      {displayReviews[currentIndex].authorName}
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex justify-center gap-3 mt-8">
            {displayReviews.map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={cn(
                  "w-3 h-3 rounded-full transition-all duration-300",
                  currentIndex === i ? "bg-blue-600 w-10" : "bg-blue-200 hover:bg-blue-300"
                )}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

const EstimateForm = ({ onSuccess, lang }: { onSuccess?: () => void, lang: Language }) => {
  const t = translations[lang].form;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    serviceType: 'Residential',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, 'estimates'), {
        ...formData,
        status: 'Pending',
        createdAt: serverTimestamp()
      });
      setIsSuccess(true);
      onSuccess?.();
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ name: '', email: '', phone: '', address: '', serviceType: 'Residential', message: '' });
      }, 5000);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'estimates');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={48} />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{t.successTitle}</h3>
        <p className="text-gray-600">{t.successDesc}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700">{t.name}</label>
        <input 
          required
          type="text" 
          value={formData.name}
          onChange={e => setFormData({...formData, name: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder={t.placeholderName}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700">{t.email}</label>
        <input 
          required
          type="email" 
          value={formData.email}
          onChange={e => setFormData({...formData, email: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="email@example.com"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700">{t.phone}</label>
        <input 
          required
          type="tel" 
          value={formData.phone}
          onChange={e => setFormData({...formData, phone: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder="06 00 00 00 00"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="font-bold text-gray-700">{t.service}</label>
        <select 
          value={formData.serviceType}
          onChange={e => setFormData({...formData, serviceType: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
        >
          <option value="Residential">{t.options.residential}</option>
          <option value="Commercial">{t.options.commercial}</option>
          <option value="Post Construction">{t.options.postConstruction}</option>
        </select>
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-bold text-gray-700">{t.address}</label>
        <input 
          required
          type="text" 
          value={formData.address}
          onChange={e => setFormData({...formData, address: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
          placeholder={t.placeholderAddress}
        />
      </div>
      <div className="flex flex-col gap-2 md:col-span-2">
        <label className="font-bold text-gray-700">{t.message}</label>
        <textarea 
          value={formData.message}
          onChange={e => setFormData({...formData, message: e.target.value})}
          className="p-4 rounded-xl border border-gray-200 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 outline-none transition-all h-32"
          placeholder={t.placeholderMessage}
        ></textarea>
      </div>
      <button 
        disabled={isSubmitting}
        className="md:col-span-2 bg-blue-600 text-white py-5 rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 disabled:opacity-50"
      >
        {isSubmitting ? t.submitting : t.submit}
      </button>
    </form>
  );
};

const EstimateModal = ({ isOpen, onClose, lang }: { isOpen: boolean, onClose: () => void, lang: Language }) => {
  const t = translations[lang].form;
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-blue-950/60 backdrop-blur-sm"
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl relative z-10 overflow-hidden"
          >
            <div className="bg-blue-600 p-8 text-white">
              <button onClick={onClose} className="absolute top-6 right-6 text-white/80 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
              <p className="text-blue-100">{t.subtitle}</p>
            </div>

            <div className="p-8">
              <EstimateForm lang={lang} onSuccess={() => setTimeout(onClose, 2000)} />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const FAQ = ({ lang }: { lang: Language }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const t = translations[lang].faq;

  return (
    <section className="py-24 bg-white">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-blue-950 mb-4">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <div className="space-y-4">
          {t.items.map((faq, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
              <button 
                onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                className={cn(
                  "w-full p-6 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors",
                  lang === 'ar' ? "text-right" : "text-left"
                )}
              >
                <span className="font-bold text-lg text-blue-900">{faq.q}</span>
                <motion.div
                  animate={{ rotate: activeIndex === i ? 180 : 0 }}
                  className="text-blue-600"
                >
                  <ChevronDown size={24} />
                </motion.div>
              </button>
              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="bg-blue-50/50"
                  >
                    <div className="p-6 text-gray-700 leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Footer = ({ lang }: { lang: Language }) => {
  const t = translations[lang].footer;
  const navT = translations[lang].nav;
  return (
    <footer className="bg-blue-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <span className="text-2xl font-bold">{navT.businessName}</span>
            </div>
            <p className="text-blue-100/60 max-w-md leading-relaxed mb-8">
              {t.desc}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://www.facebook.com/share/1HvJwLZnAz/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://wa.me/212770621868" target="_blank" rel="noopener noreferrer" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-green-500 transition-colors">
                <MessageCircle size={24} />
              </a>
              <a href="mailto:glassclean.agadir@gmail.com" className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Mail size={24} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-bold mb-6">{t.quickLinks}</h4>
            <ul className="flex flex-col gap-4 text-blue-100/60">
              <li><a href="#services" className="hover:text-white transition-colors">{navT.services}</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">{navT.about}</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">{navT.reviews}</a></li>
              <li><a href="#" className="hover:text-white transition-colors">{translations[lang].faq.title}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6">{t.contactUs}</h4>
            <ul className="flex flex-col gap-4 text-blue-100/60">
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-blue-500" />
                <span dir="ltr">+212 770-621868</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={20} className="text-blue-500" />
                <span>glassclean.agadir@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={20} className="text-blue-500" />
                <span>{t.location}</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10 text-center text-blue-100/40 text-sm">
          <p>© {new Date().getFullYear()} {navT.businessName} {navT.city}. {t.rights}</p>
        </div>
      </div>
    </footer>
  );
};

const WhatsAppButton = () => {
  return (
    <a 
      href="https://wa.me/212770621868" 
      target="_blank" 
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-[90] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform"
    >
      <MessageCircle size={32} />
    </a>
  );
};

// --- Main App ---

export default function App() {
  const [isEstimateOpen, setIsEstimateOpen] = useState(false);
  const [lang, setLang] = useState<Language>('ar');

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900" dir={lang === 'ar' ? "rtl" : "ltr"}>
      <Navbar lang={lang} setLang={setLang} onOpenEstimate={() => setIsEstimateOpen(true)} />
      
      <main>
        <Hero lang={lang} onOpenEstimate={() => setIsEstimateOpen(true)} />
        
        {/* About Section */}
        <section id="about" className="py-24 bg-white overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className={cn(
              "flex flex-col lg:flex-row items-center gap-16",
              lang === 'ar' ? "" : "lg:flex-row-reverse"
            )}>
              <div className="flex-1 relative">
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50"></div>
                <img 
                  src="header.jpg" 
                  alt="تنظيف الزجاج باحترافية" 
                  className="rounded-[3rem] shadow-2xl relative z-10 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className={cn(
                  "absolute -bottom-6 md:-bottom-8 bg-white p-4 md:p-8 rounded-2xl md:rounded-3xl shadow-xl z-20",
                  lang === 'ar' ? "-left-4 md:-left-8" : "-right-4 md:-right-8"
                )}>
                  <div className="text-4xl font-extrabold text-blue-600 mb-1">10+</div>
                  <div className="text-gray-600 font-bold">{translations[lang].about.experience}</div>
                </div>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl lg:text-5xl font-bold text-blue-950 mb-8 leading-tight">{translations[lang].about.title}</h2>
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  {translations[lang].about.p1}
                </p>
                <p className="text-xl text-gray-600 mb-10 leading-relaxed">
                  {translations[lang].about.p2}
                </p>
                <div className="grid grid-cols-2 gap-6 mb-10">
                  {translations[lang].about.points.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle className="text-green-500" />
                      <span className="font-bold text-blue-900">{p}</span>
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => setIsEstimateOpen(true)}
                  className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  {translations[lang].hero.ctaEstimate}
                </button>
              </div>
            </div>
          </motion.div>
        </section>

        <Features lang={lang} />
        <Services lang={lang} />
        
        {/* Service Area Section */}
        <section className="py-16 bg-blue-900 text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
          >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="flex-1">
                <h2 className="text-3xl lg:text-5xl font-bold mb-6">{translations[lang].serviceArea.title}</h2>
                <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                  {translations[lang].serviceArea.desc}
                </p>
                <div className="flex flex-wrap gap-3">
                  {["أكادير", "تغازوت", "إنزكان", "آيت ملول", "الدراركة", "أورير", "تيكيوين", "بنسركاو", "حي السلام", "الهدى"].map((area, i) => (
                    <span key={i} className="px-4 py-2 bg-white/10 rounded-full border border-white/20 text-sm font-bold">
                      {area}
                    </span>
                  ))}
                  <span className="px-4 py-2 bg-blue-600 rounded-full text-sm font-bold">
                    {translations[lang].serviceArea.more}
                  </span>
                </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-64 h-64 sm:w-80 sm:h-80 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl border-8 border-white/10">
                    <MapPin size={100} className="text-white animate-bounce" />
                  </div>
                  <div className={cn(
                    "absolute bg-white text-blue-900 px-6 py-3 rounded-2xl font-bold shadow-xl rotate-12",
                    lang === 'ar' ? "-top-4 -right-4" : "-top-4 -left-4"
                  )}>
                    {translations[lang].nav.city}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Reviews lang={lang} />
        <FAQ lang={lang} />

        {/* Embedded Estimate Form Section */}
        <section className="py-24 bg-gray-50">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-gray-100">
              <div className="bg-blue-600 p-10 text-white text-center">
                <h2 className="text-4xl font-bold mb-4">{translations[lang].form.title}</h2>
                <p className="text-blue-100 text-lg">{translations[lang].form.subtitle}</p>
              </div>
              <div className="p-10">
                <EstimateForm lang={lang} />
              </div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-blue-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent scale-150"></div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
          >
            <h2 className="text-3xl lg:text-6xl font-extrabold text-white mb-8 leading-tight">{translations[lang].hero.ctaTitle}</h2>
            <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
              {translations[lang].hero.ctaDesc}
            </p>
            <button 
              onClick={() => setIsEstimateOpen(true)}
              className="bg-white text-blue-600 px-12 py-6 rounded-2xl font-bold text-2xl hover:bg-blue-50 transition-all shadow-2xl"
            >
              {translations[lang].hero.ctaEstimate}
            </button>
          </motion.div>
        </section>
      </main>

      <Footer lang={lang} />
      <EstimateModal lang={lang} isOpen={isEstimateOpen} onClose={() => setIsEstimateOpen(false)} />
      <WhatsAppButton />
    </div>
  );
}
