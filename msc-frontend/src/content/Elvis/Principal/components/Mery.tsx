
import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';


import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));



function Mery(props: any) {


  return (
    <>
     
      <div>

          <Accordion  style={{ "background": "linear-gradient(to left, #cc5333, #23074d)", color: "LightSalmon",borderRadius:"1.2em" }}>
        <AccordionSummary
          style={{border:"1em"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ width: '33%'}}>
            <h4 >{props.e}</h4>
            </Typography>
            <Typography style={{color:"LightSalmon"}}>
          <h4 >{props.e1}</h4>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{color:"LightSalmon"}}>
          <Typography>
          <h5 >{props.f}</h5>
          </Typography>
        </AccordionDetails>
      </Accordion>
     
        </div>
    </>
  );
}

Mery.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Mery;
