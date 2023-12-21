import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'

export default (func: (event: APIGatewayProxyEvent) => Promise<APIGatewayProxyResult>) => async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return await func(event)
  }
  catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal Server Error',
        info: error.message,
      }),
    }
  }
}
