
import GameBoyConsole from './components/GameBoyConsole';
import GameBoyScreen from './components/GameBoyScreen';
import { DEFAULT_CONSOLE_NAME, DEFAULT_CONSOLE_TYPE } from './constants/gameboy';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 flex items-center justify-center p-4">
      <GameBoyConsole>
        <GameBoyScreen consoleName={DEFAULT_CONSOLE_NAME} consoleType={DEFAULT_CONSOLE_TYPE}>
          <div />
        </GameBoyScreen>
      </GameBoyConsole>

    </div>
  );
}

export default App;
