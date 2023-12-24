import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import errorHandler from '../errorHandler'

const getEnv = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    body: JSON.stringify(process.env)
  }
}

export const handler = errorHandler(getEnv)
