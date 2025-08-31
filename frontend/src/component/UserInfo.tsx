export const UserInfo = ()=>{
    const user = localStorage.getItem("name");
    const email = localStorage.getItem("email");

    return  <div className="w-94 mt-16 mb-9">
                <div className="border-1 p-4 gap-2.5 border-[#D9D9D9] rounded-md shadow-[0px_2px_6px_0px_#00000096]">
                    <div className="font-bold text-[22px] leading-[250%] text-[#232323] font-inter">`Welcome, {user} !</div>
                    <div className="font-normal font-inter leading-[250%] " >`Email: {email}</div>
                </div>
            </div>
}