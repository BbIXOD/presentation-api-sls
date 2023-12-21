import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import OK from '../answers/OK.js'

export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => OK