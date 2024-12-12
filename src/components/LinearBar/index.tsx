interface LinearBarProps {
  value: any;
  colors: any;
  highest?: any;
}

export const LinearBar = ({ value, colors, highest }: LinearBarProps) => {
  return (
    <div
      className="flex items-center w-full h-2 mt-1 relative group"
      style={{ backgroundColor: colors[0] || "#F3F3F3" }}
    >
      <div
        className="border border-transparent h-full"
        style={{
          width: `${highest ? (value * 100) / highest : value}%`,
          backgroundColor: colors[1] || "#7AB3A2",
        }}
      ></div>
    </div>
  );
};
