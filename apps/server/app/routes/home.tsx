import type { MetaDescriptor } from 'react-router';

import { GameProvider } from 'app/context/GameBoardContextProvider';

import { GameBoard } from 'app/components/GameBoard';
import { Controls } from 'app/components/Controls';

export function meta() {
  return [{ title: 'Toy Robot Simulator' }] satisfies MetaDescriptor[];
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between pt-[54px] min-h-screen w-screen bg-[rgb(29,37,39)]">
      <div className="flex flex-col items-center justify-center w-[600px]">
        <p className="rounded-3xl bg-[rgb(47,53,55)] p-[24px] w-full text-center">
          <span className="text-white">
            Click to place the robot, use the buttons or arrows to move
          </span>
        </p>
        <GameProvider>
          <GameBoard />
          <Controls />
        </GameProvider>
      </div>
    </main>
  );
}
