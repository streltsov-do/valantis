import { InputType } from "zlib";
import { Div, InputValue, LabeledInput, LabelRadio } from "./style/FilterBlock";

interface IntProps {
    radioTitle: string;
    radioValue: string;
    handleChangeRadio: React.ChangeEventHandler<HTMLInputElement>;
    radioChecked: boolean;
    inputType?: React.HTMLInputTypeAttribute;
    inputValue?: string | number;
    inputCallback?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputPlaceholder?: string;
}

export const FilterBlock = (props: IntProps) => {
    const {
        radioTitle,
        radioValue,
        handleChangeRadio,
        radioChecked,
        inputType,
        inputValue,
        inputCallback,
        inputPlaceholder,
    } = props;

    const idRadio = `filterBlock__${radioValue}__Radio`;
    const idInput = `filterBlock__${radioValue}__Input`;

    return (
        <Div>
            <LabeledInput>
                <input
                    type="radio"
                    name={radioValue}
                    id={idRadio}
                    value={radioValue}
                    onChange={handleChangeRadio}
                    checked={radioChecked}
                />
                <LabelRadio htmlFor={idRadio} maxContent={inputType === ""}>
                    {radioTitle}
                </LabelRadio>
            </LabeledInput>
            {inputType && (
                <InputValue
                    id={idInput}
                    type={inputType}
                    value={inputValue}
                    onChange={inputCallback}
                    disabled={!radioChecked}
                    placeholder={inputPlaceholder}
                    min={0}
                />
            )}
        </Div>
    );
};
