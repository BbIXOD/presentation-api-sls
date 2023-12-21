import dbController from "./dbController.js"

export default async (text: string) => {
  const querries = text.split(';')
  querries
    .filter(query => query.length > 0)
    .map(query => query.trim())
  for (const query of querries) await dbController.query(query)
}