import { useEffect } from "react";
import { getFields, getFilter, getIds, getItems } from "../../utils/functions";

export const PageMain = () => {
    useEffect(() => {
        // getIds(0, 5);
        // getItems(["1789ecf3-f81c-4f49-ada2-83804dcc74b0"]);
        // getFields();
        // getFields("brand",4,5);
        getFilter("price", 17500.0);
    }, []);

    return <div></div>;
};
