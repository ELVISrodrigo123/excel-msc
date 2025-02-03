
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



function Frodry(props: any) {


  return (
    <>
      

        <div style={{ paddingTop: "0",width:"100%" }}></div>
        <div>

          <Accordion  style={{ backgroundImage: 'url("/img/back2.jpg")',backgroundSize:"cover",backgroundRepeat:"no-repeat", width:"100%", color: "RoyalBlue" ,borderRadius:"1.2em" ,border:"1em"}}>
        <AccordionSummary
          style={{border:"1em"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography sx={{ width: '33%'}}>
            <h4 >{props.c}</h4>
            </Typography>
            <Typography style={{color:"white"}}>
          <h4 >{props.c1}</h4>
          </Typography>
        </AccordionSummary>
        <AccordionDetails style={{color:"black"}}>
          <Typography>
          <h5 >{props.d}</h5>
          
          </Typography>
          <Typography>
          <h5 >{props.d1}</h5>
          
          </Typography>
          <Typography>
          <h5 >{props.d2}</h5>
          
          </Typography>
          <Typography>
          <h5 >{props.d3}</h5>
          
          </Typography>
        </AccordionDetails>
      </Accordion>
     
        </div>

      
    </>
  );
}

Frodry.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default Frodry;
