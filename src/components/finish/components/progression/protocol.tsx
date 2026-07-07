import type { Protocol } from "../../../../lib/workout/protocol";


interface ProtocolProps {
  initialProtocol: Protocol;
  currentProtocol: Protocol;
}

export const ProtocolRow = ({ initialProtocol, currentProtocol }: ProtocolProps) => {
  if (isProtocolEqual(initialProtocol, currentProtocol)) {
    return (
      <td>
        {currentProtocol.set}x{currentProtocol.reps}
      </td>
    );
  }

  return (
    <td className="text-red-500">
      {initialProtocol.set}x{initialProtocol.reps} &gt; {currentProtocol.set}x
      {currentProtocol.reps}
    </td>
  );
};

const isProtocolEqual = (p1: Protocol, p2: Protocol): boolean => {
  return p1.reps === p2.reps && p1.set === p2.set && p1.stage === p2.stage;
};
