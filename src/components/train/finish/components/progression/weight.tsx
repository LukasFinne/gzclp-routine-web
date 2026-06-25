interface WeightProps {
  weight: number;
  initialWeight: number;
}
export const Weight = ({ weight, initialWeight }: WeightProps) => {
  if (initialWeight === weight) {
    return <td>{weight} kg</td>
  } else {
    return <td className="font-medium text-green-500">{initialWeight} &gt; {weight} kg</td>;
  }
};
