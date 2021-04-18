import firebase from 'firebase'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// Codigo que nos proporciona nuestra cuenta firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCGGn3dVGucpB3ZsuEOdt1askjoP7Lv98g',
  authDomain: 'devtter-f85c8.firebaseapp.com',
  projectId: 'devtter-f85c8',
  storageBucket: 'devtter-f85c8.appspot.com',
  messagingSenderId: '827877724970',
  appId: '1:827877724970:web:b7dc74419b07e74d644453',
  measurementId: 'G-BPCW7CF764'
}
// const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
// Inicializamos firebase
// esta comprobacion es para el hot reload de nextjs
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName, uid } = user

  return {
    avatar: photoURL,
    email: email,
    userName: displayName,
    uid
  }
}

// Le indicamos a firebase si hay una sesion iniciada, si si la hay que no me pida volver a logearme
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

// Loggearnos con github
export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((user) => {
      return mapUserFromFirebaseAuthToUser(user)
    })
}
// Agregamos un tweet
export const addDevit = ({ avatar, content, userId, userName, img }) => {
  return db.collection('devits').add({
    avatar,
    content,
    img,
    userId,
    userName,
    createAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createAt } = data

  return {
    ...data,
    id,
    createAt: +createAt.toDate()
  }
}
// Escuchamos si algun Devit se agrega para hacerlo en tiempo real
export const listenLatestDevits = (callback) => {
  return (
    db
      .collection('devits')
      .orderBy('createAt', 'desc')
      // .limit(1)
      .onSnapshot(({ docs }) => {
        const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
        callback(newDevits)
      })
  )
}

// Consultamos a firebase para mostrar los tweets
// export const fetchLatestDevits = () => {
//   return db
//     .collection('devits')
//     .orderBy('createAt', 'desc')
//     .get()
//     .then(({ docs }) => {
//       return docs.map((doc) => {
//         return mapDevitFromFirebaseToDevitObject(doc)
//       })
//     })
// }

export const uploadImage = (file) => {
  // Recuperamos la referencia al storage,
  const ref = firebase.storage().ref(`images/${file.name}`)
  // put hara que lo que le pasemos se lo mande a la referencia
  // task tiene muchas cosas por dentro, se puede hacer una barra de progreso con eso o escuchar eventos
  const task = ref.put(file)
  return task
  // despues de esto tenemos que ir a firebase/storage y activar el storage
}
