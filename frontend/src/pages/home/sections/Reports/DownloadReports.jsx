// componants
import Box from '../../../../componants/layout/Box'
import Title2 from '../../../../componants/title/Title2'
import Image from './downloadReports/Image'
import Pdf from './downloadReports/Pdf'

const DownloadReports = () => {

    return (
        <Box style={{ gap: "5px" }}>
            <Title2>📑 Download Reports</Title2>
            <Image />
            <Pdf />
        </Box>
    )
}

export default DownloadReports