import { useGame } from 'app/context/GameBoardContextProvider';

import { Direction } from 'src/types/Direction';

import RobotImage from '/assets/robot.png';

export const Robot = () => {
  const { piece } = useGame();
  if (!piece) return <></>;
  const { direction } = piece;

  return (
    <div className="size-[80px] p-[12px] relative">
      <DirectionIndicator direction={direction} />
      <img src={RobotImage} alt="Robot" />
    </div>
  );
};

interface DirectionIndicatorProps {
  direction: (typeof Direction)[keyof typeof Direction];
  className?: string;
}

const DirectionIndicator = ({
  direction,
  className = '',
}: DirectionIndicatorProps) => {
  return (
    <div
      className={`absolute ${
        direction === Direction.NORTH
          ? '-rotate-90 top-0 left-1/2 -translate-x-1/2'
          : direction === Direction.SOUTH
            ? 'rotate-90 bottom-0 left-1/2 -translate-x-1/2'
            : direction === Direction.EAST
              ? 'top-1/2 -translate-y-1/2 right-0'
              : 'rotate-180 top-1/2 -translate-y-1/2 left-0'
      } ${className}`}
    >
      <svg
        className="size-[24px]"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="#06b6d4"
          d="M9.29 16.29a1 1 0 001.42 0l4-4a1 1 0 000-1.42l-4-4a1 1 0 10-1.42 1.42L12.59 12l-3.3 3.29a1 1 0 000 1.42z"
        />
      </svg>
    </div>
  );
};
