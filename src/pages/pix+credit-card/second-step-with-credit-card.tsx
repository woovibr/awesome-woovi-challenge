import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { usePaymentContex } from '../../contexts/payment';
import { formatToBRL } from '../../helpers/formatToBRL';
import { generateInstallments } from '../../helpers/generate-iInstallments';

const schema = z.object({
  name: z.string()
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras")
    .min(3, "Nome deve ter pelo menos 3 caracteres"),
  cpf: z.string().min(14, "CPF inválido"),
  number: z.string().min(19, "Número inválido"),
  expiration: z.string().min(4, "Data inválida"),
  cvv: z.string().min(3, "CVV inválido"),
  installments: z.string().min(1, 'Selecione o número de parcelas'),
});


export const SecondStepWithCreditCard = () => {
  const navigate = useNavigate();
  const [installmentsCreditCard, setInstallmentsCreditCard] = useState<string[]>([]);
  const { user } = usePaymentContex();

  const [cardNumber, setCardNumber] = useState('');
  const [cvv, setCvv] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [installments, setInstallments] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    cpf: '',
    number: '',
    expiration: '',
    cvv: '',
    installments: '',
  });

  useEffect(() => {
    if (user.payment.installment) {
      const { total, amount} = user.payment.installment;
      setInstallmentsCreditCard(generateInstallments(total! - amount).map((installment) => {
        return `${installment.times} de ${formatToBRL(installment.amount)}`
      }))      
    }
  }, []);

  const handlePayment = () => {
    const data = {
      name,
      cpf,
      number: cardNumber,
      expiration: expirationDate,
      cvv,
      installments,
    };
 
    try {
      schema.parse(data);

      const toastId = toast.loading("Realizando pagamento...");
  
      setTimeout(() => {
        toast.update(toastId, {
          render: `Pagamento realizado com sucesso!
          Você será redirecionado a página inicial.`,
          type: "success",
          isLoading: false,
          autoClose: 3500,
          onClose: () => navigate('/woovi'),
        });
  
      }, 3200);
    } catch (error: any) {
      const fieldErrors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});

      setErrors(fieldErrors);
    }
  };

  const handleNameChange = (value: string) => {
    setName(value);
    setErrors({ ...errors, name: '' });
  };

  const handleCpfChange = (value: string) => {
    const pureValue = value.replace(/\D/g, '').slice(0, 11);
    const formattedValue = pureValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCpf(formattedValue);
    setErrors({ ...errors, cpf: '' });
  };

  const handleCardNumberChange = (value: string) => {
    const pureValue = value.replace(/\D/g, '');
    const formattedValue = pureValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    if (pureValue.length <= 16) {
      setCardNumber(formattedValue);
      setErrors({ ...errors, number: '' });
    }
  };

  const handleExpirationChange = (value: string) => {
    const pureValue = value.replace(/\D/g, '');
    const formattedValue = pureValue.replace(/(\d{2})(?=\d{2})/, '$1/');
    if (pureValue.length <= 4) {
      setExpirationDate(formattedValue);
      setErrors({ ...errors, expiration: '' });
    }
  };

  const handleCvvChange = (value: string) => {
    const pureValue = value.replace(/\D/g, '');
    if (pureValue.length <= 3) {
      setCvv(pureValue);
      setErrors({ ...errors, cvv: '' });
    }
  };

  const handleInstallmentsChange = (value: string) => {
    setInstallments(value);
    setErrors({ ...errors, installments: '' });
  };
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        gap: 2,
      }}
    >
      <TextField
        id="card-name"
        label="Nome completo"
        required
        value={name}
        onChange={({ target: { value }}) => handleNameChange(value)}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ '& fieldset': { borderRadius: '8px' }}}
      />

      <TextField
        id="card-cpf"
        label="CPF"
        required
        value={cpf}
        onChange={({ target: { value }}) => handleCpfChange(value)}
        error={!!errors.cpf}
        helperText={errors.cpf}
        sx={{ '& fieldset': { borderRadius: '8px' }}}
      />

      <TextField
        id="card-number"
        label="Número do Cartão"
        required
        value={cardNumber}
        onChange={({ target: { value }}) => handleCardNumberChange(value)}
        error={!!errors.number}
        helperText={errors.number}
        sx={{ '& fieldset': { borderRadius: '8px' }}}
      />

      <div className='flex items-center w-full gap-5'>
        <TextField
          id="card-expiration"
          label="Vencimento"
          required
          placeholder="MM/YY"
          value={expirationDate}
          onChange={({ target: { value }}) => handleExpirationChange(value)}
          error={!!errors.expiration}
          helperText={errors.expiration}
          sx={{ width: '50%', '& fieldset': { borderRadius: '8px' }}}
        />

        <TextField
          id="cvv"
          label="CVV"
          required
          value={cvv}
          onChange={({ target: { value }}) => handleCvvChange(value)}
          error={!!errors.cvv}
          helperText={errors.cvv}
          sx={{ width: '50%', '& fieldset': { borderRadius: '8px' }}}
        />
      </div>

      <FormControl required sx={{ '& fieldset': { borderRadius: '8px' } }}>
        <InputLabel id="installments-label">Parcelas</InputLabel>
        <Select
          id="installments"
          labelId="installments-label"
          label="Parcelas"          
          value={installments}
          onChange={({  target: { value } }) => handleInstallmentsChange(value)}
          error={!!errors.installments}
          sx={{ minWidth: 120 }}
        >
          {
            installmentsCreditCard.map((installment) => (
              <MenuItem key={installment} value={installment}>{installment}</MenuItem>
            ))
          }
        </Select>
        {errors.installments && <FormHelperText error>{errors.installments}</FormHelperText>}
      </FormControl>

      <Button
        variant="outlined"
        onClick={handlePayment}
        sx={{
          textTransform: 'none',
          borderRadius: '0.5rem',
          background: '#133A6F',
          color: '#fff',
          fontWeight: 600,
          fontSize: '1.125rem',
          lineHeight: '1.75rem',
          '&:hover': {
            background: '#133A6F',
            color: '#fff',
          }
        }}
      >
        Pagar
      </Button>
    </Box>
  );
};
