const RightArrow = ({color}) => {
    return (
        <div className={`w-2 h-2 border-2 border-b-0 border-l-0 border-t-${color} border-r-${color} rotate-45`}/>
    );
};

export default RightArrow;