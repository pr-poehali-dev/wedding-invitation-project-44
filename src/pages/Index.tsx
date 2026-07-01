import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const COUPLE_IMG =
  'https://cdn.poehali.dev/projects/b86630fb-6902-44a7-afa8-e3c928ed3a5b/files/6f161265-bd31-4cb2-bad0-7f465e44e4f2.jpg';
const HERO_VIDEO =
  'https://cdn.poehali.dev/files/0b3e8799-5272-45cb-b1c9-3cfd56fa6716.jpg';

const WEDDING_DATE = new Date('2026-08-15T15:00:00');

const timeline = [
  { time: '15:00', title: 'Сбор гостей', desc: 'Welcome-зона, игристое и лёгкие закуски на террасе с видом на Байкал', icon: 'Wine' },
  { time: '16:00', title: 'Церемония', desc: 'Выездная регистрация на берегу озера', icon: 'Heart' },
  { time: '17:00', title: 'Фуршет', desc: 'Поздравления, фотосессия и прогулка вдоль воды', icon: 'Camera' },
  { time: '18:30', title: 'Банкет', desc: 'Ужин, первый танец и тёплые слова близких', icon: 'UtensilsCrossed' },
  { time: '22:00', title: 'Вечеринка', desc: 'Живая музыка, диджей-сет и фейерверк над Байкалом', icon: 'Sparkles' },
];

