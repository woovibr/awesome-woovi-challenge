import { useState } from 'react';
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";


export const HowItWorks = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between w-full cursor-pointer" onClick={toggleExpand}>
        <span className="font-extrabold text-base">Como funciona?</span>
        {
          isExpanded
            ? <MdKeyboardArrowUp className='size-7'/>
            : <MdKeyboardArrowDown className='size-7' />
        }
      </div>
      {
        isExpanded && (
          <div className="mt-2 p-4 border border-gray-200 rounded-lg">
            <p className="mb-2"><strong>1. Pagamento da Entrada pelo Pix:</strong></p>
            <p className="mb-4">Para pagamentos parcelados, a entrada deve ser paga via Pix. Utilize o QR Code gerado para efetuar o pagamento da entrada no valor especificado.</p>

            <p className="mb-2"><strong>2. Pagamento das Parcelas pelo Cartão de Crédito:</strong></p>
            <p className="mb-4">Caso o pagamento seja parcelado, após o pagamento da entrada, insira os dados do seu cartão de crédito para pagar as parcelas restantes. Preencha seu nome completo, CPF, número do cartão, data de validade e CVV.</p>

            <p className="mb-2"><strong>3. CET (Custo Efetivo Total):</strong></p>
            <p className="mb-4">O CET é informado para dar transparência sobre o custo total do financiamento, incluindo todos os juros e taxas.</p>

            <p className="mb-2"><strong>4. Confirmação de Pagamento:</strong></p>
            <p className="mb-4">Verifique os detalhes do pagamento e clique em "Pagar" para finalizar a transação.</p>

            <p className="mb-2"><strong>5. Identificação da Transação:</strong></p>
            <p>Um identificador único da transação é gerado para que você possa acompanhar o status do seu pagamento.</p>
          </div>
        )
      }
    </div>
  );
};
