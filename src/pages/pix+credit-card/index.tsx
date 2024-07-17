import { useEffect, useState } from "react";
import { CountdownTimer } from "../../components/countdown-timer";
import { Timeline, TimelineEvent } from "../../components/timeline";
import { usePaymentContex } from "../../contexts/payment";
import { formatToBRL } from "../../helpers/formatToBRL";
import { FirstStepWitgQrCode } from "./first-step-with-qr-code";
import { HowItWorks } from "./how-to-work";
import { SecondStepWithCreditCard } from "./second-step-with-credit-card";

export const PixCreditCardPage = () => {
  const { user, currentPaymentStep, handleCurrentPaymentStep } = usePaymentContex();

  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);


  useEffect(() => {
    const { times, amount, total } = user.payment.installment!;
    if (user.payment.installment) {

      const events = [
        {
          label: `1ª ${times === 1 ? 'à vista' : 'entrada'} no Pix`,
          value: formatToBRL(amount),
          isCurrentStep: true,
          isCompletedStep: false
        },
        times > 1 && {
          label: '2ª no cartão',
          value: formatToBRL(total! - amount),
          isCurrentStep: false,
          isCompletedStep: false
        }
      ].filter(Boolean) as TimelineEvent[];
  
      setTimelineEvents(events);
    }
  }, [user.payment.installment]);



  const handleEvents = (selectedIndex: number) => {
    const newTimelineEvents = timelineEvents.map((event, index) => {

      return {
        ...event,
        isCurrentStep: index === selectedIndex,
        isCompletedStep: index < selectedIndex,
      }
    });

    setTimelineEvents(newTimelineEvents);
    handleCurrentPaymentStep(1)
  };

  return (
    <div className="flex items-center flex-col gap-5 justify-center w-full xs:w-[464px]">
      
      {
        currentPaymentStep === 0
          ? <FirstStepWitgQrCode handleEvents={handleEvents} />
          : <SecondStepWithCreditCard />
      }

      <CountdownTimer />

      <Timeline events={timelineEvents} />

      <div className="border-t-2 border-[#E5E5E5] w-full" />

      <div className="flex items-center justify-between w-full">
        <span className="text-sm font-semibold">CET: 0,5%</span>
        <span className="text-lg font-semibold">
          Total: {formatToBRL(user.payment.installment?.total!)}
        </span>
      </div>

      <div className="border-t-2 border-[#E5E5E5] w-full" />

      <HowItWorks />

      <div className="border-t-2 border-[#E5E5E5] w-full" />

      <div className="flex flex-col text-center">
        <span className="text-[#B2B2B2] text-sm font-semibold">Identificador:</span>
        <span className="text-[#4D4D4D] font-extrabold">2c1b951f356c4680b13ba1c9fc889c47</span>
      </div>

    </div>
  )
}
