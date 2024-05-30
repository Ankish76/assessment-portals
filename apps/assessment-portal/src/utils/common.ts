import axios from "axios";

export const getDataImageUrl = async (urlData: any[]) => {
	let { data } = await axios.post("/api/s3/getSignedUrl", {
		urlData,
	});
	return data;
};
