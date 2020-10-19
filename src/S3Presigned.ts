import * as AWS from "aws-sdk"
import * as uuid from "uuid"

export class S3Presigned {
	readonly options: AWS.S3.ClientConfiguration = { apiVersion: "2006-03-01", region: `ap-northeast-2` }
	readonly region =  `ap-northeast-2`
	readonly bucket = "my-bucket"

	async getPresignedUrl(){
		const s3 = new AWS.S3({ region : this.region})
		const bucketName = this.bucket
		const contentLengthLimit = 1024 * 1024 * 1024  // upload limit : 1GB
		const expirationSecond = 30

		const key = `test/${uuid.v4()}`
		const presignedParam = {
			Bucket: bucketName,
			Fields: {
				key: key
			},
			Expires: expirationSecond,
			Conditions: [["content-length-range", 0, contentLengthLimit]]
		}

		const result = s3.createPresignedPost(presignedParam)
		return result
	}

	async getSignedUrl(key: string, originFileName: string, expirationSecond?: number) {
		const s3 = new AWS.S3({ region: this.region })
		const fileExt = key.length > 1 ? key.split(".")[key.split(".").length - 1] : ""
		const params = { Bucket: this.bucket,
						Key: key,
						Expires: Number(expirationSecond) || 3600,
						ResponseContentDisposition: `inline; filename=\"${encodeURI(originFileName)}.${fileExt}\"`
					}
		return s3.getSignedUrl("getObject", params)
	}

}