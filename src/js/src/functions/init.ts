import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { readFileSync } from 'fs'
import querryFile from '../querryFile.js'
import OK from '../answers/OK.js'
import errorHandler from '../errorHandler.js'

const path = 'resources/mydb.sql'

const init = async (_event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const querryData = readFileSync(path, 'utf8')
  await querryFile(querryData)

  return OK
}

export const handler = errorHandler(init)
