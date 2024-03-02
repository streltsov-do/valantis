import React from "react";

import * as S from "./styled";

import loader from "./loader.svg";

const Loader = (props: {
    widthDiv: string;
    heightDiv: string;
    widthLoader: number;
    widthDivMin?: string;
}) => {
    const { widthDiv, heightDiv, widthLoader, widthDivMin } = props;
    return (
        <S.StatsLoading
            $width={widthDiv}
            $height={heightDiv}
            $min_width={widthDivMin}
        >
            <S.StatsLoader
                width={widthLoader}
                src={loader}
                alt="loading"
            ></S.StatsLoader>
        </S.StatsLoading>
    );
};

export default Loader;
