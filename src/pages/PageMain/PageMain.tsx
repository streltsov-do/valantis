import { useEffect, useState } from "react";
import { FilterBlock } from "../../components/FilterBlock/FilterBlock";
import Loader from "../../components/Loader/Loader";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import {
    getFields,
    getFilter,
    getIds,
    getItemObj,
    getItems,
} from "../../utils/functions";
import {
    DefItemSet,
    FieldExtNone,
    IntItem,
    IntItemSet,
    TypeField,
    TypeFieldExt,
    TypeIds,
} from "../../utils/types";
import {
    BtnPage,
    Cards,
    CardsContainer,
    CardsPage,
    Div,
    Filters,
    FiltersControls,
    FiltersNotAccepted,
    FiltersParams,
    FiltersSubmit,
    FiltersTitle,
} from "./style/PageMain";

const HEIGHT_CARDS = "50vh";

export const PageMain = () => {
    const [ids, setIds] = useState<IntItem[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState<TypeFieldExt>("none");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [accepted, setAccepted] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [requestError, setRequestError] = useState(false);

    const getItemsData = (ids: string[]) => {
        getItems(ids, setError).then((data) => {
            let obj: IntItem[] = [];
            if (data && data.result) {
                console.log("data.result", data.result);
                obj = getItemObj(data.result).slice(0, 50);
                setIds(obj);

                console.log("obj data", obj);

                // localStorage.setItem(
                //     "valantis_items",
                //     JSON.stringify(data.result),
                // );
                setLoading(false);
            } else {
                setLoading(false);
            }
        });
    };

    const getDefaultData = (pageData: number) => {
        getIds(50 * pageData, 60, setError).then((data) => {
            if (data) {
                getItemsData(data.result);
            } else {
                setLoading(false);
            }
        });
    };

    const getData = (pageData: number) => {
        setLoading(true);

        let value: number | string = "";
        switch (filter) {
            case "price":
                value = price;
                break;
            case "product":
                value = product;
                break;
            case "brand":
                value = brand;
                break;
            default:
                break;
        }
        if (filter !== FieldExtNone) {
            getFilter(filter, value, setError).then((data) => {
                if (data && data.result) {
                    getItemsData(
                        data.result.slice(pageData * 50, pageData * 50 + 60),
                    );
                    if (data.result.length < (pageData + 1) * 50) {
                        setNextDisabled(true);
                    } else {
                        setNextDisabled(false);
                    }
                }
            });
        } else {
            setNextDisabled(false);
            getDefaultData(pageData);
        }
    };

    useEffect(() => {
        getData(page);
    }, []);

    useEffect(() => {
        if (requestError) {
            setRequestError(false);
            getData(page);
        }
    }, [requestError]);

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        step: number,
    ) => {
        e.preventDefault();
        getData(page + step);
        setPage(page + step);
    };

    const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value as TypeField);
        setAccepted(false);
    };

    const ARR_FILTER = [
        {
            radioTitle: "не фильтровать",
            radioValue: "none",
            inputType: "",
            inputValue: "",
        },
        {
            radioTitle: "Продукт",
            radioValue: "product",
            inputType: "text",
            inputValue: product,
            inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => {
                setProduct(e.target.value);
                setAccepted(false);
            },
        },
        {
            radioTitle: "Цена, р",
            radioValue: "price",
            inputType: "number",
            inputValue: price,
            inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => {
                setPrice(+e.target.value);
                setAccepted(false);
            },
        },
        {
            radioTitle: "Брэнд",
            radioValue: "brand",
            inputType: "text",
            inputValue: brand,
            inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => {
                setBrand(e.target.value);
                setAccepted(false);
            },
        },
    ];

    const handleSubmit = () => {
        setAccepted(true);
        setPage(0);
        getData(page);
    };

    const setError = () => {
        setRequestError(true);
    };

    return (
        <Div>
            <Filters>
                <FiltersTitle>
                    Фильтрация товаров{" "}
                    {!accepted && (
                        <FiltersNotAccepted>не применена!</FiltersNotAccepted>
                    )}
                </FiltersTitle>
                <FiltersControls>
                    <FiltersParams>
                        {ARR_FILTER.map((val, idx) => (
                            <FilterBlock
                                key={idx}
                                radioTitle={val.radioTitle}
                                radioValue={val.radioValue}
                                radioChecked={filter === val.radioValue}
                                handleChangeRadio={changeFilter}
                                inputType={val.inputType}
                                inputValue={val.inputValue}
                                inputCallback={val.inputCallback}
                            />
                        ))}
                    </FiltersParams>
                    <FiltersSubmit accepted={accepted} onClick={handleSubmit}>
                        Применить
                    </FiltersSubmit>
                </FiltersControls>
            </Filters>
            {ids.length > 0 && (
                <>
                    <CardsPage>Страница №{page + 1}</CardsPage>
                    <CardsContainer>
                        <BtnPage
                            onClick={(e) => handleClick(e, -1)}
                            disabled={page === 0}
                            $height={HEIGHT_CARDS}
                        >
                            &lt;
                        </BtnPage>
                        {loading ? (
                            <Loader
                                widthDiv="550px"
                                heightDiv={HEIGHT_CARDS}
                                widthLoader={70}
                            />
                        ) : (
                            <Cards>
                                {ids.map((val, idx) => (
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
                            $height={HEIGHT_CARDS}
                            disabled={nextDisabled}
                        >
                            &gt;
                        </BtnPage>
                    </CardsContainer>
                </>
            )}
        </Div>
    );
};
