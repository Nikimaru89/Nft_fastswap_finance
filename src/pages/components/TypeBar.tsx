import React, { useState, useEffect } from 'react'
import { makeStyles, createStyles } from '@mui/styles'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import styled from 'styled-components'
import Switch from './Switch'
import filterIcon from '../assets2/filter.png'
import down from '../assets2/down.png'
import CheckIcon from '@mui/icons-material/CheckCircle'

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #BCC6BC'
    },
    head: {
      borderRadius: '8px !important'
    },
    content: {
      position: 'absolute',
      background: 'white',
      width: '100%',
      border: '1px solid #CECECE',
      padding: '0px !important',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      marginTop: '4px'
    }
  }),
);

const Left = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-right:10px;
`
const Image = styled.img`
  width:18px;
  height:12px;
  margin-left:25px;
`
const Text = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 20px;
  color: #01070B;
`
const Content = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: #131413;
  width:100%;
`
const Flex = styled.div`
  display:flex;
  justify-content:left;
  align-items:center;
  padding:18px 26px;
  cursor:pointer;
  &:hover{
    background: #F2F2F2;
  }
`

const ControlledAccordions = (props) => {
  const classes = useStyles()
  const liststatus = props.liststatus
  const [active, setActive] = useState(0)
  const [ischeck, SetIsCheck] = useState(false)
  const [clickcontent, SetClickContent] = useState(false)
  const SetCheckProps = (index) => {
    liststatus?.map(status => status.status = false)
    if (index < liststatus?.length) {
      liststatus[index].status = true
      setActive(index)
    }
    const filt = props.filter
    Object.keys(filt).map((item, ind) => (
      filt[item] = ind === index
    ))
    props.setFilter({ ...filt })
  }

  useEffect(() => {
    if (ischeck === false) {
      liststatus?.map(status => {
        status.status = false
        props.type !== "normalsecond" && SetCheckProps(liststatus?.length)
        return status
      })
    }
  }, [ischeck])// eslint-disable-line

  return (
    <div
      className={classes.root}
      style={{
        maxWidth: props.type === 'normalsecond' ? '288px' : 'unset',
        width: props.type === 'full' || props.type === 'normalsecond' ? '100%' : 'fit-content',
        marginTop: '10px',
        zIndex: props.zIndex || 10
      }}
    >
      <Accordion
        expanded={clickcontent}
        onClick={() => SetClickContent(!clickcontent)}
        style={{ zIndex: '10' }}
        className={classes.head}>
        <AccordionSummary
          expandIcon={<img src={down} alt='expand' />}
          aria-controls="panel1bh-content"
          id="panel1bh-header">
          <Left>
            <div style={{ marginRight: '10px' }}>
              {!props.noSwitch && <Switch value={ischeck} setValue={SetIsCheck} />}
            </div>
            {
              <>
                {props.type === 'full' && <Image src={filterIcon} />}
                <Text>
                  {
                    props.type === "normalsecond" ?
                      props.title :
                      props.type === 'full' ?
                        'Type' : ischeck === false ? props.default : liststatus[active].text
                  }
                </Text>
              </>
            }
          </Left>
        </AccordionSummary>
        <AccordionDetails className={classes.content}>
          <Content>
            {
              liststatus?.map((status, index) => {
                return (
                  <div key={index}>
                    <Flex key={index} onClick={() => {
                      SetIsCheck(true)
                      SetCheckProps(index)
                    }}>
                      {props.type === 'full' && <>
                        {status.status ? <CheckIcon style={{ color: '#566FFE', marginRight: '32px' }} /> : <div style={{ width: '20px', height: '20px', marginRight: '32px' }} />}
                        <img src={status.icon} style={{ marginRight: '15px' }} alt='status' />
                      </>}
                      <Text>{status.text}</Text>
                    </Flex>
                  </div>
                )
              })
            }
          </Content>
        </AccordionDetails>
      </Accordion>
      {
        clickcontent ?
          <div
            onClick={() => SetClickContent(false)}
            style={{ position: 'absolute', width: '100%', height: '150vh', top: '0px', left: '0px', background: 'none' }}></div> : <></>
      }
    </div >
  );
}

export default ControlledAccordions