import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Filters } from "../../components/Filters/Filters";
import { Products } from "../../components/Products/Products";
import { BREAKPOINT_MOBILE } from "../../utils/constants";
import { getFilter, getIds, getItemObj, getItems } from "../../utils/functions";
import { logMe } from "../../utils/testFunctions";
import {
    FieldExtNone,
    IntItem,
    TypeField,
    TypeFieldExt,
} from "../../utils/types";
import { Div, DivEmpty, EmptyDesc } from "./style/PageMain";

export const PageMain = () => {
    const [ids, setIds] = useState<IntItem[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<TypeFieldExt>("none");
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState(0);
    const [brand, setBrand] = useState("");
    const [accepted, setAccepted] = useState(true);
    const [nextDisabled, setNextDisabled] = useState(false);
    const [requestError, setRequestError] = useState(0);
    const [criticalError, setCriticalError] = useState(false);

    const getItemsData = (ids: string[]) => {
        getItems(ids, setError).then((data) => {
            let obj: IntItem[] = [];
            if (data && data.result && data.result.length > 0) {
                logMe("data.result", data.result);
                obj = getItemObj(data.result).slice(0, 50);
                setIds(obj);
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
                if (data && data.result && data.result.length > 0) {
                    getItemsData(
                        data.result.slice(pageData * 50, pageData * 50 + 60),
                    );
                    if (data.result.length < (pageData + 1) * 50) {
                        setNextDisabled(true);
                    } else {
                        setNextDisabled(false);
                    }
                } else {
                    setIds([]);
                    setLoading(false);
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
        if (requestError > 1) {
            setRequestError(requestError - 1);
            getData(page);
        }
        if (requestError === 1 && !loading) {
            setCriticalError(true);
        }
    }, [requestError, loading]);

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
            radioTitle: "Бренд",
            radioValue: "brand",
            inputType: "text",
            inputValue: brand,
            inputCallback: (e: React.ChangeEvent<HTMLInputElement>) => {
                setBrand(e.target.value);
                setAccepted(false);
            },
        },
    ];

    const handleSubmitFilters = () => {
        setLoading(true);
        setCriticalError(false);
        setRequestError(0);
        setAccepted(true);
        setPage(0);
        getData(page);
    };

    const setError = () => {
        if (requestError === 0) {
            setRequestError(5);
        }
    };

    const isMobile = useMediaQuery({ maxWidth: BREAKPOINT_MOBILE });

    const HEIGHT_CARDS = isMobile ? "30vh" : "50vh";

    return (
        <Div>
            {/* {loading && ids.length === 0 ? (
                <Loader
                    widthDiv={isMobile ? "calc(100vw -60px)" : "550px"}
                    heightDiv={HEIGHT_CARDS}
                    widthLoader={70}
                />
            ) : ( */}
                <>
                    <Filters
                        accepted={accepted}
                        handleSubmit={handleSubmitFilters}
                        changeFilter={changeFilter}
                        filterArr={ARR_FILTER}
                        filterValue={filter}
                        loading={loading}
                    />
                    {(ids.length > 0 || loading) ? (
                        <Products
                            page={page}
                            heightCards={HEIGHT_CARDS}
                            handleClick={handleClick}
                            loading={loading}
                            nextDisabled={nextDisabled}
                            items={ids}
                        />
                    ) : (
                        <DivEmpty>
                            <div>
                                {criticalError
                                    ? "Превышено количество перезапросов"
                                    : "Нет элементов для отображения!"}
                            </div>
                            <EmptyDesc>
                                {criticalError
                                    ? "Попробуйте перезагрузить страницу / найти ошибку"
                                    : "Попробуйте другие параметры фильтрации"}
                            </EmptyDesc>
                        </DivEmpty>
                    )}
                </>
            {/* )} */}
        </Div>
    );
};
