import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import { ResultSetHeader } from 'mysql2'
import dbController from '../dbController.js'
import NotFound from '../answers/NotFound.js'
import OK from '../answers/OK.js'
import errorHandler from '../errorHandler.js'

const modify = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const id = event.pathParameters?.id

  const { name, description, Post_id: postId, Category_id: categoryId } = JSON.parse(event.body)

  const [result] = await dbController.query(
    'UPDATE Category SET name = ?, description = ?, Post_id = ?, Category_id = ? WHERE Category_id = ?',
    [name, description, postId, categoryId, id]
  ) as ResultSetHeader[]

  if (result.affectedRows === 0) return NotFound

  return OK
}

export const handler = errorHandler(modify)
