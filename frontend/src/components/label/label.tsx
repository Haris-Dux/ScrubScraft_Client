interface LabelProps {
  text: string;
}

export function Label({ text }: LabelProps) {
  return (
    <>
      <span className="tracking-wide py-1 px-2 rounded-sm font-medium text-primary bg-white text-[11px] lg:text-[13px] uppercase">
        {text}
      </span>
    </>
  );
}

export function BlueLabel({ text }: LabelProps) {
  return (
    <>
      <span
        className={`tracking-wide py-1 px-2 rounded-sm font-medium text-white bg-blue-500 text-[11px] lg:text-[13px] uppercase`}
      >
        {text}
      </span>
    </>
  );
}
