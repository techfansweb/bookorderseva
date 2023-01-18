// react hooks
import { useSelector } from 'react-redux'

// componants
import Box from '../../../../componants/layout/Box'
import Title2 from '../../../../componants/title/Title2'
import Copy1 from './copyReports/Copy1'
import Copy2 from './copyReports/Copy2'
import Copy3 from './copyReports/Copy3'

const CopyReports = () => {

    // data from store
    const { role } = useSelector(state => state.auths)

    return (
        <Box>
            <Title2>📑 Copy Reports</Title2>
            <Copy1 />
            <Copy2 />
            {role === "admin" ? <Copy3 /> : null}
        </Box>
    )
}

export default CopyReports