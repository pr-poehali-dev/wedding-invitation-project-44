import { useEffect, useRef, useState } from 'react';
import Icon from '@/components/ui/icon';

const COUPLE_IMG =
  'https://cdn.poehali.dev/projects/b86630fb-6902-44a7-afa8-e3c928ed3a5b/files/6f161265-bd31-4cb2-bad0-7f465e44e4f2.jpg';
const HERO_VIDEO =
  'https://cdn.poehali.dev/files/0b3e8799-5272-45cb-b1c9-3cfd56fa6716.jpg';

const WEDDING_DATE = new Date('2026-08-08T15:30:00');

const timeline = [
  { time: '15:30', title: 'Сбор гостей', desc: 'Приветственный welcome-drink и настройка на классный вечер', icon: 'Wine' },
  { time: '16:00', title: 'Церемония', desc: 'Самый важный и трогательный момент. Приготовьте платки, будет красиво', icon: 'Heart' },
  { time: '17:00', title: 'Свадебный ужин', desc: 'Тёплые слова, танцы, интерактив и гастрономическое удовольствие', icon: 'UtensilsCrossed' },
  { time: '22:00', title: 'Торт & Afterparty', desc: 'Время зажигать и делать лучшие кадры', icon: 'Sparkles' },
];

const dressPalette = [
  { name: 'Глубокий синий', hex: '#0A1A2F' },
  { name: 'Графит', hex: '#2A2E35' },
  { name: 'Жемчужно-серый', hex: '#C9C6C0' },
  { name: 'Матовое золото', hex: '#C9A24B' },
];

const gallery = [COUPLE_IMG, HERO_VIDEO, COUPLE_IMG, HERO_VIDEO];

