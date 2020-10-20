import { App, Credentials } from 'realm-web'
import 'isomorphic-fetch'

const APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID || ''

export const REALM_GRAPHQL_ENDPOINT = `https://realm.mongodb.com/api/client/v2.0/app/${APP_ID}/graphql`

const app = new App({
  id: APP_ID,
  baseUrl: 'https://realm.mongodb.com',
})

export const generateAuthHeader = async (): Promise<{ Authorization: string }> => {
  if (!app.currentUser) {
    // If no user is logged in, log in an anonymous user
    await app.logIn(Credentials.anonymous())
  } else {
    // The logged in user's access token might be stale,
    // Refreshing custom data also refreshes the access token
    await app.currentUser.refreshCustomData()
  }
  // Get a valid access token for the current user
  const accessToken = app.currentUser?.accessToken || ''

  // Set the Authorization header, preserving any other headers
  return {
    Authorization: `Bearer ${accessToken}`,
  }
}
