

interface Input_props{
    ref?:React.Ref<HTMLInputElement>
    label?:string,
    type:string,
    placeholder?:string,
    size:"sm" | "md"
}

const sizeClass = {
    sm: "w-[343px]  h-[52px] ",
    md: "w-[343px]  h-[59px] md:h-[59px]",
}


const variantClass = {
    default:"text-lg font-inter p-[16px] border border-[#D9D9D9] bg-white shadow-sm focus:shadow-md focus:bg-whit rounded-md text-md",
    outline: "focus:outline-none focus:ring-2 focus:ring-[#367AFF] focus:border-transparent"
}

const for_date = `px-12 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:left-3 [&::-webkit-calendar-picker-indicator]:right-auto [&::-webkit-calendar-picker-indicator]:cursor-pointer`
export const Input_field = (props:Input_props)=>{
    return <>
        <div className="relative">

        <br></br>
        <input ref={props.ref} id={`${props.label}`} name={`${props.label}`} className={ ` ${props.type=='date' ? for_date : ""} peer ${variantClass.default} ${variantClass.outline } ${sizeClass[props.size]}]}`} type={props.type} placeholder={props.placeholder} />
        <label className='text-md bg-white  px-1 absolute peer-focus:text-[#367AFF] top-2.5 left-3 text-[#D9D9D9]'>{props.label}</label>  
        </div>
    </>
}