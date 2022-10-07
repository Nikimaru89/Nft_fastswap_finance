import React, { useEffect, useState } from 'react'
import { Box, Input, styled } from '@mui/material'
import imageUploadOnS3Bucket from '../../utils/imageUploadS3'

type UploadProps = {
  bgImage: string,
  width?: number,
  height?: number,
  rounded?: boolean
}

type InputProps = {
  height?: number
}

const UploadArea = styled(Box)<UploadProps>(({ bgImage, width = 104, height = 104, rounded = false }) => ({
  maxWidth: `${width}px`,
  width: '100%',
  minHeight: `${height}px`,
  marginTop: rounded ? '-45px' : '16px',
  marginLeft: rounded ? '50px' : '0px',
  borderRadius: rounded ? '64px' : '16px',
  border: '4px dashed #757B75',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'auto',
  backgroundImage: bgImage,
  position: 'relative',
  '&:hover': {
    backgroundColor: 'grey',
    cursor: 'pointer'
  }
}))

const FileInput = styled(Input)<InputProps>(({ height }) => ({
  opacity: 0,
  width: '100%',
  border: '2px solid black',
  cursor: 'pointer',
  minHeight: `${height}px`
}))

const UploadField = (props) => {
  const { info, setInfo, field } = props
  const [image, setImage] = useState(info[field] ? `url(${info[field]})` : "url(assets/images/upload.svg)")

  const uploadImage = async (e) => {
    imageUploadOnS3Bucket(e, info, setImage, setInfo, field)
  }

  useEffect(() => {
    if (info[field]) {
      setImage(`url(${info[field]})`)
    }
  }, [info])// eslint-disable-line

  return (
    <UploadArea bgImage={image} width={props.width} height={props.height} rounded={props.rounded} >
      <FileInput type="file" onChange={uploadImage} height={props.height} disabled={props.disabled} />
    </UploadArea>
  )
}
export default UploadField;