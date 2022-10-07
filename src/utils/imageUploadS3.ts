import S3 from "react-aws-s3"
import { s3bucketConfig } from "../constants"

export default function imageUploadOnS3Bucket(e, info, setImage, setInfo, field) {

  const config = {
    bucketName: s3bucketConfig.bucketName,
    dirName: s3bucketConfig.dirName,
    region: s3bucketConfig.region,
    accessKeyId: s3bucketConfig.accessKeyId,
    secretAccessKey: s3bucketConfig.secretAccessKey,
  };

  const file = e.target.files[0]
  const fileName = e.target.files[0].name

  const ReactS3Client = new S3(config)
  ReactS3Client.uploadFile(file, fileName)
    .then(data => {
      if (data.status === 204) {
        setImage(`url(${data.location})`)
        let obj = info;
        obj[field] = data.location
        setInfo(obj)
      } else {
        console.log("fail")
      }
    })
    .catch(err => {
      console.log(err)
    })
}