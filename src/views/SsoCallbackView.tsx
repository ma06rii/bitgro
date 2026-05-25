// Callback target for Clerk OAuth redirects.
// Mounted at /sso-callback so signIn/signUp.authenticateWithRedirect can hand
// control back to Clerk to finalize the session, then send the user to "/".

import { AuthenticateWithRedirectCallback } from '@clerk/react'

export default function SsoCallbackView() {
  return (
    <AuthenticateWithRedirectCallback
      signInFallbackRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    />
  )
}
