
interface ButtonProps{
    text:string,
    onClick?:()=>void
    size:"sm" | "md"
}

const sizeClass = {
    sm: "w-[343px]  h-[52px] ",
    md: "w-[399px]  h-[59px] md:h-[59px]",
}

export const Button = (props:ButtonProps)=>{
    return <>
        <button className={`m-1 font-inter font-semibold text-lg ${sizeClass[props.size]}  bg-[#367AFF] rounded-md p-[16px] text-center text-white  `}>{props.text}</button>
    </>
}