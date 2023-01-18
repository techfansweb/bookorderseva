// react hooks
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// componants
import Button from '../../../componants/button/Button'
import Box from '../../../componants/layout/Box'

// functions
import { logoutStart } from '../../../store/authSlice'
import { bookLoadRemove } from '../../../store/bookLoadSlice'

const Redirect = () => {

    // data from store
    const { role } = useSelector(state => state.auths)

    // react hooks
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // redirect to book data page
    const viewBookData = () => {
        navigate("/viewbookdata")
    }

    // redirect to all user data
    const viewUserData = () => {
        navigate("/viewuserdata")
    }

    // redirect to login page
    const logout = () => {

        localStorage.removeItem("auth")
        dispatch(bookLoadRemove())
        dispatch(logoutStart())
    }


    return (
        <Box>
            <Button func={viewBookData}>View All Book Data</Button>
            {role === "admin" ? <Button func={viewUserData}>View All User Data</Button> : null}
            <Button func={logout}>Logout</Button>
        </Box>
    )
}

export default Redirect