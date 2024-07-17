import { usePaymentContex } from "../../contexts/payment";
import { formatToBRL } from "../../helpers/formatToBRL";

type CardProps = {
  handleChecked: (index: number) => void;
  navigateToPaymentPage: () => void;
}

export const Cards = ({  handleChecked, navigateToPaymentPage }: CardProps) => {

  const { installments } = usePaymentContex();

  return (
    <div className="rounded-[10px] flex flex-col w-full xs:w-[464px] mt-4">
      {
        installments.map((installment, index) => (
          <div
            key={installment.times}
            className={`gap-1 flex flex-col p-4 border-2 border-b-0 last-of-type:border-2 first-of-type:rounded-lg last-of-type:rounded-b-lg [&:nth-child(2)]:rounded-t-lg ${
              index === 0 && 'mb-6 border-b-[2px]'
            } ${
              installment.isChecked
              ? 'border-b-[2px] border-[#03D69D]'
              : 'border-[#E5E5E5]'
            }`}
          >
            {
              index === 0 && (
                <div className="w-[67px] h-[27px] border-2 bg-[#E5E5E5] rounded-[100px] flex items-center justify-center mt-[-30px]">
                  <span className="font-extrabold text-lg">Pix</span>
                </div>
              )
            }
            {
              index === 1 && (
                <div className="w-[157px] h-[27px] border-2 bg-[#E5E5E5] rounded-[100px] flex items-center justify-center mt-[-30px]">
                  <span className="font-extrabold text-lg">Pix Parcelado</span>
                </div>
              )
            }
            <div className="flex items-center justify-center">
              <span className="text-2xl font-semibold"><span className="font-extrabold">{installment.times}x</span> {formatToBRL(installment.amount)}</span>

              <div className="ml-auto flex items-center gap-2">
                {
                  installments[index].isChecked && (
                    <button
                      className="cursor-pointer flex items-center bg-[#133A6F] rounded-lg text-white py-1 px-2 font-semibold text-sm"
                      onClick={navigateToPaymentPage}
                    >
                      Confirmar
                    </button>
                  )
                }
                <button
                  className={`cursor-pointer flex items-center justify-center rounded-full w-[26px] h-[26px] ${installment.isChecked ? 'bg-[#03D69D]' : 'none'} ${installment.isChecked ? 'border-0' : 'border-2'}`}
                  onClick={() => handleChecked(index)}
                >
                  <img src="./woovi/checked.svg" alt="checked" />
                </button>
              </div>
            </div>
            {
              installment.cashBack?.discount ? (
                <>
                  <span className="font-semibold text-base text-[#03D69D]">Ganhe <span className="font-extrabold">{installment.cashBack.discount}</span> de Cashback</span>
                  <div className="flex items-center justify-start p-2 relative">
                    <img src="./woovi/tape.png" alt="tape" className="absolute h-8 -z-10 flex-1 w-full left-0" />
                    <span className="text-white font-semibold text-[12px] xs:text-base pr-7 xs:pr-0">
                      <span className="font-extrabold">
                        {installment.cashBack.message.slice(0, 12)}
                      </span>
                        {installment.cashBack.message.slice(12)}
                    </span>
                  </div>
                </>
              ) : (
                <span className="text-[#AFAFAF] text-base">Total: {formatToBRL(installment.total!)}</span>
              )
            }
            {
              installment.lowerInterest?.discount && (
                <div className="flex items-center justify-start p-2 relative">
                  <img src="./woovi/tape.png" alt="tape" className="absolute h-8 -z-10 flex-1 w-full left-0" />
                  <span className="text-white font-semibold text-[12px] xs:text-base pr-7 xs:pr-0">
                    <span className="font-extrabold">
                      {installment.lowerInterest?.discount} de juros: {''}
                    </span>
                    {installment.lowerInterest.message}
                  </span>
                </div>
              )
            }
          </div>
        ))
      }
    </div>
  )
}