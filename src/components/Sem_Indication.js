import { Card, CardContent, Stack, Typography, Box, Grid, Paper } from '@mui/material';
import Sem_Indication_Item from './Sem_Indication_Item'

const Sem_Indication = ({sem1, sem2, st1, st2}) => {
  return (
    <Stack direction="row">
      <Sem_Indication_Item pos={1} value="Sem 1" active={sem1}/>
      <Sem_Indication_Item pos={2} value="Sem 2" active={sem2}/>
      <Sem_Indication_Item pos={3} value="ST 1" active={st1}/>
      <Sem_Indication_Item pos={4} value="ST 2" active={st2}/>
    </Stack>
  )
}

export default Sem_Indication