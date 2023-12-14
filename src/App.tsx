import {
  Button,
  Container,
  FormControl,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Stack,
  Typography,
  styled,
} from '@mui/material';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import './App.css';
import { useState } from 'react';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function notNumber(value: string) {
  return Number.isNaN(Number(value));
}

const InputPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  margin: theme.spacing(4),
}));

export default function App() {
  const [step, setStep] = useState(0);
  const incrementStep = () => setStep((it) => it + 1);
  const decrementStep = () => setStep((it) => it - 1);
  return (
    <Container maxWidth="md">
      {step === 0 && <InputForm onSubmit={incrementStep} />}
      {step === 1 && <InvestmentChart goBack={decrementStep} />}
    </Container>
  );
}

function InvestmentChart({ goBack }: any) {
  return (
    <InputPaper elevation={3}>
      <Line
        data={{
          labels: new Array(12).fill(0).map((_, idx) => idx + 1),
          datasets: [
            {
              label: 'Your Contributions',
              data: new Array(12)
                .fill(0)
                .map((_, idx) => 500 * (idx + 1) * idx),
              backgroundColor: '#162953',
              borderColor: '#162953',
              fill: 'start',
            },
            {
              label: 'Investment Growth',
              data: new Array(12)
                .fill(0)
                .map((_, idx) => 500 * 1.5 * (idx + 1) * idx),
              backgroundColor: '#00ABD0',
              borderColor: '#00ABD0',
              fill: 0,
            },
          ],
        }}
        options={{
          scales: {
            x: {
              grid: { display: false },
            },
            y: {
              grid: { display: false },
            },
          },
          elements: {
            point: {
              pointStyle: false,
            },
          },
        }}
      />
      <Stack direction="row-reverse" spacing={1} marginTop={3}>
        <Button variant="outlined" onClick={() => goBack()}>
          Back
        </Button>
      </Stack>
    </InputPaper>
  );
}

function InputForm({ onSubmit }: any) {
  const [initialAmount, setInitialAmount] = useState('');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [annualIncrease, setAnnualIncrease] = useState('');
  const [investmentTerm, setInvestmentTerm] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  return (
    <InputPaper elevation={3}>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="initial-amount">Initial Amount</InputLabel>
        <Input
          id="initial-amount"
          startAdornment={<InputAdornment position="start">R</InputAdornment>}
          value={initialAmount ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setInitialAmount('');
              return;
            }
            if (notNumber(value)) return;
            setInitialAmount(value);
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="monthly-contribution">
          Monthly Contribution
        </InputLabel>
        <Input
          id="monthly-contribution"
          startAdornment={<InputAdornment position="start">R</InputAdornment>}
          value={monthlyContribution ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setMonthlyContribution('');
              return;
            }
            if (notNumber(value)) return;
            setMonthlyContribution(value);
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="annual-increase">
          Annual Increase in Monthly Contribution
        </InputLabel>
        <Input
          id="annual-increase"
          startAdornment={<InputAdornment position="end"></InputAdornment>}
          endAdornment={<InputAdornment position="start">%</InputAdornment>}
          value={annualIncrease ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setAnnualIncrease('');
              return;
            }
            if (notNumber(value)) return;
            setAnnualIncrease(value);
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="investment-term">Investment Term</InputLabel>
        <Input
          id="investment-term"
          startAdornment={<InputAdornment position="end"></InputAdornment>}
          endAdornment={<InputAdornment position="start">Years</InputAdornment>}
          value={investmentTerm ?? 5}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setInvestmentTerm('');
              return;
            }
            if (notNumber(value)) return;
            setInvestmentTerm(value);
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel htmlFor="annual-interest-rate">
          Annual Interest Rate
        </InputLabel>
        <Input
          id="annual-interest-rate"
          startAdornment={<InputAdornment position="end"></InputAdornment>}
          endAdornment={<InputAdornment position="start">%</InputAdornment>}
          value={annualInterestRate ?? 5}
          onChange={(e) => {
            const value = e.target.value;
            if (!value) {
              setAnnualInterestRate('');
              return;
            }
            if (notNumber(value)) return;
            setAnnualInterestRate(value);
          }}
        />
      </FormControl>
      <FormControl margin="normal" fullWidth>
        <InputLabel id="compounding-frequency">
          Compounding Frequency
        </InputLabel>
        <Select
          defaultValue={'yearly'}
          labelId="compounding-frequency"
          label="Compounding Frequency"
          variant="standard"
        >
          <MenuItem value={'monthly'}>Monthly</MenuItem>
          <MenuItem value={'yearly'}>Yearly</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row-reverse" spacing={1}>
        <Button variant="contained" onClick={() => onSubmit()}>
          Calculate
        </Button>
        <Button
          variant="outlined"
          onClick={() => {
            setInitialAmount('');
            setMonthlyContribution('');
            setAnnualIncrease('');
            setInvestmentTerm('');
            setAnnualInterestRate('');
          }}
        >
          Reset
        </Button>
      </Stack>
    </InputPaper>
  );
}
