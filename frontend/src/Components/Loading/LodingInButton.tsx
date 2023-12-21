

const LodingInButton = () => {
  return (
    <div>
      <div className="flex flex-row gap-2 h-full">
        <div className="w-4 h-4 rounded-full bg-slate-100 animate-bounce [animation-delay:.7s]"></div>
        <div className="w-4 h-4 rounded-full bg-slate-100 animate-bounce [animation-delay:.3s]"></div>
        <div className="w-4 h-4 rounded-full bg-slate-100 animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
};

export default LodingInButton;
