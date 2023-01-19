// react hooks
import { useSelector } from 'react-redux'

// componants
import ImageReport from '../../../../../componants/imageReport/ImageReport'

// library
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

// custom hooks
import useSortData from '../../../../../hooks/useSortData'
import { useTotalBooksMandal } from '../../../../../hooks/useTotalBooks'
import { useState } from 'react'
import Button from '../../../../../componants/button/Button'
import dayjs from 'dayjs'

const Pdf = () => {

    // use state for download text changing
    const [download, setDownload] = useState(false)
    const { mandal } = useSelector(state => state.auths)

    // data from store
    const { todayCount, todayData } = useSelector(state => state.bookLoads)

    // setting data to cvt pdf
    const dataToFormet = useTotalBooksMandal(todayData, mandal, true)
    const sortData = useSortData(dataToFormet)

    const sortData1 = sortData.slice(0, 20)
    const sortData2 = sortData.slice(20, 42)
    const sortData3 = sortData.slice(42, 64)
    const sortData4 = sortData.slice(64, 75)

    // style for gap to box
    const style = {
        width: "100%",
        display: "flex",
        gap: "10px"
    }

    // cvt html to canvas
    const convertHtmlToCanvas = async (html) => {

        // covert to canvas
        const canvas = await html2canvas(html)
        return canvas.toDataURL("jpg/jpeg", 0.5)
    }

    // downlaod report
    const downloadReport = async () => {

        setDownload(true)

        const pdf = new jsPDF({
            orientation: "p",
            compress: true
        });

        // page 1
        const image1 = await convertHtmlToCanvas(document.getElementById("reportImage2"))
        pdf.addImage(image1, 'JPEG', 0, 0, 210, 300)

        pdf.addPage() // add new page

        // page 2
        const image2 = await convertHtmlToCanvas(document.getElementById("reportImage3"))
        pdf.addImage(image2, 'JPEG', 0, 0, 210, 300)

        pdf.addPage() // add new page

        // page 3
        const image3 = await convertHtmlToCanvas(document.getElementById("reportImage4"))
        pdf.addImage(image3, 'JPEG', 0, 0, 210, 300)

        pdf.addPage() // add new page

        // page 4
        const image4 = await convertHtmlToCanvas(document.getElementById("reportImage5"))
        pdf.addImage(image4, 'JPEG', 0, 0, 210, 300)

        // save file
        const title = `upBookOrderReport.${dayjs().format("DD-MM-YYYY")}.pdf`
        pdf.save(title)
        setDownload(false)
    }

    return (
        <>
            <div className="hiddenReport">
                <ImageReport sr="1" sn={true} id="reportImage2" data={sortData1} count={todayCount} isCount={false} />
                <ImageReport sr="21" sn={false} id="reportImage3" data={sortData2} count={todayCount} isCount={false} />
                <ImageReport sr="43" sn={false} id="reportImage4" data={sortData3} count={todayCount} isCount={false} />
                <ImageReport sr="65" sn={false} id="reportImage5" data={sortData4} count={todayCount} isCount={true} />
            </div>
            <div style={style}>
                <Button func={downloadReport} >
                    {download ? "Downloding..." : "All District Report (Pdf)"}
                </Button>
            </div>
        </>
    )
}

export default Pdf