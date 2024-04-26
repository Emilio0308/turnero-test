import { FadeLoader } from "react-spinners";

const LoadingLayout = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white">
            
            <FadeLoader color="#5F3CAA" />
        </div>
    );
};

export default LoadingLayout;
