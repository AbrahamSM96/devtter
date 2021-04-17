import { firestore } from 'firebase/admin'
export default (req, res) => {
  const { query } = req
  const { id } = query

  firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createAt } = data

      res.json({
        ...data,
        id,
        createAt: +createAt.toDate()
      })
    })
    .catch(() => {
      res.status(404).end()
    })
}
