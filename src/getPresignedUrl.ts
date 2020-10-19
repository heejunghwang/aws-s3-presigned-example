import { S3Presigned } from "./S3Presigned";
import Axios from "axios"
import * as path from "path"
import * as fs from "fs"
import FormData from "form-data"

(async () => {
	// get s3 presigned url
	const s3Presigned = new S3Presigned()
	const res = await s3Presigned.getPresignedUrl();

	const a = path.resolve("images.jpeg")

	// upload file to presigned url
	const url = res.url
	const fields = res.fields
	const content = await fs.promises.readFile(a)
	const formData = new FormData()
	Object.keys(fields).forEach((k) => formData.append(k, fields[k]))
	formData.append("file", content, "images.jpeg")
	try{
		await Axios.post(url, formData, {
			headers: {
				"Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
				"Content-Length": formData.getLengthSync()
			}
		})
	}catch(e){
		console.log(e)
	}
})()
