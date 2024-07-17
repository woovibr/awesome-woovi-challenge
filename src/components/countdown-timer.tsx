import { LinearProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const initialTimeInSeconds = 180; // 3 minutes

export const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState(initialTimeInSeconds);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setRemainingTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          navigate('/woovi');
          return 0;
        }
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const today = new Date();
  const formattedDate = `${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`;

  return (
    <div className="text-center flex flex-col text-base">
      <span className="font-semibold text-[#AFAFAF]">Prazo de pagamento:</span>
      <span className="font-extrabold text-[#4D4D4D]">{formattedDate} - {formattedTime}</span>
      <LinearProgress
        variant="determinate"
        value={(remainingTime / initialTimeInSeconds) * 100}
        sx={{
          backgroundColor: '#dfd9d94c',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#03D69D'
          }
        }}
      />
    </div>
  );
};
