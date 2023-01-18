import MandalList from "../mandalList"
import useFilterByMandal from "./useFilterByMandal"
import useMandalList from "./useMandalList"

const useSatusList = (realArray, fillArray, type, fillArrayAll) => {

    let arr
    let realLength
    let fillLength
    const mandalsArray = useMandalList()

    if (type == "mandal") {

        // map on district lists
        arr = realArray[0].map(district => {

            let obj = {}
            let distrcitName

            if (fillArray) {
                // map on fill list
                fillArray.map(item => {
                    if (district == item.district) {
                        distrcitName = item.district
                    }
                })
            }

            if (distrcitName) {
                obj.district = district
                obj.status = "✔️"
            } else {
                obj.district = district
                obj.status = "❌"
            }
            return obj
        })
    } else {

        arr = mandalsArray.map(eachMandal => {

            let obj = {}

            // find real length
            MandalList.map(realMandal => {
                if (!realMandal[eachMandal]) return
                realLength = realMandal[eachMandal].length
            })

            fillLength = useFilterByMandal(fillArrayAll, eachMandal)?.length

            if (fillLength == realLength) {
                obj.district = eachMandal
                obj.status = "✔️"
            } else {
                obj.district = eachMandal
                obj.status = "❌"
            }

            return obj
        })
    }

    const filter1 = arr.filter(value => {
        return value.status == "❌"
    })

    const filter2 = arr.filter(value => {
        return value.status == "✔️"
    })

    arr = [...filter2, ...filter1]
    return [arr, filter2?.length || 0]
}

export default useSatusList