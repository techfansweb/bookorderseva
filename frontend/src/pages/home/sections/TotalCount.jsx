// react hooks
import { useSelector } from "react-redux"
import Title2 from "../../../componants/title/Title2"

// custom hooks
import useNumber from "../../../hooks/useNumber"

const TotalCount = () => {

    // data from store
    const { todayCount, bookLoadSuccessStatus } = useSelector(state => state.bookLoads)


    return (
        <div className="totalData">
            <Box
                title="📄 Posts"
                title1="National"
                title2="InterNatinal"
                value1={
                    bookLoadSuccessStatus ? useNumber(todayCount.npost, 10) : "00"
                }
                value2={
                    bookLoadSuccessStatus ? useNumber(todayCount.ipost, 10) : "00"
                }
                bg="orange"
            />
            <Box
                title="📚 Orders"
                title1="National"
                title2="InterNatinal"
                value1={
                    bookLoadSuccessStatus ? useNumber(todayCount.norder, 10) : "00"
                }
                value2={
                    bookLoadSuccessStatus ? useNumber(todayCount.iorder, 10) : "00"
                }
                bg="blueviolet"
            />
        </div>
    )
}


const Box = ({ title, title1, title2, value1, value2, bg }) => {

    // style for gap to box
    const style = {
        width: "100%",
        display: "flex",
        gap: "10px"
    }

    return (
        <div style={{ backgroundColor: bg }} className="posts">
            <Title2 color="White">{title}</Title2>
            <div style={style}>
                <Box4 title={title1} value={value1} />
                <Box4 title={title2} value={value2} />
            </div>
        </div >
    )
}

const Box4 = ({ title, value }) => {

    return (
        <div className="box4">
            <span style={{ fontSize: "13px" }}>{title}</span>
            <span style={{ fontSize: "30px" }}>{value}</span>
        </div>
    )
}
export default TotalCount