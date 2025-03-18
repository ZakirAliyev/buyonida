import { ColorPicker, ConfigProvider } from "antd";

const CustomColorPicker = ({
                               value,
                               onChange,
                               onFormatChange,
                               format = "hex",
                               allowClear = true,
                           }) => {
    // value string değilse, hex string'e çevirip alpha varsa kaldırıyoruz.
    let formattedValue = "";
    if (typeof value === "string") {
        formattedValue = value;
    } else if (value && value.toHexString) {
        formattedValue = value.toHexString();
        // Eğer hex string 9 karakterliyse (örneğin "#RRGGBBAA"), sadece ilk 7 karakteri alarak alpha'yı kaldırıyoruz.
        if (formattedValue.length === 9) {
            formattedValue = formattedValue.slice(0, 7);
        }
    }

    return (
        <ConfigProvider>
            <ColorPicker
                value={formattedValue}
                format={format}
                allowClear={allowClear}
                onChange={(color) => {
                    let hex = color?.toHexString ? color.toHexString() : color;
                    if (hex && hex.length === 9) {
                        hex = hex.slice(0, 7); // opacity kısmını kaldırıyoruz
                    }
                    onChange && onChange(hex);
                }}
                onFormatChange={onFormatChange}
            />
        </ConfigProvider>
    );
};

export default CustomColorPicker;
