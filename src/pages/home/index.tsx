import { Box, Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { usePaymentContex } from "../../contexts/payment";
import { formatToBRL } from "../../helpers/formatToBRL";

const schema = z.object({
  name: z.string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "O nome deve conter apenas letras"),
  installments: z.string().min(1, 'Selecione algum pagamento'),
})

const payments = [
  'Streamings: 79.99',
  'Pizza Top: 150',
  'Plano de Saúde: 910',
  'wSchool: 8280.12',
  'wCar: 33912.79',
  'Pacote de Viagem: 50500',
]

export const HomePage = () => {
  const navigate = useNavigate();

  const { setUser } = usePaymentContex();

  const [name, setName] = useState('');
  const [installments, setInstallments] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    installments: '',
  });

  const handleChangeName = (value: string) => {
    setName(value);
    setErrors({ ...errors, name: '' });

  };

  const handleInstallmentsChange = (value: string) => {
    setInstallments(value);
    setErrors({ ...errors, installments: '' });
  };

  const handleSubmit = () => {
    const data = {
      name,
      installments,
    };

    if (!installments) {
      setErrors({ ...errors, installments: 'Selecione algum pagamento' });
      return;
    };
  
    try {
      schema.parse(data);
      const [source, value] = installments.split(':')
      setUser({
        name,
        payment: {
          source,
          value: +value
        }
      })
      navigate('/payment-method');
    } catch (error: any) {
      const fieldErrors = error.errors.reduce((acc: any, curr: any) => {
        acc[curr.path[0]] = curr.message;
        return acc;
      }, {});

      setErrors(fieldErrors);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
      }}
    >

      <TextField
        id="card-name"
        label="Nome"
        required
        value={name}
        onChange={({  target: { value } }) => handleChangeName(value)}
        error={!!errors.name}
        helperText={errors.name}
        sx={{ '& fieldset': { borderRadius: '8px' }}}
      />

      <FormControl required sx={{ '& fieldset': { borderRadius: '8px' } }} fullWidth>
        <InputLabel id="installments-label">Pagamento</InputLabel>
        <Select
          id="installments"
          labelId="installments-label"
          label="Pagamento"          
          value={installments}
          onChange={({  target: { value } }) => handleInstallmentsChange(value)}
          error={!!errors.installments}
        >
          {
            payments.map((pagamento) => (
              <MenuItem key={pagamento} value={pagamento}>
                {pagamento.split(':')[0]}: {formatToBRL(+pagamento.split(':')[1])}
              </MenuItem>
            ))
          }
        </Select>
        {errors.installments && <FormHelperText error>{errors.installments}</FormHelperText>}
      </FormControl>

      <Button
        variant="outlined"
        endIcon={<GoArrowRight />}
        onClick={handleSubmit}
        sx={{
          textTransform: 'none',
          borderRadius: '8px',
          background: '#133A6F',
          color: '#fff',
          fontWeight: 600,
          '&:hover': {
            background: '#133A6F',
            color: '#fff',
          }
        }}
      >
        Forma de pagamento
      </Button>
  
    </Box>
  );
};
