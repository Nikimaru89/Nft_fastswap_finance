import React, { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material'


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      margin: '8px auto',
      border: '1px solid #CECECE',
      borderRadius: '8px',
    },

    per: {
      padding: '3px 0px',
      borderRadius: '8px !important'
    }
  }),
)

const ControlledAccordions = (props: any) => {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<string | true>(props.expanded ? 'panel1' : true)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : true)
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src="/assets/images/down.svg" alt="zoom" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography variant='body1' color='black'>{props?.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props?.description}
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

export default ControlledAccordions