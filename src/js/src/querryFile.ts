import dbController from './dbController.js'

export default async (text: string) => {
  const querries = text.split(';')
  const prepared = querries
    .map(query => query.trim())
    .filter(query => query.length > 0)
  for (const query of prepared) await dbController.query(query)
}
