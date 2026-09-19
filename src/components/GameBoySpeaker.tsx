import { CSS_CLASSES, SPEAKER_LINES_COUNT } from '../constants/gameboy';

const GameBoySpeaker = () => {
  return (
    <div className={CSS_CLASSES.speakerContainer}>
      <div className={CSS_CLASSES.speakerLines}>
        {/* Renderiza linhas horizontais para simular o alto-falante */}
        {Array.from({ length: SPEAKER_LINES_COUNT }, (_, i) => (
          <div 
            key={i} 
            className={CSS_CLASSES.speakerLine}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
};

export default GameBoySpeaker;
