const Box = ({ style, children, onClick }) => {

    return (
        <div onClick={onClick} style={style} className="box">
            {children}
        </div>
    )
}

export default Box