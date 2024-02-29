import { md5 } from "js-md5";
import { TypeField } from "./types";

const add0toDate = (val: string | number) => {
    return +val < 10 ? "0" + val : "" + val;
};

const getAuth = () => {
    const date = new Date();
    const month = add0toDate(date.getMonth() + 1);
    const day = add0toDate(date.getDate());
    const myDate = "" + date.getFullYear() + month + day;

    const password = "Valantis";

    return md5(`${password}_${myDate}`);
};

export const getIds = (offset: number, limit: number) => {
    const data = {
        action: "get_ids",
        params: { offset: offset, limit: limit },
    };

    fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};

export const getItems = (ids: string[]) => {
    const data = {
        action: "get_items",
        params: { ids: ids },
    };

    fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};

export const getFields = (
    field?: TypeField,
    offset?: number,
    limit?: number,
) => {
    const dataParams = {
        action: "get_fields",
        params: { field: field, offset: offset, limit: limit },
    };
    const dataWoParams = {
        action: "get_fields",
    };

    const data =
        (field !== undefined &&
            offset !== undefined &&
            limit !== undefined &&
            dataParams) ||
        dataWoParams;

    console.log(data);
    fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};

export const getFilter = (
    field: TypeField,
    value: string | number | bigint,
) => {
    const data = {
        action: "filter",
        params: { [field]: value },
    };

    console.log(data);

    fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
        });
};
