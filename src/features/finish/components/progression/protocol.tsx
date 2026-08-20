interface ProtocolProps {
  initialProtocol: {
    reps: number;
    set: number;
    stage: number;
  };
  currentProtocol: {
    reps: number;
    set: number;
    stage: number;
  };
}

export const ProtocolRow = ({
  initialProtocol,
  currentProtocol,
}: ProtocolProps) => {
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

const isProtocolEqual = (
  p1: {
    reps: number;
    set: number;
    stage: number;
  },
  p2: {
    reps: number;
    set: number;
    stage: number;
  },
): boolean => {
  return p1.reps === p2.reps && p1.set === p2.set && p1.stage === p2.stage;
};
