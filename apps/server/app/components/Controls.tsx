import { useGame } from 'app/context/GameBoardContextProvider';
import { Command } from 'src/types/Command';
import { Direction } from 'src/types/Direction';
import { useEffect } from 'react';

export const Controls = () => {
  const { piece, move, rotate } = useGame();

  //keyboard handler
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (piece) {
        switch (event.key) {
          case 'ArrowUp':
            event.preventDefault(); // Prevent scrolling
            move(
              Command.MOVE,
              piece.coordinates,
              { x: piece.coordinates.x, y: piece.coordinates.y + 1 },
              Direction.NORTH,
            );
            break;
          case 'ArrowDown':
            event.preventDefault(); // Prevent scrolling
            move(
              Command.MOVE,
              piece.coordinates,
              { x: piece.coordinates.x, y: piece.coordinates.y - 1 },
              Direction.SOUTH,
            );
            break;
          case 'ArrowLeft':
            event.preventDefault(); // Prevent scrolling
            move(
              Command.MOVE,
              piece.coordinates,
              { x: piece.coordinates.x - 1, y: piece.coordinates.y },
              Direction.WEST,
            );
            break;
          case 'ArrowRight':
            event.preventDefault(); // Prevent scrolling
            move(
              Command.MOVE,
              piece.coordinates,
              { x: piece.coordinates.x + 1, y: piece.coordinates.y },
              Direction.EAST,
            );
            break;
          default:
            return; // Allow default behavior for other keys
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [move, piece]);

  const buttons = [
    {
      label: 'Left',
      onClick: () => rotate(Command.LEFT),
    },
    {
      label: 'Move',
      onClick: () => move(Command.MOVE),
    },
    {
      label: 'Right',
      onClick: () => rotate(Command.RIGHT),
    },
  ];

  const report = () => {
    if (piece) {
      alert(
        `X: ${piece.coordinates.x}, Y: ${piece.coordinates.y}, Direction: ${piece.direction}`,
      );
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-[32px] pt-[32px] pb-[32px]">
      <ul className="grid grid-cols-3 gap-[32px]">
        {buttons.map((button) => (
          <li key={button.label}>
            <button
              className="font-semibold w-full min-w-[120px] p-[12px] rounded-[8px] bg-gradient-to-br from-cyan-500 to-teal-400 hover:opacity-80 _animation-transition"
              onClick={button.onClick}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
      <button
        className=" flex p-0.5 min-w-[220px] rounded-[8px] bg-gradient-to-br from-cyan-500 to-teal-400 hover:opacity-80 transition-opacity duration-200"
        onClick={report}
      >
        <span className="flex justify-center p-[12px] rounded-[8px] flex-1 bg-[rgb(42,53,56)] text-white">
          Report
        </span>
      </button>
    </div>
  );
};
