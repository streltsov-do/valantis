import { IntItem } from "../../utils/types";
import Loader from "../Loader/Loader";
import { ProductCard } from "../ProductCard/ProductCard";
import { BtnPage, Cards, Container, CardsPage } from "./style/Products";

interface IntProps {
    page: number;
    heightCards: string;
    handleClick: (e: React.MouseEvent<HTMLButtonElement>, step: number) => void;
    loading: boolean;
    nextDisabled: boolean;
    items: IntItem[];
}

export const Products = (props: IntProps) => {
    const { page, heightCards, handleClick, loading, nextDisabled, items } =
        props;
    return (
        <>
            <CardsPage>Страница №{page + 1}</CardsPage>
            <Container>
                <BtnPage
                    onClick={(e) => handleClick(e, -1)}
                    disabled={page === 0}
                    $height={heightCards}
                >
                    &lt;
                </BtnPage>
                {loading ? (
                    <Loader
                        widthDiv="550px"
                        heightDiv={heightCards}
                        widthLoader={70}
                    />
                ) : (
                    <Cards>
                        {items.map((val, idx) => (
                            <ProductCard
                                $width="550px"
                                key={idx}
                                num={page * 50 + idx}
                                id={val.id}
                                product={val.product}
                                price={val.price}
                                brand={val.brand}
                            />
                        ))}
                    </Cards>
                )}
                <BtnPage
                    onClick={(e) => handleClick(e, +1)}
                    $right
                    $height={heightCards}
                    disabled={nextDisabled}
                >
                    &gt;
                </BtnPage>
            </Container>
        </>
    );
};
