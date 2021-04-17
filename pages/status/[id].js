import Devit from 'components/Devit'
import { firestore } from 'firebase/admin'
import { useRouter } from 'next/router'
export default function DevitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Loading...</h1>
  // obtenemos la id
  console.log(props, 'idddd')
  return (
    <>
      <Devit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '' } }],
    fallback: true
  }
}

export async function getStaticProps(context) {
  // obtenemos la query
  const { params } = context
  // obtenemos el id de la query
  const { id } = params

  return firestore
    .collection('devits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createAt } = data

      const props = {
        ...data,
        id,
        createAt: +createAt.toDate()
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// renderizar desde el servidor o rehidratar informacion, en este caso el component Devit
// export async function getServerSideProps(context) {
//   // obtenemos la query
//   const { params, res } = context
//   // obtenemos el id de la query
//   const { id } = params
//   console.log(id, 'id')
//   const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props: props }
//   }
//   if (res) {
//     res.writeHead(301, { Location: '/home' }).end()
//   }
// }

// con getInitialProps podemos obtener los datos del servidor y servirlos en el cliente
// basicamente es renderizar en el servidor
// DevitPage.getInitialProps = (context) => {
//   // obtenemos la query
//   const { query, res } = context
//   // obtenemos el id de la query
//   const { id } = query
//   console.log(id, 'id')
//   return fetch(`http://localhost:3000/api/devits/${id}`).then((apiResponse) => {
//     if (apiResponse.ok) return apiResponse.json()
//     if (res) {
//       res.writeHead(301, { Location: '/home' }).end()
//     }
//   })
// }
