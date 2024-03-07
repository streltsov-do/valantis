import { TypeFieldExt } from "../../utils/types";
import { FilterBlock } from "../FilterBlock/FilterBlock";
import {
    Div,
    Controls,
    NotAccepted,
    Params,
    Submit,
    Title,
} from "./style/Filters";

interface IntProps {
    accepted: boolean;
    handleSubmit: () => void;
    changeFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
    filterArr: (
        | {
              radioTitle: string;
              radioValue: string;
              inputType: string;
              inputValue: string;
              inputCallback?: undefined;
          }
        | {
              radioTitle: string;
              radioValue: string;
              inputType: string;
              inputValue: string;
              inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
          }
        | {
              radioTitle: string;
              radioValue: string;
              inputType: string;
              inputValue: number;
              inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => void;
          }
    )[];
    filterValue: TypeFieldExt;
    loading : boolean;
}

export const Filters = (props: IntProps) => {
    const { accepted, handleSubmit, changeFilter, filterArr, filterValue, loading } =
        props;

    return (
        <Div>
            <Title>
                Фильтрация товаров{" "}
                {!accepted && <NotAccepted>не применена!</NotAccepted>}
            </Title>
            <Controls>
                <Params>
                    {filterArr.map((val, idx) => (
                        <FilterBlock
                            key={idx}
                            radioTitle={val.radioTitle}
                            radioValue={val.radioValue}
                            radioChecked={filterValue === val.radioValue}
                            handleChangeRadio={changeFilter}
                            inputType={val.inputType}
                            inputValue={val.inputValue}
                            inputCallback={val.inputCallback}
                            loading={loading}
                        />
                    ))}
                </Params>
                <Submit accepted={accepted} onClick={handleSubmit} disabled={loading}>
                    Применить
                </Submit>
            </Controls>
        </Div>
    );
};
