// import { InMemoryCache } from 'apollo-cache-inmemory'

let token = localStorage.getItem('token')

if (token) {
  token = `Bearer ${token}`
} else {
  token = ''
}

// Get token and set in bearer in authorization
// const getHeaders = () => {
//   const headers = {}

//   if (token) {
//     headers.authorization = `Bearer ${token}`
//   }
//   return headers
// }

// export default function (context) {
//   return {
//     httpLinkOptions: {
//       uri: 'http://localhost:8080/v1/graphql',
//       credentials: 'same-origin',
//       headers: getHeaders(),
//     },
//     cache: new InMemoryCache(),
//     wsEndpoint: 'ws://localhost:8080/v1/graphql',
//     // headers: getHeaders(),
//   }
// }

export default function (context) {
  return {
    httpEndpoint: 'https://contact-app.hasura.app/v1/graphql',

    /*
     * For permanent authentication provide `getAuth` function.
     * The string returned will be used in all requests as authorization header
     */
    getAuth: () => token,
  }
}
