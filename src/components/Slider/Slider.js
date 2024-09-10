import ProgressBar from "@ohaeseong/react-progress-bar";
import "./SliderStyles.css";

const Slider = ({ value, unit }) => {
    // Hàm loại bỏ đơn vị và chỉ lấy số
    const extractNumber = (value) => {
        return parseFloat(value); // Sử dụng parseFloat để lấy phần số, trong trường hợp có phần thập phân.
    };

    const numericValue = extractNumber(value); // Lấy số từ giá trị "84%"


    return (
        <div className="slider-container">
            <div className="list-degree">
                <h5 className="list-degree-text">0</h5>
                <h5 className="list-degree-text">100</h5>
            </div>
            <ProgressBar
                height="10px"
                labelVisible={false}
                trackColor={'#FFEC65'}
                value={numericValue} // Sử dụng giá trị số đã được lọc
                max={100}
                width="200px"
                borderRadius="10px"
            />
            <div className="list-degree-unit-container">
                <h5 style={{ color: "white" }}>{unit || "%"}</h5>
            </div>
        </div>
    );
};

export default Slider;
