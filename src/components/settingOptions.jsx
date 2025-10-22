
const SettingOptions = (props) => {
    const {title, subtitle, extendComponent, optionClass=''} = props
    return (
        <div className={`flex flex-row w-full justify-between items-center ${optionClass}`}>
            <div className="flex flex-col items-start">
                <h1 className="font-normal text-sm">{title}</h1>
                <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
            <div>
                {extendComponent}
            </div>
        </div>
    )
}

export default SettingOptions;