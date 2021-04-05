import firebase from 'firebase/app'
import 'firebase/auth'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
//Codigo que nos proporciona nuestra cuenta firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCGGn3dVGucpB3ZsuEOdt1askjoP7Lv98g',
  authDomain: 'devtter-f85c8.firebaseapp.com',
  projectId: 'devtter-f85c8',
  storageBucket: 'devtter-f85c8.appspot.com',
  messagingSenderId: '827877724970',
  appId: '1:827877724970:web:b7dc74419b07e74d644453',
  measurementId: 'G-BPCW7CF764'
}
//Inicializamos firebase
//esta comprobacion es para el hot reload de nextjs
!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { photoURL, email, displayName } = user

  return {
    avatar: photoURL,
    email: email,
    username: displayName
  }
}

//Le indicamos a firebase si hay una sesion iniciada, si si la hay que no me pida volver a logearme
export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = mapUserFromFirebaseAuthToUser(user)
    onChange(normalizedUser)
  })
}

//Loggearnos con github
export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(githubProvider)
    .then((user) => {
      return mapUserFromFirebaseAuthToUser(user)
    })
}
