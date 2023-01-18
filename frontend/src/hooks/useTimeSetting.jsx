const useTimeSetting = (data) => {

    // now timing
    const nowTime = new Date().getTime()
    const formOpenTime = getTime(data.formOpen)
    const formCloseTime = getTime(data.formClose)
    const reportCloseTime = getTime(data.reportClose)

    let formOpen = false
    let reportOpen = false

    // form open condition
    if (nowTime > formOpenTime && nowTime < formCloseTime) formOpen = true

    // report open condition
    if (nowTime < reportCloseTime) reportOpen = true

    return [formOpen, reportOpen]
}

const getTime = (type) => {

    // server timing
    const serverMin = +String(type).split(":")[1]
    const serverHour = +String(type).split(":")[0]

    // setting time on server time
    const serverTime = new Date()
    serverTime.setHours(serverHour, serverMin)

    return serverTime.getTime()
}

export default useTimeSetting