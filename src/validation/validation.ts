import { ResponseError } from "../error/response.error";

export const validate = (schema: any, request: any) => {
	const result = schema.validate(request, {
		abortEarly: false,
		allowUnknown: false,
	});

	if (result.error) {
		throw new ResponseError(400, result.error.message);
	} else {
		return result.value;
	}
};
