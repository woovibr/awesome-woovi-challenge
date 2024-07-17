export type TimelineEvent = {
  label: string;
  value: string;
  isCurrentStep: boolean;
  isCompletedStep: boolean;
};

type TimeLineProps = {
  events: TimelineEvent[];
};

export const Timeline = ({ events }: TimeLineProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      {
        events.map((event, index) => (
          <div key={event.label} className="w-full flex items-center gap-2 relative">

            {
              index !== events.length - 1 && (
                <div className="h-[150%] border-l-2 border-gray-300 absolute mt-10 ml-[7px]" />
              )
            }

            <div className={`w-4 h-4 border-2 rounded-full z-10 flex items-center justify-center ${
              event.isCurrentStep ? 'border-green-500' : 'border-gray-300'
            } ${event.isCompletedStep ? 'bg-green-500 border-green-500' : 'bg-white'}`}>
              {event.isCompletedStep && (<img src="./woovi/checked.svg" className="w-[7px] h-1.5" />)}
            </div>

            <time className="text-lg font-semibold leading-none text-[#4D4D4D]">
              {event.label}
            </time>

            <span className="ml-auto text-lg font-extrabold">
              {event.value}
            </span>

          </div>
        ))
      }
    </div>
  );
};