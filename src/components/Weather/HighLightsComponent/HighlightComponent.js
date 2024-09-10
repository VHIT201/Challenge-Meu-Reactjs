import './highlightComponentStyles.css'
const HighlightComponent = ({ title, value, children}) => {
    return(
        <div className='highlight-component-container'>
            <h3 className='text title'>{title}</h3>
            <h2 className='text value'>{value}</h2>
            {children}
        </div>
    )
}

export default HighlightComponent;