function useReveal() {
  useEffect(() => {
    const apply = () => {
      const els = document.querySelectorAll('.reveal:not(.is-visible)');
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const el = e.target as HTMLElement;
              const delay = el.dataset.delay || '0s';
              el.style.transitionDelay = delay;
              el.classList.add('is-visible');
              io.unobserve(el);
            }
          });
        },
        { threshold: 0, rootMargin: '0px 0px -40px 0px' }
      );
      els.forEach((el) => io.observe(el));
      return io;
    };
    const io = apply();
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
          <span className="font-display text-xl tracking-wide text-gold-gradient">К &amp; В</span>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase text-white/60">
            {[
              ['story', 'О паре'],
              ['when', 'Дата'],
              ['program', 'Программа'],
              ['location', 'Место'],
              ['dress', 'Дресс-код'],
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
          <p className="text-gold uppercase tracking-[0.4em] text-xs sm:text-sm mb-6 max-w-xl mx-auto animate-[fade-up_0.7s_ease_0s_both]">
            Главный инфоповод этого года. Наша свадьба.
          </p>
          <h1
            className="font-display text-5xl sm:text-7xl md:text-8xl leading-[0.9] font-light animate-[fade-up_0.7s_ease_0.15s_both]"
          >
            Кристина
            <span className="block text-gold-gradient italic">&amp;</span>
            Владимир
          </h1>
          <div className="mx-auto mt-8 w-40 h-px gold-line animate-[fade-up_0.7s_ease_0.3s_both]" />
          <p className="mt-8 text-white/70 tracking-widest text-sm sm:text-base animate-[fade-up_0.7s_ease_0.4s_both]">
            08.08.2026 · ИРКУТСК
          </p>
          <button
            onClick={() => scrollTo('rsvp')}
            className="mt-12 inline-flex items-center gap-3 px-10 py-4 bg-gold text-navy font-medium tracking-wide rounded-full hover:bg-gold-light transition-colors animate-[fade-up_0.7s_ease_0.55s_both]"
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

      {/* STORY / SAVE THE DATE */}
      <section id="story" className="max-w-3xl mx-auto px-6 py-28 sm:py-40 text-center">
        <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Приглашение</p>
        <h2 className="reveal font-display text-4xl sm:text-6xl font-light mb-10" data-delay="0.1s">
          Save the Date
        </h2>
        <div className="reveal mx-auto mb-10 w-24 h-px gold-line" data-delay="0.15s" />
        <p className="reveal text-white/70 text-lg sm:text-xl leading-relaxed" data-delay="0.2s">
          Вы знаете нас как людей, которые постоянно находятся в движении, ловят моменты и делятся
          своей жизнью. Но этот день мы хотим прожить без камер, фильтров и охватов — только в кругу
          самых близких. Мы счастливы пригласить вас разделить начало нашей новой, общей главы.
          Будет громко, красиво и по-настоящему.
        </p>
      </section>

      {/* WHEN + COUNTDOWN */}
      <section id="when" className="relative py-28 sm:py-40 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">До торжества осталось</p>
          <div className="reveal mb-16" data-delay="0.1s">
            <Countdown />
          </div>
          <div className="reveal grid sm:grid-cols-2 gap-8 text-left max-w-2xl mx-auto" data-delay="0.2s">
            <div className="flex items-start gap-4">
              <Icon name="Calendar" size={28} className="text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-2xl mb-1">Дата</h4>
                <p className="text-white/60">8 августа 2026, суббота<br />Сбор гостей в 15:30</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Icon name="MapPin" size={28} className="text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-display text-2xl mb-1">Место</h4>
                <p className="text-white/60">Загородный комплекс<br />на берегу Ангары, Иркутск</p>
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
            План дня
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

      {/* LOCATION */}
      <section id="location" className="relative py-28 sm:py-40 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Локация</p>
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light mb-8" data-delay="0.1s">
            Место встречи
          </h2>
          <p className="reveal text-white/70 text-lg leading-relaxed mb-2" data-delay="0.15s">
            Празднование состоится в загородном комплексе на берегу Ангары.
          </p>
          <p className="reveal text-white/50 mb-10" data-delay="0.2s">
            Иркутск, [Укажите точный адрес площадки]
          </p>
          <button
            className="reveal inline-flex items-center gap-3 px-8 py-4 border border-gold/40 text-gold rounded-full hover:bg-gold hover:text-navy transition-colors"
            data-delay="0.25s"
          >
            <Icon name="Navigation" size={18} />
            Построить маршрут в Яндекс.Картах
          </button>
        </div>
      </section>

      {/* DRESS CODE */}
      <section id="dress" className="max-w-4xl mx-auto px-6 py-28 sm:py-40">
        <div className="text-center mb-16">
          <p className="reveal text-gold uppercase tracking-[0.4em] text-xs mb-4">Стиль вечера</p>
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light" data-delay="0.1s">
            Эстетика и дресс-код
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="reveal space-y-6">
            <p className="text-white/70 leading-relaxed">
              Мы очень хотим, чтобы наши свадебные фотографии выглядели стильно и гармонично. Будем
              рады, если вы поддержите нашу цветовую палитру в своих нарядах.
            </p>
            <div className="border border-white/10 rounded-xl p-6 bg-white/[0.02]">
              <span className="text-gold uppercase tracking-[0.2em] text-xs">Стиль</span>
              <p className="mt-2 text-white/80">
                Black Tie / Коктейльный премиум. Для мужчин — костюмы или смокинги, для женщин —
                вечерние или коктейльные платья.
              </p>
            </div>
          </div>
          <div className="reveal grid grid-cols-2 gap-4" data-delay="0.15s">
            {dressPalette.map((c) => (
              <div key={c.name} className="border border-white/10 rounded-xl overflow-hidden">
                <div className="h-24" style={{ background: c.hex }} />
                <p className="text-center text-white/70 text-sm py-3">{c.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WISHLIST */}
      <section id="gifts" className="relative py-28 sm:py-40 border-y border-white/5">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <Icon name="Gift" size={40} className="text-gold mx-auto mb-6 reveal" />
          <h2 className="reveal font-display text-4xl sm:text-6xl font-light mb-8" data-delay="0.1s">
            Ваши улыбки — <span className="italic text-gold-gradient">главный подарок</span>
          </h2>
          <p className="reveal text-white/70 text-lg leading-relaxed" data-delay="0.15s">
            Пожалуйста, не обременяйте себя поиском и выбором громоздких подарков и цветов. Мы будем
            рады вашему вниманию в конвертах — это поможет нам осуществить нашу следующую большую
            мечту и отправиться в незабываемое свадебное путешествие.
          </p>
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
              Подтвердите ваше участие
            </h2>
            <p className="reveal text-white/50 mt-4" data-delay="0.15s">
              Пожалуйста, ответьте на вопросы формы до 01.07.2026, чтобы мы успели учесть все детали
            </p>
          </div>

          <form
            className="reveal space-y-6"
            data-delay="0.2s"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="block text-sm text-white/60 mb-2">Ваше имя и фамилия</label>
              <input
                type="text"
                placeholder="Например, Анна Иванова"
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Сможете ли вы присутствовать?</label>
              <div className="grid grid-cols-2 gap-4">
                {['Да, с удовольствием!', 'К сожалению, не смогу'].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center justify-center text-center px-4 py-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-gold transition-colors text-sm"
                  >
                    <input type="radio" name="attend" className="sr-only peer" />
                    <span className="peer-checked:text-gold">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Придёте ли вы парой?</label>
              <div className="grid grid-cols-2 gap-4">
                {['Приду один(одна)', 'Приду с парой'].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center justify-center text-center px-4 py-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-gold transition-colors text-sm"
                  >
                    <input type="radio" name="pair" className="sr-only peer" />
                    <span className="peer-checked:text-gold">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Предпочтения по напиткам</label>
              <div className="grid grid-cols-2 gap-4">
                {['Вино сухое белое', 'Вино сухое красное', 'Крепкий алкоголь', 'Безалкогольные'].map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center justify-center text-center px-4 py-4 rounded-xl bg-white/5 border border-white/10 cursor-pointer hover:border-gold transition-colors text-sm"
                  >
                    <input type="checkbox" className="sr-only peer" />
                    <span className="peer-checked:text-gold">{opt}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm text-white/60 mb-2">Аллергия или ограничения в еде</label>
              <textarea
                placeholder="Расскажите, если что-то есть"
                rows={3}
                className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-gold focus:outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-5 bg-gold text-navy font-medium tracking-wide rounded-xl hover:bg-gold-light transition-colors text-lg"
            >
              Отправить организаторам
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16 text-center">
        <h3 className="font-display text-5xl text-gold-gradient mb-4">Кристина &amp; Владимир</h3>
        <p className="text-white/40 tracking-widest text-sm">08 · 08 · 2026 — ИРКУТСК</p>
        <div className="mx-auto mt-8 w-24 h-px gold-line" />
      </footer>
    </div>
  );
};

export default Index;