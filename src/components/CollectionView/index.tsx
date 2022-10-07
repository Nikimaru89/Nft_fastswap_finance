import React from "react"
import { useTranslation } from "../../contexts/Localization"
import styled from "styled-components"
import { Grid, Button, Typography } from "@mui/material"
import { CollectionCard } from '../../components/Card'
import { Link } from 'react-router-dom'

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const StyledLink = styled(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
`

const HotCollection = (props: any) => {
  const { drops } = props
  const { t } = useTranslation()

  return (
    <div className="App">
      {drops.length > 0 ?
        <Grid container spacing={2} columns={{ xs: 1, sm: 2, md: 4 }}>
          {
            drops.map((drop, index) => (
              <Grid item xs={1} md={1} key={index}>
                <StyledLink to={`/collection/${drop.contract}/${drop.name}`} color='black' >
                  <CollectionCard banner={drop.background} avatar={drop.thumbnail} title={drop.name} noPrice />
                </StyledLink>
              </Grid>
            ))
          }
        </Grid> :
        <Typography variant='subtitle1' sx={{ textAlign: 'center', mt: '56px' }}>.</Typography>
      }
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '30px' }}>
        <Button variant="outlined" sx={{ textTransform: 'capitalize' }}>{t('Load More')}</Button>
      </div>
    </div >
  );
}

export default HotCollection