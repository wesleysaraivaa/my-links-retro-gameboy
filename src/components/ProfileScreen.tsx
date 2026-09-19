interface ProfileScreenProps {
  onBack: () => void;
}

const ProfileScreen = ({ onBack }: ProfileScreenProps) => (
  <div
    className="w-full h-full text-gb-dark-green font-gameboy leading-none p-1.5 sm:p-2 relative overflow-hidden flex flex-col gap-1 select-none animate-screen-slide-in"
    role="dialog"
    aria-modal="true"
    aria-label="Tela de perfil"
  >
    <div className="flex items-center justify-between border-b border-gb-dark-green pb-1 mb-1">
      <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase flex items-center gap-1">
        <span>▶</span>
        <span>PROFILE</span>
      </div>
      <div className="text-[6px] sm:text-[7px] opacity-70 tracking-wide">
        PAGE 1 / 1
      </div>
    </div>

    <div className="flex-1 flex flex-col items-center justify-start gap-1.5 sm:gap-2 overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
      <div className="mt-0.5 flex flex-col items-center gap-1">
        <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] border-2 border-gb-dark-green bg-gb-dark-green/10 flex items-center justify-center p-1 relative">
          <div className="absolute inset-0 border-[3px] border-gb-green pointer-events-none" aria-hidden="true" />
          <img
            src="/images/Logo Uni.svg"
            alt="Avatar do Wesley"
            className="w-full h-full object-contain"
            draggable={false}
          />
        </div>
        <div className="text-[5px] sm:text-[6px] opacity-60 tracking-[0.2em]">
          ▬ AVATAR ▬
        </div>
      </div>

      <div className="w-full px-1 flex flex-col gap-0.5 text-left">
        <div className="text-[9px] sm:text-[10px] font-bold tracking-[0.1em] uppercase">
          WESLEY
        </div>
        <div className="text-[7px] sm:text-[8px] tracking-wide opacity-90 uppercase">
          FRONT-END DEVELOPER
        </div>
      </div>

      <div className="w-full px-1 border-t border-b border-gb-dark-green/60 py-1 my-0.5 flex flex-col gap-0.5">
        <div className="text-[6px] sm:text-[7px] font-bold uppercase tracking-widest opacity-80 mb-0.5">
          ═══ SKILLS ═══
        </div>
        <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[7px] sm:text-[8px] font-bold uppercase leading-tight">
          <span>HTML</span>
          <span>•</span>
          <span>CSS</span>
          <span>•</span>
          <span>JS</span>
          <span>•</span>
          <span>REACT</span>
          <span>•</span>
          <span>TS</span>
        </div>
        <div className="flex flex-wrap gap-x-1.5 gap-y-0.5 text-[6px] sm:text-[7px] uppercase opacity-70 leading-tight mt-0.5">
          <span>TypeScript</span>
        </div>
      </div>

      <div className="w-full px-1 flex items-center justify-between mt-auto text-[6px] sm:text-[7px] uppercase opacity-90 tracking-wide">
        <div className="flex items-center gap-1">
          <span>⌖</span>
          <span>UBJARA - CE</span>
        </div>
        <div className="text-[5px] sm:text-[6px] opacity-60">
          ONLINE
        </div>
      </div>
    </div>

    <button
      type="button"
      onClick={onBack}
      className="mt-1 w-full flex items-center justify-between px-1 py-0.5 border border-gb-dark-green bg-transparent text-gb-dark-green text-[7px] sm:text-[8px] font-bold uppercase tracking-wider cursor-pointer hover:bg-gb-dark-green hover:text-gb-green active:translate-y-px transition-colors duration-100 focus:outline-none"
      aria-label="Voltar ao menu"
    >
      <span className="flex items-center gap-1">
        <span>◀</span>
        <span>BACK</span>
      </span>
      <span className="text-[5px] sm:text-[6px] opacity-80">
        [B] [ESC]
      </span>
    </button>

    <div className="absolute bottom-0.5 right-1 text-[6px]">
      <span className="animate-blink">█</span>
    </div>
  </div>
);

export default ProfileScreen;
