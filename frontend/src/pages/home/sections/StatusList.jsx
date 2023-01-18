// react hooks
import { useSelector } from 'react-redux'


// custom hooks
import useFilterByMandal from '../../../hooks/useFilterByMandal'
import useSatusList from '../../../hooks/useStatusList'

// componants
import Box from '../../../componants/layout/Box'
import Title2 from '../../../componants/title/Title2'
import useDistrictList from '../../../hooks/useDistrictList'
import useNumber from '../../../hooks/useNumber'

const StatusList = () => {


    // data from store
    const { role, mandal } = useSelector(state => state.auths)
    const { todayData } = useSelector(state => state.bookLoads)

    // district with filter by mandal
    const districtArray = useDistrictList(mandal)

    // getting filling list
    const fillMandalData = useFilterByMandal(todayData, mandal)

    // status list
    const statusListMandal = useSatusList(districtArray, fillMandalData, "mandal")
    const statusListState = useSatusList("", "", "state", todayData)

    return (
        <Box>
            <Title2>👨‍💼 Status  ({role === "admin" ? statusListState[1] : statusListMandal[1]})</Title2>
            {
                role === "admin" ?
                    statusListState[0].map((item, i) => <StatusListBox key={i} sn={useNumber(i + 1, 10)} data={item} />) :
                    statusListMandal[0].map((item, i) => <StatusListBox key={i} sn={useNumber(i + 1, 10)} data={item} />)
            }
        </Box>
    )
}

const StatusListBox = ({ children, data, sn }) => {

    return (
        <div className="statusListBox">
            <span style={{ marginRight: "10px" }}>{sn}</span>
            <span>{data.district}</span>
            <span>{data.status}</span>
        </div>
    )
}

export default StatusList