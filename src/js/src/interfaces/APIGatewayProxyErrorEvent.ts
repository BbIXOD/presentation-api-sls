import { APIGatewayProxyEvent } from 'aws-lambda'

export default interface APIGatewayProxyErrorEvent extends APIGatewayProxyEvent {
  error: Error
}
