// react hooks
import { useState } from "react"
import { useSelector } from "react-redux"

// library
import dayjs from "dayjs"
import html2canvas from "html2canvas"

// components
import Button from "../../../../../componants/button/Button"

// custom hooks
import { useTotalBooksMandal } from "../../../../../hooks/useTotalBooks"
import useSortData from "../../../../../hooks/useSortData"
import ImageReport from "../../../../../componants/imageReport/ImageReport"

const Image = () => {

    // use state for download text changing
    const [download, setDownload] = useState(false)

    // data from store
    const { todayCount, todayData } = useSelector(state => state.bookLoads)

    // data formeting
    const dataToFormet = useTotalBooksMandal(todayData)
    const sortData = useSortData(dataToFormet)

    // style for gap to box
    const style = {
        width: "100%",
        display: "flex",
        gap: "10px"
    }

    // function for download report in image
    const downloadReport = async () => {

        setDownload(true)

        // creating html to canvas to data url
        const canvas = await html2canvas(document.getElementById("reportImage1"))
        const link = canvas.toDataURL("jpg/jpeg", 1.0)

        // create anchor tag
        const a = document.createElement("a")
        a.href = link
        a.download = `upBookOrderReport.${dayjs().format("DD-MM-YYYY")}.jpeg`
        a.click()
        setDownload(false)
    }

    return (
        <>
            <div className="hiddenReport">
                <ImageReport
                    style={{ transform: "scale(1)" }}
                    sr="1" sn={true}
                    id="reportImage1"
                    data={sortData}
                    count={todayCount}
                    isCount={true}
                />
            </div>
            <div style={style}>
                <Button func={downloadReport} >
                    {download ? "Downloding..." : "All Mandal Report (Image)"}
                </Button>
            </div>
        </>
    )
}

export default Image