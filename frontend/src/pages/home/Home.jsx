import "./home.scss"
import "../../componants/imageReport/imageReport.scss"

// react hooks
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

// custom hooks
import useDistrictList from "../../hooks/useDistrictList"
import useMandalList from "../../hooks/useMandalList"
import { useLoadBookData } from "../../hooks/useBookData"
import useFilterByMandal from "../../hooks/useFilterByMandal"

// componants
import Layout from "../../componants/layout/Layout"

// functions
import isProd from "../../isProd"
import baseUrl from "../../hooks/useBaseUrl"
import useTitleTag from "../../hooks/useTitleTag"
import GuruJiImage from "./sections/GuruJiImage"
import TimeSetting from "./sections/TimeSetting"
import FormOpen from "./sections/FormOpen"
import StatusList from "./sections/StatusList"
import Redirect from "./sections/Redirect"
import TotalCount from "./sections/TotalCount"
import CopyReports from "./sections/Reports/CopyReports"
import DownloadReports from "./sections/Reports/DownloadReports"
import useTimeSetting from "../../hooks/useTimeSetting"

const Home = () => {


    // change title of this page
    useTitleTag("Book Order Seva")

    // use selector
    const { fullname, number, role, mandal } = useSelector(state => state.auths)
    const { allBookData, todayData, todayCount, bookLoadSuccessStatus } = useSelector(state => state.bookLoads)
    const { bookAddSuccessStatus } = useSelector(state => state.bookAdds)

    const dispatch = useDispatch()

    // custom hooks
    const mandalsArray = useMandalList()
    const districtArray = useDistrictList(mandal)
    const fillMandalData = useFilterByMandal(todayData, mandal)

    useEffect(() => {

        // load data when page loaded
        if (!allBookData[0] || bookAddSuccessStatus) {
            useLoadBookData(dispatch, role, mandal, false)
        }
    }, [bookAddSuccessStatus])

    // time setting data loaading from server......................
    const [loadTimeSettingData, setLoadTimeSettingData] = useState(false)
    const [timeSettingData, setTimeSettingData] = useState({})
    const [formOpen, setFormOpen] = useState(false)
    const [reportOpen, setReportOpen] = useState(false)

    useState(() => {

        const loadTimeSettingData = async () => {

            let timeSettingData

            // call api for loading time setting data
            if (isProd) {
                const { data } = await baseUrl.get("/timesetting")
                timeSettingData = data
            } else {
                timeSettingData = JSON.parse(localStorage.getItem("time"))
            }

            // set time setting data
            if (!timeSettingData) return
            setTimeSettingData(timeSettingData)

            // setting form open or report open
            const [formOpen, reportOpen] = useTimeSetting(timeSettingData)
            setFormOpen(formOpen)
            setReportOpen(reportOpen)

            // set true when success loding data
            setLoadTimeSettingData(true)
        }

        // call function only run 1 time when loading page
        loadTimeSettingData()
    }, [])

    return (
        <>
            <Layout>
                <div className="home">
                    <GuruJiImage />
                    <TotalCount />

                    {
                        role === "user" && (districtArray[0]?.length == fillMandalData?.length || !formOpen) ? null :
                            <FormOpen />
                    }

                    {
                        role === "user" && !formOpen ? null :
                            <StatusList />
                    }

                    {
                        role === "admin" ?
                            <TimeSetting
                                timeInputData={timeSettingData}
                                loading={loadTimeSettingData}
                            /> : null
                    }

                    {
                        role === "user" && (districtArray[0].length !== fillMandalData?.length || !reportOpen) ? null :
                            <CopyReports />
                    }
                    {
                        role === "admin" ? <DownloadReports /> : null
                    }
                    <Redirect />
                </div>
            </Layout>
        </>
    )
}

export default Home