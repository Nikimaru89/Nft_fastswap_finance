import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Grid, Typography } from "@mui/material"
import { CollectionCard } from '../../components/Card'
import { Link } from 'react-router-dom'
import api from "../../api"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useTranslation } from "../../contexts/Localization"

const FastPlaceholder = styled.div`
  width: 250px;
  margin-top: 24px;
`

const StyledLink = styled(Link) <{ color: string }>`
  color: ${({ color }) => color} !important;
`
const Wrapper = styled.div<{ length: number }>`
  width:100%;
  @media(max-width:600px) {
    text-align:center;
  }
  .slick-prev {
    left: -38px;
  }
  .slick-next {
    right: -38px;
  }
  .slick-track {
    width: ${({ length }) => length >= 5 ? '' : '100% !important'};
  }
`
const Arrow = styled.img`
  width:100px;
  height:100px;
  z-index:3;
`
const settings = {
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 5,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1460,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5,
        infinite: true,
        '.slick-track': {
          width: '1500px !important'
        }
      }
    },
    {
      breakpoint: 1430,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 4
      }
    },
    {
      breakpoint: 1150,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 3
      }
    },
    {
      breakpoint: 860,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 570,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 1
      }
    },
  ],
  nextArrow: <Arrow src="assets/images/nextarrow.svg" alt="nextArrow" />,
  prevArrow: <Arrow src="assets/images/prevarrow.svg" alt="prevArrow" />,
};

const HotCollection = () => {
  const { t } = useTranslation()
  const [collections, setCollections] = useState([])

  const fetchCollections = async () => {
    const res = (await api.collection.getAll()).data
    setCollections([...res])
  }

  useEffect(() => {
    fetchCollections()
  }, [])

  return (
    <Wrapper length={collections?.length || 0}>
      <Typography variant='h4' sx={{ mt: '120px', mb: '24px', color: 'text.main' }}>{t('Hot collections')}</Typography>
      <Slider {...settings}>
        {
          collections.map((collection, index) => {
            return (
              <Grid item xs={1} md={1} key={index}>
                <StyledLink to={`/collection/${collection?.contract}/${collection?.name}`} color='black' >
                  <CollectionCard banner={collection?.background} avatar={collection?.thumbnail} title={collection?.name} noPrice /></StyledLink>
              </Grid>
            )
          })
        }
      </Slider>
      <Typography variant='h4' sx={{ mt: '64px', color: 'text.main' }}>{t('Made by FastSwap')}</Typography>
      <FastPlaceholder>
        <StyledLink to={`/collection/${collections[1]?.contract}/${collections[1]?.name}`} color='black' >
          <CollectionCard banner={collections[1]?.background} avatar={collections[1]?.thumbnail} title={collections[1]?.name} noPrice /></StyledLink>
      </FastPlaceholder>
    </Wrapper >
  )
}

export default HotCollection;