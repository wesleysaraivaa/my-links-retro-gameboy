import { Music, VolumeX } from "lucide-react";
import { HEADER_TITLE } from "../constants/gameboy";

interface GameBoyHeaderProps {
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

const GameBoyHeader = ({
  isMusicPlaying,
  onToggleMusic,
}: GameBoyHeaderProps) => (
  <div className="flex justify-between items-center mb-3 pb-1 border-b border-gb-dark-green">
    <div className="text-xs font-bold uppercase">{HEADER_TITLE}</div>
    <div className="flex items-center gap-2">
      <div className="w-3 h-[7px] border border-gb-dark-green rounded-sm relative">
        <div className="absolute right-[-2px] top-[1px] w-px h-0.5 bg-gb-dark-green"></div>
        <div className="w-[70%] h-full bg-gb-dark-green rounded-sm"></div>
      </div>
      {/* Ícone de som */}
      <button
        onClick={onToggleMusic}
        className="bg-none border-none cursor-pointer p-0 ml-1.5"
        aria-label={isMusicPlaying ? "Desativar som" : "Ativar som"}
      >
        {isMusicPlaying ? (
          <Music size={15} color="#0f380f" />
        ) : (
          <VolumeX size={15} color="#0f380f" />
        )}
      </button>
    </div>
  </div>
);

export default GameBoyHeader;
