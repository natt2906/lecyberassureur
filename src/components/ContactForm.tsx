import { useState } from 'react';
import { Send, Shield, CheckCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    phone: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (submitted) {
    return (
      <section id="contact-form" className="bg-slate-950 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border-2 border-cyan-400/50 rounded-2xl p-12 text-center">
            <CheckCircle className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h3 className="text-3xl font-bold text-white mb-4">Merci pour votre demande</h3>
            <p className="text-xl text-gray-300">
              Un expert en assurance cyber vous contactera sous 24 heures pour évaluer votre exposition et discuter de vos options de couverture.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact-form" className="bg-slate-950 py-20 lg:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center space-x-2 text-cyan-400 mb-6">
            <Shield className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wider uppercase">Protégez-vous dès aujourd'hui</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Recevez votre analyse de risque cyber
          </h2>
          <p className="text-lg text-gray-400">
            Pas de spam. Sans engagement. Contact d'experts uniquement.
          </p>
        </div>

        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/20 rounded-2xl p-8 lg:p-12 shadow-2xl shadow-cyan-500/10">
          <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6 md:gap-8">
            <div className="md:col-span-1">
              <label htmlFor="companyName" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Nom de l'entreprise *
              </label>
              <input
                type="text"
                id="companyName"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="Nom de votre entreprise"
              />
            </div>

            <div className="md:col-span-1">
              <label htmlFor="phone" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Téléphone *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="+33 6 12 34 56 78"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="industry" className="block text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wider">
                Secteur d'activité *
              </label>
              <input
                type="text"
                id="industry"
                name="industry"
                value={formData.industry}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-cyan-500/20 rounded-lg px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-colors"
                placeholder="Ex: Technologie, santé, commerce"
              />
            </div>

            <button
              type="submit"
              className="md:col-span-2 w-full bg-cyan-500 hover:bg-cyan-600 text-slate-950 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center space-x-2 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40"
            >
              <span>Recevoir mon analyse du risque et de l'exposition cyber</span>
              <Send className="w-5 h-5" />
            </button>

            <p className="md:col-span-2 text-center text-sm text-gray-400">
              En soumettant ce formulaire, vous acceptez d'être contacté par nos experts en assurance cyber. Nous respectons votre vie privée et ne partagerons jamais vos informations.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
