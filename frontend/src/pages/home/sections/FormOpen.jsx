// react hooks
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

// componats
import Box from "../../../componants/layout/Box"

const FormOpen = () => {

    // data from store
    const { bookLoadSuccessStatus } = useSelector(state => state.bookLoads)
    const { role } = useSelector(state => state.auths)

    // react hooks navigate
    const navigate = useNavigate()

    // function for redirect based on condition
    const goToForm = () => {

        if (role === "admin") return navigate("/adduser")
        if (!bookLoadSuccessStatus) return
        return navigate("/addbookorder")
    }

    // style for form open
    const style = {
        border: "1px dashed gray",
        justifyCcontent: "center",
        alignItems: "center",
        fontSize: "80px",
        fontWeight: "bolder",
        color: "grey",
        cursor: "pointer",
    }


    return (
        <Box style={style} onClick={goToForm}>
            <div
                data-name={role === "admin" ? "Add Sevadar" : "Add Orders  "}
                className="fillFormIcon">+</div>
        </Box>
    )
}

export default FormOpen