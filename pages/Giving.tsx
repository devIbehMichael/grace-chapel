import React, { useState } from 'react';
import { CreditCard, CheckCircle, ShieldCheck, Heart, Loader2 } from 'lucide-react';
import { dataService } from '../services/dataService';
import FadeIn from '../components/FadeIn';

const Giving: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [purpose, setPurpose] = useState('Offering');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success'>('idle');

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('processing');
    try {
      await dataService.processDonation({
        user_email: email,
        amount: Number(amount),
        purpose: purpose
      });
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert("Payment failed");
    }
  };

  if (status === 'success') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-cream-50">
        <div className="max-w-md w-full mx-auto px-4 text-center">
          <FadeIn>
            <div className="bg-green-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h2 className="text-4xl font-serif text-brand-900 mb-4">Thank You</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed">
              Your generosity empowers us to serve our community and share the love of Christ. A receipt has been sent to {email}.
            </p>
            <button 
              onClick={() => {
                setStatus('idle');
                setAmount('');
                setEmail('');
              }}
              className="bg-brand-900 text-white px-8 py-3 rounded-full hover:bg-brand-800 transition shadow-lg"
            >
              Give Again
            </button>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-cream-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
           <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-serif text-brand-900 mb-6">Generosity</h1>
            <p className="text-xl text-gray-500 font-light leading-relaxed">
              "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              <br/><span className="text-sm mt-2 block font-medium uppercase tracking-widest text-gold-600">— 2 Corinthians 9:7</span>
            </p>
          </div>
        </FadeIn>

        <div className="max-w-xl mx-auto">
          <FadeIn delay={200}>
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-brand-900 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <Heart className="w-12 h-12 mx-auto mb-4 text-gold-500" />
                <h2 className="text-2xl font-serif text-white relative z-10">Secure Online Giving</h2>
              </div>
              
              <form onSubmit={handlePay} className="p-8 md:p-10 space-y-8">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Amount (NGN)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">₦</span>
                    <input
                      type="number"
                      required
                      min="100"
                      className="w-full pl-10 pr-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none text-xl font-medium"
                      placeholder="5000"
                      value={amount}
                      onChange={e => setAmount(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none"
                    placeholder="you@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">Giving Type</label>
                  <div className="relative">
                    <select
                      value={purpose}
                      onChange={e => setPurpose(e.target.value)}
                      className="w-full px-4 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none bg-white appearance-none"
                    >
                      <option>Offering</option>
                      <option>Tithe</option>
                      <option>Building Fund</option>
                      <option>Missions</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={status === 'processing'}
                  className="w-full bg-gold-500 hover:bg-gold-600 text-brand-900 font-bold py-4 px-4 rounded-lg transition transform hover:-translate-y-0.5 shadow-lg flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {status === 'processing' ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Give Now
                    </>
                  )}
                </button>
                
                <div className="flex items-center justify-center text-xs text-gray-400 mt-4">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-500" />
                  Secure 256-bit SSL encrypted payment powered by Paystack.
                </div>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
};

export default Giving;