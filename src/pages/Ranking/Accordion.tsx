import React, { useState } from 'react';
import { makeStyles, createStyles } from '@mui/styles'
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material'
import Down from '../assets2/down.png';
import styled from 'styled-components';
import { useTranslation } from '../../contexts/Localization';

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: '60%',
      margin: '8px auto'
    },
    heading: {
      // fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      // fontSize: theme.typography.pxToRem(15),
      // color: theme.palette.text.secondary,
    },
    per: {
      padding: '10px 0px',
      marginBottom: '8px',
      borderRadius: '8px'
    }
  }),
);

const Text = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 20px;
  color: #131413;
`
const Content = styled.div`
  font-family: 'CircularStd';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 20px;
  color: #131413;
`

const Bold = styled.span`
  font-weight:bold;
  color:blue;
`

const Space = styled.div`
  margin-bottom:15px;
`

export default function ControlledAccordions() {
  const classes = useStyles()
  const { t } = useTranslation()
  const [expanded, setExpanded] = useState<string | false>(false)

  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Text>{t('What is SeaMammon?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            {t('The Seamammon is a collection of 4,000 unique Sea Mammals NFTs and digital collectibles living on the BNB Chain. Developed by FastSwap. With Seamammon NFTs you will have access to our P2E games on Metaverse and unlock other premium features in our ecosystem of products like Cointools, FastSwap and other benefits in the future.')}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Text>{t('How to get 50% discount on fees?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            {t('Easy! Simply list an NFT for sale with FAST or DUKE instead of BNB. Get 50% discount!')}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('How to buy a fixed-price NFT?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            {t('Select the')} <a href="http://fastswap.finance/" target="_blank" rel="noreferrer"><Bold>{t('Buy Now')}</Bold></a> {t('button and follow the prompts in your wallet.')}
            {t('Once the transaction is complete, the item will transfer to your wallet and the seller will receive the funds.  You will need either')} <Bold>FAST, DUKE {t('or')} BNB</Bold>.<br />
            <Space />
            {t('To see the NFT in your wallet, return to your profile, and select Collected.')}<br />
            <Space />
            {t("Keep in mind, there might be a slight delay before it's visible due to transaction processing time.")}<br />
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('How to make an offer on an NFT?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            A) {t('You can begin the process to make an offer on an NFT from a few different areas on the site.')}<br />
            B) {t('While looking at a single collection')}<br />
            C) {t('While exploring all NFTs')}<br />
            D) {t('While looking at the NFT directly')}<br />
            <Space />
            1) {t('Start the process by clicking Make Offer.')}<br />
            2) {t('Once you have clicked on Make Offer, a modal will appear. Input the amount of BNB you wish to make the offer for.')}<br />
            3) {t('For listings with FAST or DUKE pricing, you will have to input FAST or DUKE amount.')}<br />
            4) {t('When you have input the amount of BNB you would like to offer, click Make Offer and a confirmation will appear. You will now need to confirm this action with your wallet.')}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('What is a collection offer?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            {t('A Collection offer allows you to place the same BNB offer on every item within a collection with just a click. This means that anyone holding an item of the collection is able to accept your offer. If a seller accepts your collection offer, it will automatically be withdrawn from all other items in the collection.')}<br />
            <Space />
            {t('You can think of this similar to a limit order when trading cryptocurrency on an exchange.')}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('How to make a collection offer?')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            1) {t('Go to the collection page of your choosing.')}<br />
            2) {t("At the top of the collection page, you'll see a button labeled Make Collection Offer.")}< br />
            3) {t('A modal will appear. You can now input the amount of FAST/DUKE/BNB you would like to offer across the entire collection.Once you have confirmed the parameters of your collection offer, you can click on the Make Offer button.')}<br />
            4) {t('You will now be prompted to sign a message from your wallet. Once you have done this, your offer will be live on the site.')}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel7'} onChange={handleChange('panel7')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('Listing an NFT for a Fixed Price')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            1) {t("Navigate to the NFT you want to sell and click on Sell in the top-right corner. If you don't see the Sell button, make sure you're connected to the correct wallet.")}<br />
            2) {t("Next, you'll see a modal appear. Enter the price you want to list your NFT at, and click List Item.")}<br />
            3) {t("If this is your first time selling an item from this collection, the site will ask for you to approve the collection for trading. Click Approve. You only need to do this once per collection. Once you've approved a collection, you don't need to do it again, unless you revoke the approval later on.")}<br />
            4) {t("Lastly, you'll need to confirm the listing with a transaction from your wallet.")}
          </Content>
        </AccordionDetails>
      </Accordion>

      <Accordion expanded={expanded === 'panel8'} onChange={handleChange('panel8')} className={classes.per}>
        <AccordionSummary
          expandIcon={<img src={Down} alt="down" />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Text>{t('Accepting an offer on your NFT')}</Text>
        </AccordionSummary>
        <AccordionDetails>
          <Content>
            1) {t("To accept an offer on your item, you will need to go to the individual page for that NFT.")}<br />
            2) {t("Once you're on that page, you will be able to see the list of offers which have been made.")}<br />
            3) {t("Click Accept on the offer which you wish to accept. This will begin the process.")}<br />
            4) {t("A modal will appear with the details of the offer. Click Accept Offer again to confirm that this is the offer which you want to accept.")}<br />
            5) {t("You will now need to confirm this in your wallet to proceed.")}<br />
            6) {t("Once the transaction has been completed, you will see a success message appear, showing that your sale has been successful.")}
          </Content>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
