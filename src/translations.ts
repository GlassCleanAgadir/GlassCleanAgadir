export type Language = 'ar' | 'fr' | 'en';

export const translations = {
  ar: {
    nav: {
      services: "خدماتنا",
      about: "من نحن",
      reviews: "آراء الزبناء",
      estimate: "تقدير الثمن",
      businessName: "خدمات تنظيف الزجاج",
      city: "أكادير"
    },
    hero: {
      badge: "أحسن خدمة تنظيف الزجاج في أكادير - 5 نجوم",
      title: "زجاج كيشعل فكل ركن من دارك أو شركتك",
      desc: "كنقدمو ليك خدمة احترافية لتنظيف الزجاج في كاع المناطق ديال أكادير والنواحي ديالها. جودة عالية وضمانة 100%.",
      ctaEstimate: "طلب تقدير بالمجان",
      ctaCall: "اتصل بنا دابا",
      ctaWhatsapp: "واتساب",
      ctaTitle: "مستعد ترجع زجاجك كيشعل؟",
      ctaDesc: "ما تضيعش الوقت، طلب تقدير الثمن دابا بالمجان وغادي نتصلو بيك فقل من 24 ساعة."
    },
    features: {
      title: "علاش تختارنا؟",
      items: [
        { title: "تقنيين محترفين", desc: "فريق مدرب على أعلى مستوى باش نضمنو ليك أحسن نتيجة." },
        { title: "ضمانة 5 نجوم", desc: "ما كنخرجوش حتى تكون راضي 100% على الخدمة." },
        { title: "مرخصين ومؤمنين", desc: "كنخدمو باحترافية وأمان باش تكون هاني." },
        { title: "تجربة سهلة", desc: "من الطلب حتى للتنفيذ، كلشي ساهل وسريع." },
        { title: "موثوقية تامة", desc: "كنحترمو المواعيد والوقت ديالك هو الأولويات ديالنا." }
      ]
    },
    services: {
      title: "خدماتنا",
      subtitle: "كنهتمو بجميع أنواع الزجاج والواجهات بأحدث التقنيات والمواد.",
      items: [
        { title: "تنظيف سكني", desc: "كنرجعو اللمعان لزجاج دارك، من الداخل ومن البرا." },
        { title: "تنظيف تجاري", desc: "خدمة احترافية للمكاتب، المحلات والواجهات التجارية." },
        { title: "تنظيف بعد البناء", desc: "إزالة بقايا الصباغة والسيليكون من الزجاج الجديد." },
        { title: "إزالة الكلكار", desc: "حلول فعالة للزجاج اللي فيه طراس ديال الماء القديم." },
        { title: "تنظيف الإطارات", desc: "ما كننساوش التفاصيل، كننظفو كلشي حتى الكوادر." },
        { title: "خطط صيانة", desc: "عروض شهرية أو سنوية باش يبقى زجاجك ديما كيشعل." }
      ]
    },
    reviews: {
      title: "آراء الزبناء",
      stats: "بناءً على أكثر من 100 زبون"
    },
    about: {
      title: "من نحن",
      p1: "خدمات تنظيف الزجاج هي الرائدة في مجال تنظيف الزجاج في أكادير. بدينا بهدف واحد: نقدمو أحسن خدمة لكل زبون.",
      p2: "كنخدمو بأحدث التقنيات العالمية وكنستعملو مواد صديقة للبيئة وفعالة بزاف.",
      experience: "سنوات من الخبرة",
      points: ["جودة مضمونة", "أثمنة تنافسية", "فريق محترف", "خدمة سريعة"]
    },
    serviceArea: {
      title: "فين كنخدمو؟",
      desc: "كنغطيو كاع المناطق ديال أكادير والنواحي ديالها. فين ما كنتي، نوصلو عندك بأحسن التجهيزات.",
      more: "وكاع النواحي..."
    },
    faq: {
      title: "أسئلة متكررة",
      subtitle: "كل ما بغيتي تعرف على الخدمات ديالنا",
      items: [
        { q: "فين كتقدمو الخدمات ديالكم؟", a: "كنغطيو كاع المناطق ديال أكادير والنواحي ديالها (تغازوت، إنزكان، آيت ملول، الدراركة، أورير، تيكيوين...)." },
        { q: "كيفاش نقدر نتواصل معاكم؟", a: "تقدر تتواصل معانا عبر الهاتف، واتساب، أو تعمر الاستمارة اللي فالموقع." },
        { q: "كيفاش كتحسبو الثمن؟", a: "الثمن كيتحدد على حساب عدد الزجاج، الحجم ديالو والحالة ديالو. طلب تقدير بالمجان." }
      ]
    },
    form: {
      title: "طلب تقدير الثمن",
      subtitle: "عمر المعلومات ديالك وغادي نتصلو بيك في أقرب وقت.",
      name: "الاسم الكامل",
      email: "البريد الإلكتروني",
      phone: "رقم الهاتف",
      service: "نوع الخدمة",
      address: "العنوان",
      message: "رسالة إضافية (اختياري)",
      placeholderName: "مثال: محمد أحمد",
      placeholderAddress: "مثال: حي السلام، أكادير",
      placeholderMessage: "أي تفاصيل أخرى بغيتي تقولها لنا...",
      submit: "إرسال الطلب",
      submitting: "جاري الإرسال...",
      successTitle: "تم الإرسال بنجاح!",
      successDesc: "شكراً لك، غادي نتصلو بيك قريباً.",
      options: {
        residential: "تنظيف سكني",
        commercial: "تنظيف تجاري",
        postConstruction: "بعد البناء"
      }
    },
    footer: {
      desc: "كنقدمو أحسن خدمة تنظيف الزجاج في منطقة أكادير الكبير. الجودة، الاحترافية والأمانة هي الشعار ديالنا.",
      quickLinks: "روابط سريعة",
      contactUs: "تواصل معانا",
      location: "أكادير، المغرب",
      rights: "جميع الحقوق محفوظة."
    }
  },
  fr: {
    nav: {
      services: "Services",
      about: "À Propos",
      reviews: "Avis",
      estimate: "Devis",
      businessName: "Services de Nettoyage de Vitres",
      city: "Agadir"
    },
    hero: {
      badge: "Meilleur service de nettoyage de vitres à Agadir - 5 Étoiles",
      title: "Des vitres éclatantes dans chaque coin de votre maison ou entreprise",
      desc: "Nous offrons un service professionnel de nettoyage de vitres dans toutes les zones d'Agadir et ses environs. Haute qualité et garantie 100%.",
      ctaEstimate: "Demander un devis gratuit",
      ctaCall: "Appelez-nous",
      ctaWhatsapp: "WhatsApp",
      ctaTitle: "Prêt à faire briller vos vitres ?",
      ctaDesc: "Ne perdez pas de temps, demandez votre devis gratuit maintenant et nous vous contacterons en moins de 24 heures."
    },
    features: {
      title: "Pourquoi nous choisir ?",
      items: [
        { title: "Techniciens Professionnels", desc: "Une équipe formée au plus haut niveau pour garantir le meilleur résultat." },
        { title: "Garantie 5 Étoiles", desc: "Nous ne partons pas tant que vous n'êtes pas 100% satisfait du service." },
        { title: "Agréés et Assurés", desc: "Nous travaillons avec professionnalisme et sécurité pour votre tranquillité d'esprit." },
        { title: "Expérience Facile", desc: "De la commande à l'exécution, tout est simple et rapide." },
        { title: "Fiabilité Totale", desc: "Nous respectons les rendez-vous et votre temps est notre priorité." }
      ]
    },
    services: {
      title: "Nos Services",
      subtitle: "Nous prenons soin de tous types de vitres et façades avec les dernières techniques et matériaux.",
      items: [
        { title: "Nettoyage Résidentiel", desc: "Nous redonnons de l'éclat à vos vitres, à l'intérieur comme à l'extérieur." },
        { title: "Nettoyage Commercial", desc: "Service professionnel pour bureaux, magasins et façades commerciales." },
        { title: "Nettoyage Après Construction", desc: "Élimination des résidus de peinture et de silicone sur les vitres neuves." },
        { title: "Élimination du Calcaire", desc: "Solutions efficaces pour les vitres présentant des traces d'eau anciennes." },
        { title: "Nettoyage des Cadres", desc: "Nous n'oublions pas les détails, nous nettoyons tout, même les cadres." },
        { title: "Plans d'Entretien", desc: "Offres mensuelles ou annuelles pour que vos vitres restent toujours propres." }
      ]
    },
    reviews: {
      title: "Avis Clients",
      stats: "Basé sur plus de 100 clients"
    },
    about: {
      title: "À Propos de Nous",
      p1: "Services de Nettoyage de Vitres est le leader du nettoyage de vitres à Agadir. Nous avons commencé avec un seul objectif : offrir le meilleur service à chaque client.",
      p2: "Nous travaillons avec les dernières technologies mondiales et utilisons des matériaux écologiques et très efficaces.",
      experience: "Années d'Expérience",
      points: ["Qualité Garantie", "Prix Compétitifs", "Équipe Professionnelle", "Service Rapide"]
    },
    serviceArea: {
      title: "Où travaillons-nous ?",
      desc: "Nous couvrons toutes les zones d'Agadir et ses environs. Où que vous soyez, nous viendrons avec le meilleur équipement.",
      more: "Et tous les environs..."
    },
    faq: {
      title: "Questions Fréquentes",
      subtitle: "Tout ce que vous devez savoir sur nos services",
      items: [
        { q: "Où proposez-vous vos services ?", a: "Nous couvrons toutes les zones d'Agadir et ses environs (Taghazout, Inezgane, Ait Melloul, Drarga, Aourir, Tikiouine...)." },
        { q: "Comment puis-je vous contacter ?", a: "Vous pouvez nous contacter par téléphone, WhatsApp, ou remplir le formulaire sur le site." },
        { q: "Comment calculez-vous le prix ?", a: "Le prix est déterminé en fonction du nombre de vitres, de leur taille et de leur état. Demandez un devis gratuit." }
      ]
    },
    form: {
      title: "Demande de Devis",
      subtitle: "Remplissez vos informations et nous vous contacterons dès que possible.",
      name: "Nom Complet",
      email: "Email",
      phone: "Numéro de Téléphone",
      service: "Type de Service",
      address: "Adresse",
      message: "Message Additionnel (Optionnel)",
      placeholderName: "Ex: Jean Dupont",
      placeholderAddress: "Ex: Cité Salam, Agadir",
      placeholderMessage: "Détails supplémentaires...",
      submit: "Envoyer la Demande",
      submitting: "Envoi en cours...",
      successTitle: "Envoyé avec succès !",
      successDesc: "Merci, nous vous contacterons bientôt.",
      options: {
        residential: "Nettoyage Résidentiel",
        commercial: "Nettoyage Commercial",
        postConstruction: "Après Construction"
      }
    },
    footer: {
      desc: "Nous offrons le meilleur service de nettoyage de vitres dans la région du Grand Agadir. Qualité, professionnalisme et honnêteté sont notre devise.",
      quickLinks: "Liens Rapides",
      contactUs: "Contactez-nous",
      location: "Agadir, Maroc",
      rights: "Tous droits réservés."
    }
  },
  en: {
    nav: {
      services: "Services",
      about: "About Us",
      reviews: "Reviews",
      estimate: "Estimate",
      businessName: "Window Cleaning Services",
      city: "Agadir"
    },
    hero: {
      badge: "Best window cleaning service in Agadir - 5 Stars",
      title: "Sparkling glass in every corner of your home or business",
      desc: "We provide professional window cleaning services in all areas of Agadir and its surroundings. High quality and 100% guarantee.",
      ctaEstimate: "Request Free Estimate",
      ctaCall: "Call Us Now",
      ctaWhatsapp: "WhatsApp",
      ctaTitle: "Ready to make your windows shine?",
      ctaDesc: "Don't waste time, request your free estimate now and we'll contact you in less than 24 hours."
    },
    features: {
      title: "Why Choose Us?",
      items: [
        { title: "Professional Technicians", desc: "A team trained to the highest level to ensure the best results." },
        { title: "5-Star Guarantee", desc: "We don't leave until you are 100% satisfied with the service." },
        { title: "Licensed and Insured", desc: "We work with professionalism and safety for your peace of mind." },
        { title: "Easy Experience", desc: "From order to execution, everything is simple and fast." },
        { title: "Total Reliability", desc: "We respect appointments and your time is our priority." }
      ]
    },
    services: {
      title: "Our Services",
      subtitle: "We take care of all types of glass and facades with the latest techniques and materials.",
      items: [
        { title: "Residential Cleaning", desc: "We bring sparkle back to your home's glass, inside and out." },
        { title: "Commercial Cleaning", desc: "Professional service for offices, shops, and commercial facades." },
        { title: "Post-Construction Cleaning", desc: "Removal of paint and silicone residues from new glass." },
        { title: "Limescale Removal", desc: "Effective solutions for glass with old water marks." },
        { title: "Frame Cleaning", desc: "We don't forget the details, we clean everything, even the frames." },
        { title: "Maintenance Plans", desc: "Monthly or yearly offers so your glass always stays clean." }
      ]
    },
    reviews: {
      title: "Customer Reviews",
      stats: "Based on more than 100 customers"
    },
    about: {
      title: "About Us",
      p1: "Window Cleaning Services is the leader in window cleaning in Agadir. We started with one goal: to provide the best service to every customer.",
      p2: "We work with the latest global technologies and use eco-friendly and highly effective materials.",
      experience: "Years of Experience",
      points: ["Guaranteed Quality", "Competitive Prices", "Professional Team", "Fast Service"]
    },
    serviceArea: {
      title: "Where Do We Work?",
      desc: "We cover all areas of Agadir and its surroundings. Wherever you are, we will reach you with the best equipment.",
      more: "And all surroundings..."
    },
    faq: {
      title: "FAQ",
      subtitle: "Everything you need to know about our services",
      items: [
        { q: "Where do you offer your services?", a: "We cover all areas of Agadir and its surroundings (Taghazout, Inezgane, Ait Melloul, Drarga, Aourir, Tikiouine...)." },
        { q: "How can I contact you?", a: "You can contact us via phone, WhatsApp, or fill out the form on the website." },
        { q: "How do you calculate the price?", a: "The price is determined based on the number of windows, their size, and condition. Request a free estimate." }
      ]
    },
    form: {
      title: "Price Estimate Request",
      subtitle: "Fill in your information and we will contact you as soon as possible.",
      name: "Full Name",
      email: "Email",
      phone: "Phone Number",
      service: "Service Type",
      address: "Address",
      message: "Additional Message (Optional)",
      placeholderName: "Ex: John Doe",
      placeholderAddress: "Ex: Cité Salam, Agadir",
      placeholderMessage: "Any other details you'd like to tell us...",
      submit: "Send Request",
      submitting: "Sending...",
      successTitle: "Sent Successfully!",
      successDesc: "Thank you, we will contact you soon.",
      options: {
        residential: "Residential Cleaning",
        commercial: "Commercial Cleaning",
        postConstruction: "Post-Construction Cleaning"
      }
    },
    footer: {
      desc: "We provide the best window cleaning service in the Greater Agadir area. Quality, professionalism, and honesty are our motto.",
      quickLinks: "Quick Links",
      contactUs: "Contact Us",
      location: "Agadir, Morocco",
      rights: "All rights reserved."
    }
  }
};
