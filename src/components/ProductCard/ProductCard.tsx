import { IntItem } from "../../utils/types";
import { Div, Id, Num, NumDiv } from "./style/ProductCard";

interface IntProps extends IntItem {
    num: number;
    $width?: string;
}

export const ProductCard = (props: IntProps) => {
    const { num, id, product, price, brand, $width } = props;

    return (
        <Div $width={$width}>
            <Num>
                <NumDiv>Лот #{num + 1}</NumDiv>
            </Num>
            <Id>ID: {id}</Id>
            <div>{product}</div>
            <div>Цена: {price} р.</div>
            <div>{brand && <span>Бренд: {brand}</span>}</div>
        </Div>
    );
};
