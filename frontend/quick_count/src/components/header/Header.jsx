import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className={"min-h-[10vh] p-2"}>
            <div className={"text-white rounded-xl bg-main py-4 ps-4 md:ps-8 pe-4 flex flex-col md:flex-row gap-2 md:gap-8 justify-between"}>
                <Link to={"/"} className={"font-header font-bold text-xl md:text-2xl"}>
                    Muhibbin Mas Kiai
                </Link>
                <div className={"flex gap-4 items-center font-medium"}>
                    <Link to={"detail"} className={"px-4 py-1 bg-white text-main rounded-lg font-light text-xl md:p-0 md:bg-transparent md:text-white"}>Detail hasil Suara</Link>
                    <Link to={"login"} className={"px-4 py-1 bg-white text-main rounded-lg font-medium"}>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Header;