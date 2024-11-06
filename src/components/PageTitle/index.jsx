import './pageTitle.css'
const PageTitle = ({ title,icon }) => {
    return (
        <div style={{width: '100%'}}>
            <div className="PageTitle-header">
                {/* {icon} */}
                <h2>{title}</h2>
            </div>
        </div>
    )
}

export default PageTitle;