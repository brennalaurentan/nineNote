// styles

// components / pages / images
import SemIndicationItem from './SemIndicationItem'

// tools
import { Stack } from '@mui/material';

const SemIndication = ({sem1, sem2, st1, st2}) => {
  return (
    <Stack direction="row">
      <SemIndicationItem pos={1} value="Sem 1" active={sem1}/>
      <SemIndicationItem pos={2} value="Sem 2" active={sem2}/>
      <SemIndicationItem pos={3} value="ST 1" active={st1}/>
      <SemIndicationItem pos={4} value="ST 2" active={st2}/>
    </Stack>
  )
}

export default SemIndication