const gallery = [COUPLE_IMG, HERO_VIDEO, COUPLE_IMG, HERO_VIDEO];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).style.animationDelay =
              (e.target as HTMLElement).dataset.delay || '0s';
            e.target.classList.add('is-visible');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Countdown() {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return;
      setT({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff / 3600000) % 24),
        m: Math.floor((diff / 60000) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  const cells = [
    { v: t.d, l: 'дней' },
    { v: t.h, l: 'часов' },
    { v: t.m, l: 'минут' },
    { v: t.s, l: 'секунд' },
  ];
  return (
    <div className="flex gap-3 sm:gap-6 justify-center">
      {cells.map((c) => (
        <div key={c.l} className="flex flex-col items-center">
          <span className="font-display text-4xl sm:text-6xl text-gold-gradient tabular-nums leading-none">
            {String(c.v).padStart(2, '0')}
          </span>
          <span className="mt-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/50">
            {c.l}
          </span>
        </div>
      ))}
    </div>
  );
}

const Index = () => {
  useReveal();
  const videoRef = useRef<HTMLVideoElement>(null);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="bg-navy text-white overflow-x-hidden grain">
      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-md bg-navy/40 border-b border-white/5">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="font-display text-xl tracking-wide text-gold-gradient">Т &amp; А</span>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-white/60">
            {[
              ['story', 'О паре'],
              ['when', 'Дата'],
              ['program', 'Программа'],
              ['gallery', 'Галерея'],
              ['rsvp', 'Анкета'],
            ].map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-gold transition-colors">
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-center justify-center">
        <div className="absolute inset-0 overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_VIDEO}
            className="w-full h-full object-cover"
          >
            <source src="" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/70 via-navy/50 to-navy" />
        </div>

        <div className="relative z-10 text-center px-6">
          <p className="reveal text-gold uppercase tracking-[0.5em] text-xs sm:text-sm mb-6">
            Мы женимся
          </p>
          <h1
            className="reveal font-display text-6xl sm:text-8xl md:text-9xl leading-[0.9] font-light"
            data-delay="0.15s"
          >
            Тимур
            <span className="block text-gold-gradient italic">&amp;</span>
            Алина
          </h1>
          <div className="reveal mx-auto mt-8 w-40 h-px gold-line" data-delay="0.3s" />
          <p className="reveal mt-8 text-white/70 tracking-widest text-sm sm:text-base" data-delay="0.4s">
            15 АВГУСТА 2026 · ОЗЕРО БАЙКАЛ
          </p>
          <button
            onClick={() => scrollTo('rsvp')}
            className="reveal mt-12 inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-medium tracking-wide rounded-full hover:bg-gold-light transition-colors"
            data-delay="0.55s"
          >
            Подтвердить присутствие
            <Icon name="ArrowRight" size={18} />
          </button>
        </div>

        <button
          onClick={() => scrollTo('story')}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/40 animate-shimmer"
        >
          <Icon name="ChevronDown" size={28} />
        </button>
      </section>

      {/* STORY */}
      <section id="story" className="max-w-6xl mx-auto px-6 py-28 sm:py-40">
        <div className="text-center mb-20">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Наша история</p>
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light" data-delay="0.1s">
            Две дороги, один путь
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-12 md:gap-20">
          {[
            {
              name: 'Тимур',
              role: 'Жених',
              text: 'Родился в Иркутске, влюблён в горы и Байкал с детства. Ведёт блог о путешествиях и уверен, что лучшее приключение началось в день знакомства с Алиной.',
            },
            {
              name: 'Алина',
              role: 'Невеста',
              text: 'Создаёт контент о стиле и красоте, обожает уют и глубокие разговоры до рассвета. Знала, что это судьба, с первого совместного заката над водой.',
            },
          ].map((p, i) => (
            <div
              key={p.name}
              className="reveal border border-white/10 rounded-2xl p-8 sm:p-10 bg-white/[0.02] backdrop-blur-sm"
              data-delay={`${i * 0.15}s`}
            >
              <span className="text-gold uppercase tracking-[0.3em] text-xs">{p.role}</span>
              <h3 className="font-display text-4xl sm:text-5xl mt-3 mb-6 font-light">{p.name}</h3>
              <p className="text-white/60 leading-relaxed">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHEN + COUNTDOWN */}
      <section id="when" className="relative py-28 sm:py-40 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">До торжества осталось</p>
          <div className="reveal mb-16" data-delay="0.1s">
            <Countdown />
          </div>
          <div className="reveal grid sm:grid-cols-2 gap-8 text-left" data-delay="0.2s">
            <div className="flex items-start gap-4">
              <Icon name="Calendar" size={28} className="text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-2xl mb-1">Дата</h4>
                <p className="text-white/60">15 августа 2026, суббота<br />Сбор гостей в 15:00</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="MapPin" size={28} className="text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-2xl mb-1">Место</h4>
                <p className="text-white/60">Резиденция «Байкал», п. Листвянка<br />Берег озера Байкал</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROGRAM / TIMELINE */}
      <section id="program" className="max-w-4xl mx-auto px-6 py-28 sm:py-40">
        <div className="text-center mb-20">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Расписание дня</p>
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light" data-delay="0.1s">
            Программа праздника
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[27px] sm:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />
          {timeline.map((item, i) => (
            <div
              key={item.time}
              className={`reveal relative flex items-start gap-6 mb-12 last:mb-0 sm:w-1/2 ${
                i % 2 === 0 ? 'sm:pr-12 sm:text-right sm:ml-0' : 'sm:pl-12 sm:ml-auto sm:flex-row-reverse sm:text-left'
              }`}
              data-delay={`${i * 0.08}s`}
            >
              <div className="relative z-10 shrink-0 w-14 h-14 rounded-full bg-navy border border-gold/40 flex items-center justify-center sm:absolute sm:top-0"
                style={i % 2 === 0 ? { right: '-31px' } : { left: '-31px' }}
              >
                <Icon name={item.icon} size={22} className="text-gold" />
              </div>
              <div className="flex-1">
                <span className="font-display text-3xl text-gold-gradient">{item.time}</span>
                <h4 className="font-display text-2xl mt-1 mb-2">{item.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERY */}
      <section id="gallery" className="max-w-6xl mx-auto px-6 py-28 sm:py-40">
        <div className="text-center mb-16">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Моменты</p>
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light" data-delay="0.1s">
            Фото и видео
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {gallery.map((src, i) => (
            <div
              key={i}
              className={`reveal relative overflow-hidden rounded-xl group ${
                i === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-[3/4]'
              }`}
              data-delay={`${i * 0.1}s`}
            >
              <img
                src={src}
                alt="Пара"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-navy/20 group-hover:bg-transparent transition-colors" />
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="relative py-28 sm:py-40 border-t border-white/5">
        <div className="max-w-xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Ответьте нам</p>
            <h2 className="reveal font-display text-4xl sm:text-6xl font-light" data-delay="0.1s">
              Будете с нами?
            </h2>
            <p className="reveal text-white/50 mt-4" data-delay="0.15s">
              Пожалуйста, подтвердите присутствие до 1 июля 2026
            </p>
          </div>

          <form
            className="reveal space-y-5"
            data-delay="0.2s"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Ваше имя"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors"
            />
            <input
              type="tel"
              placeholder="Телефон"
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors"
            />
            <div className="grid grid-cols-2 gap-4">
              {['Приду', 'Приду с парой'].map((opt) => (
                <label
                  key={opt}
                  className="flex items-center justify-center px-4 py-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-gold transition-colors text-sm"
                >
                  <input type="radio" name="guests" className="sr-only peer" />
                  <span className="peer-checked:text-gold">{opt}</span>
                </label>
              ))}
            </div>
            <textarea
              placeholder="Пожелания по меню или комментарий"
              rows={3}
              className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors resize-none"
            />
            <button
              type="submit"
              className="w-full py-5 bg-gold text-navy font-medium tracking-wide rounded-xl hover:bg-gold-light transition-colors text-lg"
            >
              Отправить ответ
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16 text-center">
        <h3 className="font-display text-5xl text-gold-gradient mb-4">Тимур &amp; Алина</h3>
        <p className="text-white/40 tracking-widest text-sm">15 · 08 · 2026 — БАЙКАЛ</p>
        <div className="mx-auto mt-8 w-24 h-px gold-line" />
      </footer>
    </div>
  );
};

export default Index;
