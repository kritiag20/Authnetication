import { useContext } from 'react'
import AuthContext from './AuthConfig'

const useAuth = () => useContext(AuthContext)

export default useAuth
