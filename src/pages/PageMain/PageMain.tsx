import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import { ProductCard } from "../../components/ProductCard/ProductCard";
import {
    getFields,
    getFilter,
    getIds,
    getItemObj,
    getItems,
} from "../../utils/functions";
import { DefItemSet, IntItem, IntItemSet, TypeIds } from "../../utils/types";
import {
    BtnPage,
    Cards,
    CardsContainer,
    CardsPage,
    Div,
} from "./style/PageMain";

export const PageMain = () => {
    const [ids, setIds] = useState<IntItem[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState("none");
    // const [ids, setIds] = useState<IntItemSet>(DefItemSet);

    const getData = (page: number) => {
        setLoading(true);
        let obj: IntItem[] = [];

        getIds(50 * page, 60).then((data) => {
            if (data) {
                getItems(data.result).then((data) => {
                    // setIds(data.result);
                    if (data && data.result) {
                        console.log("data.result", data.result);
                        obj = getItemObj(data.result).slice(0, 50);
                        // obj=data.result;
                        setIds(obj);

                        console.log("obj11", obj);

                        localStorage.setItem(
                            "valantis_items",
                            JSON.stringify(data.result),
                        );
                        setLoading(false);
                    } else {
                        // console.log("ALO1")
                        setLoading(false);
                    }
                });
            } else {
                // console.log("ALO2")
                setLoading(false);
            }
        });
    };

    useEffect(() => {
        const items = localStorage.getItem("valantis_items");

        console.log("------------------------------------");
        // if (items === null) {
        getData(page);
        // } else {
        //     let obj1: IntItem[] = [];
        //     const itemsParsed = JSON.parse(items);

        //     console.log("itemsParsed", itemsParsed);
        //     obj1 = (getItemObj(itemsParsed as IntItem[]));
        //     // console.log("o",Object.keys(obj).length);
        //     console.log("obj local", obj1);
        //     setIds(obj1);
        // }
    }, []);

    const handleClick = (
        e: React.MouseEvent<HTMLButtonElement>,
        step: number,
    ) => {
        e.preventDefault();
        getData(page + step);
        setPage(page + step);
    };

    const changeFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilter(e.target.value);
    };

    return (
        <Div>
            {ids.length > 0 && (
                <>
                    <CardsPage>Страница №{page + 1}</CardsPage>
                    <div>
                        <div>
                            <input
                                type="radio"
                                id="none"
                                name="none"
                                value="none"
                                checked={filter === "none"}
                                onChange={changeFilter}
                            />
                            <label htmlFor="none">none</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="product"
                                name="product"
                                value="product"
                                checked={filter === "product"}
                                onChange={changeFilter}
                            />
                            <label htmlFor="product">product</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="price"
                                name="price"
                                value="price"
                                checked={filter === "price"}
                                onChange={changeFilter}
                            />
                            <label htmlFor="price">price</label>
                        </div>
                        <div>
                            <input
                                type="radio"
                                id="brand"
                                name="brand"
                                value="brand"
                                checked={filter === "brand"}
                                onChange={changeFilter}
                            />
                            <label htmlFor="brand">brand</label>
                        </div>
                    </div>
                    <CardsContainer>
                        <BtnPage
                            onClick={(e) => handleClick(e, -1)}
                            disabled={page === 0}
                        >
                            &lt;
                        </BtnPage>
                        {loading ? (
                            <Loader
                                widthDiv="550px"
                                heightDiv="70vh"
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
                        <BtnPage onClick={(e) => handleClick(e, +1)} right>
                            &gt;
                        </BtnPage>
                    </CardsContainer>
                </>
            )}
        </Div>
    );
};
