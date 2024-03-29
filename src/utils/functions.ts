import { md5 } from "js-md5";
import { logMe } from "./testFunctions";
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

const URL_VALANTIS = `https://api.valantis.store:41000/`;

const ABORT_TIMEOUT = 10000;

const setErrorMessage = (name: string, status: number, text: string) => {
    return `${name}, код ошибки [${status}], ${text || "нет сообщения от сервера"}`;
};

const getAuth = () => {
    const date = new Date();
    const month = add0toDate(date.getMonth() + 1);
    const day = add0toDate(date.getDate());
    const myDate = "" + date.getFullYear() + month + day;

    const password = "Valantis";

    return md5(`${password}_${myDate}`);
};

export const getIds = (
    offset: number,
    limit: number,
    setRequestError: () => void,
) => {
    const data = {
        action: "get_ids",
        params: { offset: offset, limit: limit },
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT);

    return fetch(`${URL_VALANTIS}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    })
        .then((response) => {
            clearTimeout(timeoutId);
            logMe("ids response", response);
            if (response.ok) {
                return response.json();
            }
            throw new Error(
                setErrorMessage("getIds", response.status, response.statusText),
            );
        })
        .then((data) => {
            logMe("ids data", data);
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
            clearTimeout(timeoutId);
            console.error(error);
            setRequestError();
        });
};

export const getItems = (ids: string[], setRequestError: () => void) => {
    const data = {
        action: "get_items",
        params: { ids: ids },
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT);

    return fetch(`${URL_VALANTIS}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    })
        .then((response) => {
            clearTimeout(timeoutId);
            logMe("items response", response);
            if (response.ok) {
                return response.json();
            }
            throw new Error(
                setErrorMessage(
                    "getItems",
                    response.status,
                    response.statusText,
                ),
            );
        })
        .then((data) => {
            logMe("items data", data);
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
            clearTimeout(timeoutId);
            console.error(error);
            setRequestError();
        });
};

export const getFields = (
    setRequestError: () => void,
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
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT);

    const data =
        (field !== undefined &&
            offset !== undefined &&
            limit !== undefined &&
            dataParams) ||
        dataWoParams;

    logMe(data);
    fetch(`${URL_VALANTIS}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    })
        .then((response) => {
            clearTimeout(timeoutId);
            if (response.ok) {
                return response.json();
            }
            throw new Error(
                setErrorMessage(
                    "getFields",
                    response.status,
                    response.statusText,
                ),
            );
        })
        .then((data) => {
            logMe(data);
        })
        .catch((error) => {
            clearTimeout(timeoutId);
            console.error(error);
            setRequestError();
        });
};

export const getFilter = (
    field: TypeField,
    value: number | string,
    setRequestError: () => void,
) => {
    const data = {
        action: "filter",
        params: { [field]: value },
    };
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), ABORT_TIMEOUT);

    logMe("filter params", data);

    return fetch(`${URL_VALANTIS}`, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "X-Auth": getAuth(),
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    })
        .then((response) => {
            clearTimeout(timeoutId);
            logMe("filter response", response);
            if (response.ok) {
                return response.json();
            }
            throw new Error(
                setErrorMessage(
                    "getFilter",
                    response.status,
                    response.statusText,
                ),
            );
        })
        .then((data) => {
            logMe(data);
            return data;
        })
        .catch((error) => {
            console.error(error);
            setRequestError();
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
