

const FormHeader = () => {
    const headerName = "Untitled Form"
    const headerDescription = "Form Description"

    return (

        <div className="border-gray-700 min-w-[80vw]" >
        <div className="flex flex-col p-5 bg-white rounded my-2 focus:outline-none border-t-8 border-t-[rgb(103,58,183)] border-l-4 focus:border-l-[#4285f4] border-r-0 border-b-0" tabIndex="0">
            <input placeholder="Untitled Form" value={headerName} className=" rounded py-1 text-3xl"/>
            <input placeholder={headerDescription}/>
        </div>
        </div>


    )
}

export default FormHeader