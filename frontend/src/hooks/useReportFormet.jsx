import useNumber from "./useNumber"

const useReportFormet = (data) => {

    const arr = data.map((item, i) => {

        const sn = useNumber(i + 1, 10)
        const norder = useNumber(item.norder, 100)
        const iorder = useNumber(item.iorder, 100)
        const name = item.name.slice(0, 1).toUpperCase() + item.name.slice(1)
        const text = `${sn}. | *${norder}* - *${iorder}* | ${name}\n`
        return text
    })

    const head = `        *N O* - *I O*\n`
    arr.unshift(head)

    return arr
}

export default useReportFormet