// react hooks
import { useState } from 'react'

// componants
import Button from '../../../componants/button/Button'
import InputBox from '../../../componants/inputBox/InputBox'
import Box from '../../../componants/layout/Box'
import Title2 from '../../../componants/title/Title2'

// custom hooks
import baseUrl from '../../../hooks/useBaseUrl'
import isProd from '../../../isProd'

// functions
import { updateData } from '../../../hooks/useLocalStorage'

const TimeSetting = ({ loading, timeInputData }) => {

    // use state for input values changes
    const [timeInput, setTimeInput] = useState(timeInputData)
    const [formOpen, setFormOpen] = useState(false)
    const [formClose, setFormClose] = useState(false)
    const [reportClose, setReportClose] = useState(false)

    // style for wrapper of input and button
    const style = {
        width: "100%",
        display: "flex",
        gap: "10px"
    }

    // style for input
    const inputBoxStyle = {
        fontSize: "15px",
        padding: "5px"
    }

    // style for button
    const buttonStyle = {
        fontSize: "15px",
        padding: "5px",
        border: "1px solid blueviolet",
        backgroundColor: "white",
        color: "blueviolet",
        width: "100%"
    }

    // time submit data to server
    const submitData = async () => {

        if (isProd) {
            await baseUrl.post("/timesetting/update", timeInput)
        } else {
            updateData("time", timeInput)
        }
    }

    // function for setting value on input change
    const changeTimeInput = (e) => {
        setTimeInput({ ...timeInput, [e.target.name]: e.target.value })
    }

    // function for form open submit
    const submitFormOpen = async () => {

        setFormOpen(true)
        await submitData()
        setFormOpen(false)
    }

    // function for form close submit
    const submitFormClose = async () => {

        setFormClose(true)
        await submitData()
        setFormClose(false)
    }

    // function for report close submit
    const submitReportClose = async () => {

        setReportClose(true)
        await submitData()
        setReportClose(false)
    }

    return (
        <Box>
            <Title2>👨‍💼 Time Settings</Title2>

            {/* input box for form open */}
            <div style={style}>
                <InputBox
                    names="formOpen"
                    onChange={changeTimeInput}
                    style2={{ width: "50%" }}
                    style={inputBoxStyle}
                    type="time"
                    value={loading ? timeInput.formOpen : "00:00"}
                >Select Form Open Time</InputBox>
                <Button func={submitFormOpen} style={buttonStyle}>
                    {formOpen ? "Updating..." : "Form Open Time"}
                </Button>
            </div>

            {/* input box for form close */}
            <div style={style}>
                <InputBox
                    names="formClose"
                    onChange={changeTimeInput}
                    style2={{ width: "50%" }}
                    style={inputBoxStyle}
                    type="time"
                    value={loading ? timeInput.formClose : "00:00"}
                >Select Form Close Time</InputBox>
                <Button func={submitFormClose} style={buttonStyle}>
                    {formClose ? "Updating..." : "Form Close Time"}
                </Button>
            </div>

            {/* input box for report close */}
            <div style={style}>
                <InputBox
                    names="reportClose"
                    value={loading ? timeInput.reportClose : "00:00"}
                    onChange={changeTimeInput}
                    style2={{ width: "50%" }}
                    style={inputBoxStyle}
                    type="time"
                >Select Report Close Time</InputBox>
                <Button func={submitReportClose} style={buttonStyle}>
                    {reportClose ? "Updating..." : "Report Close Time"}
                </Button>
            </div>
        </Box>
    )
}

export default TimeSetting