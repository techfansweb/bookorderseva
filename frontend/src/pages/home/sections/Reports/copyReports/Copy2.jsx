// react hooks
import { useSelector } from "react-redux"
import { useRef } from "react"

// componants
import Button from "../../../../../componants/button/Button"

// custom hooks
import useCopy from "../../../../../hooks/useCopy"
import useNumber from "../../../../../hooks/useNumber"
import { useTotalBooksMandal } from "../../../../../hooks/useTotalBooks"
import useSortData from "../../../../../hooks/useSortData"
import useReportFormet from "../../../../../hooks/useReportFormet"

// library
import dayjs from "dayjs"

const Copy2 = () => {

    // data from store
    const { role, mandal } = useSelector(state => state.auths)
    const { todayCount, todayData } = useSelector(state => state.bookLoads)

    // button text based on role
    const buttonText = role === "admin" ? "All Mandal Report" : "All District Report"

    // react hook
    const copyRef = useRef(null)

    // style for gap to box
    const style = {
        width: "100%",
        display: "flex",
        gap: "10px"
    }

    const copyReport = async () => {

        const date = dayjs().format("DD-MMM-YYYY")
        const reportOf = role === "admin" ? "State" : "Mandal"
        const capMandalName = mandal.slice(0, 1).toLocaleUpperCase() + mandal.slice(1)
        const reportOfLoaction = role === "admin" ? "Uttar Pradesh" : capMandalName
        const dataToFormet = role == "admin" ? useTotalBooksMandal(todayData) : useTotalBooksMandal(todayData, mandal)
        const sortData = useSortData(dataToFormet)
        const data = useReportFormet(sortData).toString().replace(/,/g, "")

        const text = `Sat Saheb Ji
Satguru Dev Ji Ki Jay
        
🔸Date : *${date}*
🔸${reportOf} : *${reportOfLoaction}*

${data}
..............................
🧾 National Order : *${useNumber(todayCount.norder, 10)}*
🧾 InterNational Order : *${useNumber(todayCount.iorder, 10)}*
..............................

*❌ Do Not Copy Paste ❌*
`

        await useCopy(text, copyRef, buttonText)
    }

    return (
        <div style={style}>
            <Button buttonRef={copyRef} func={copyReport} >
                {buttonText}
            </Button>
        </div>
    )
}

export default Copy2