import { md5 } from "js-md5";
import {
    DefItemCnt,
    IntData,
    IntItem,
    IntItemCnt,
    IntItemSet,
    TypeField,
    TypeIds,
} from "./types";

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

    return fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            console.log("ids response", response);
            if (response.ok) {
                return response.json();
            }
            throw new Error("IDS Response " + response.statusText);
        })
        .then((data) => {
            console.log("ids data", data);
            if (data && !data.message) {
                const typedData = data as IntData<TypeIds>;
                return typedData;
            }
            const dataDefault: IntData<TypeIds> = {
                result: [],
            };
            return dataDefault;
        })
        .catch((error) => {
            console.log(error);
        });
};

export const getItems = (ids: string[]) => {
    const data = {
        action: "get_items",
        params: { ids: ids },
    };

    return fetch(`http://api.valantis.store:40000/`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            console.log("items response", response);
            if (response.ok) {
                return response.json();
            }
            throw new Error("Items Response " + response.statusText);
        })
        .then((data) => {
            console.log("items data", data);
            if (!data.message) {
                const typedData = data as IntData<IntItem[]>;
                return typedData;
            }
            const dataDefault: IntData<IntItem[]> = {
                result: [],
            };
            return dataDefault;
        })
        .catch((error) => {
            console.log(error);
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
            if (response.ok) {
                return response.json();
            }
            throw new Error("Response ERROR:" + response.statusText);
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
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

export function getItemObj(data: IntItem[]) {
    const obj: IntItemCnt = DefItemCnt;
    const objSet: IntItemSet = {};
    let objData: IntItem[] = [];
    for (let i = 0; i < data.length; i++) {
        if (!(data[i].id in objSet)) {
            objSet[data[i].id] = {
                product: data[i].product,
                price: data[i].price,
                brand: data[i].brand,
                cnt: 1,
            };
            obj[data[i].id] = 1;
            objData.push(data[i]);
        } else {
            objSet[data[i].id].cnt = objSet[data[i].id].cnt + 1;

            obj[data[i].id] = obj[data[i].id] + 1;
        }
    }
    return objData;
}
