import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import emailjs from '@emailjs/browser';
import { 
  Mail, Phone, Send, Loader2, 
  CheckCircle, User, Globe, Users, PenTool, MessageSquare, AlertCircle 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { client, writeClient } from "../sanityClient";

import "./contacts.css";

export default function Contact() {
  const form = useRef();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [touched, setTouched] = useState({}); // Track which fields user has clicked
  const [tours, setTours] = useState([]);

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    tour_interest: "custom",
    contact_method: "Email", 
    guests: "",
    message: ""
  });

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const query = `*[_type == "tour"] { _id, title } | order(title asc)`;
        const data = await client.fetch(query);
        setTours(data || []);
      } catch (err) { console.error(err); }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    if (location.state?.tour) {
      setFormData(prev => ({ ...prev, tour_interest: location.state.tour }));
    }
    window.scrollTo(0, 0);
  }, [location]);

  const validateField = (name, value) => {
    switch (name) {
      case 'user_name':
        return value.trim().length < 2 ? "Name is too short" : "";
      case 'user_email':
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case 'user_phone':
        return value.trim().length < 8 ? "Phone number required" : "";
      case 'guests':
        return !value || Number(value) < 1 ? "Min 1 guest" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setFormErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const isFormValid = 
    Object.values(formErrors).every(err => err === "") &&
    formData.user_name && formData.user_email && formData.user_phone && formData.guests;

  const progress = (Object.values(formData).filter(v => String(v).trim() !== "").length / 7) * 100;

  const sendInquiry = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      // Mark all as touched to show errors if they try to submit early
      const allTouched = Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {});
      setTouched(allTouched);
      return;
    }
    setIsSubmitting(true);
    try {
      await emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      await writeClient.create({
        _type: 'contactInquiry',
        userName: formData.user_name,
        userEmail: formData.user_email,
        userPhone: formData.user_phone,
        tourInterest: formData.tour_interest,
        preferredContact: formData.contact_method, 
        guests: parseInt(formData.guests) || 1,
        message: formData.message,
        createdAt: new Date().toISOString(),
      });
      setIsSubmitting(false);
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  // Beautiful Error Component
  const ErrorLabel = ({ name, label, Icon }) => (
    <div className="flex justify-between items-center mb-1 px-1">
      <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2">
        <Icon size={14}/> {label}
      </label>
      <AnimatePresence>
        {touched[name] && formErrors[name] && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            className="text-[10px] text-red-400 font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <AlertCircle size={10} /> {formErrors[name]}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );

  if (submitted) {
    return (
      <div className="contact-viewport">
        <Helmet><title>Success | Ethiopia Expeditions</title></Helmet>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="contact-card success-card text-center max-w-2xl mx-auto py-20">
          <CheckCircle size={80} className="mx-auto text-[#fbbf24] mb-6" />
          <h1 className="text-3xl font-bold">Your <span className="highlight">Journey</span> Begins!</h1>
          <button onClick={() => setSubmitted(false)} className="submit-btn mt-8 px-8 py-4 bg-[#fbbf24] text-[#020617] font-bold rounded-xl">New Inquiry</button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="contact-viewport">
      <Helmet><title>Contact | Travel Ethiopia</title></Helmet>
      
      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/5 z-[10001]">
        <motion.div animate={{ width: `${progress}%` }} className="h-full bg-[#fbbf24] shadow-[0_0_15px_#fbbf24]" />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="contact-card max-w-4xl mx-auto py-20 px-4">
        <header className="text-center mb-12">
          <span className="text-[#fbbf24] uppercase tracking-[0.3em] text-[0.65rem] font-black">Get in Touch</span>
          <h1 className="text-4xl md:text-6xl font-black mt-4">Craft Your <span className="highlight">Legacy</span></h1>
        </header>

        <form ref={form} onSubmit={sendInquiry} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <ErrorLabel name="user_name" label="Name" Icon={User} />
              <input 
                type="text" name="user_name" 
                value={formData.user_name} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                placeholder="Full Name" 
                className={`premium-input ${touched.user_name && formErrors.user_name ? 'border-red-500/50 bg-red-500/5' : ''}`}
              />
            </div>
            <div className="relative">
              <ErrorLabel name="user_email" label="Email" Icon={Mail} />
              <input 
                type="email" name="user_email" 
                value={formData.user_email} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                placeholder="hello@world.com" 
                className={`premium-input ${touched.user_email && formErrors.user_email ? 'border-red-500/50 bg-red-500/5' : ''}`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative">
              <ErrorLabel name="user_phone" label="WhatsApp" Icon={Phone} />
              <input 
                type="tel" name="user_phone" 
                value={formData.user_phone} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                placeholder="+..." 
                className={`premium-input ${touched.user_phone && formErrors.user_phone ? 'border-red-500/50 bg-red-500/5' : ''}`}
              />
            </div>
            <div className="relative">
              <ErrorLabel name="tour_interest" label="Interested In" Icon={Globe} />
              <select name="tour_interest" value={formData.tour_interest} onChange={handleInputChange} className="premium-input w-full">
                <option value="custom" className="bg-black">Custom Expedition</option>
                {tours.map(t => <option key={t._id} value={t.title} className="bg-black">{t.title}</option>)}
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-5 bg-white/5 rounded-2xl border border-white/10">
            <label className="text-xs uppercase text-[#fbbf24] font-bold">Preferred Contact Method</label>
            <div className="flex flex-wrap gap-6">
              {['Email', 'WhatsApp', 'Phone Call'].map((method) => (
                <label key={method} className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input type="radio" name="contact_method" value={method} checked={formData.contact_method === method} onChange={handleInputChange} className="accent-[#fbbf24]" />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-1">
              <ErrorLabel name="guests" label="Guests" Icon={Users} />
              <input 
                type="number" name="guests" 
                value={formData.guests} 
                onChange={handleInputChange} 
                onBlur={handleBlur}
                className={`premium-input ${touched.guests && formErrors.guests ? 'border-red-500/50 bg-red-500/5' : ''}`} 
                min="1" 
              />
            </div>
            <div className="md:col-span-3">
              <label className="text-xs uppercase text-[#fbbf24] font-bold flex items-center gap-2 mb-1 px-1"><PenTool size={14}/> Message</label>
              <textarea name="message" value={formData.message} rows={3} onChange={handleInputChange} className="premium-input resize-none" placeholder="Dates or special requirements..."></textarea>
            </div>
          </div>

          <motion.button
            whileHover={isFormValid ? { scale: 1.01 } : { x: [0, -5, 5, -5, 5, 0] }}
            transition={{ duration: 0.4 }}
            type="submit"
            disabled={isSubmitting}
            className="submit-btn w-full py-6 rounded-xl font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3"
            style={{
              background: isFormValid ? '#fbbf24' : '#1f2937',
              color: isFormValid ? '#020617' : '#4b5563',
              cursor: isFormValid ? 'pointer' : 'not-allowed'
            }}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : <><Send size={18} /> Send Expedition Request</>}
          </motion.button>
        </form>
      </motion.div>

      <motion.a href="https://wa.me/251911223344" target="_blank" rel="noreferrer" className="whatsapp-float fixed bottom-7 right-7 bg-[#25D366] p-4 rounded-full shadow-lg z-50 text-white">
        <MessageSquare size={24} />
      </motion.a>
    </div>
  );
}