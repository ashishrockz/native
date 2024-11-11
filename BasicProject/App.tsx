import { AuthProvider } from "./src/Hooks/Authentication"
import MainNavigation from "./src/navigations/MainNavigation"
const App = () => {
  return (
   <AuthProvider>
    <MainNavigation />
   </AuthProvider>
  )
}

export default App