const useFilterByMandal = (data, mandalName) => {

    // if no data then return
    if (!data || !data.length) return

    // filter data by mandal
    const filterData = data.filter(value => {
        return value.mandal === mandalName
    })

    return filterData
}

export default useFilterByMandal