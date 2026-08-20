interface WeightProps {
  weight: number;
  initialWeight: number;
}
export const Weight = ({ weight, initialWeight }: WeightProps) => {
  const roundedWeight = Math.round(weight)
  const roundedInitialWeight = Math.round(initialWeight)
  if (initialWeight === weight) {
    return <td>{roundedWeight} kg</td>;
  } else {
    return (
      <td className="font-medium text-green-500">
        {roundedInitialWeight} &gt; {roundedWeight} kg
      </td>
    );
  }
};
