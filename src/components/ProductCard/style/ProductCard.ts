import styled from "styled-components/macro";
import { BREAKPOINT_MOBILE } from "../../../utils/constants";

export const Div = styled.div<{ $width?: string }>`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: ${(props) => props.$width || "max-content"};
    border: 2px solid aqua;
    border-radius: 10px;
    padding: 25px 5px 25px 100px;
    position: relative;
    box-shadow: 4px 3px 5px lightblue;

    @media (max-width: ${BREAKPOINT_MOBILE}) {
        width: 250px;
        padding: 0 5px;
        gap: 5px;
    }
`;

export const Num = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 100px;
    border-radius: 10px 0 0 10px;
    background-color: azure;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;

    @media (max-width: ${BREAKPOINT_MOBILE}) {
        position: relative;
        width: 100%;
        height: 30px;
        border-radius: 10px 10px 0 0;
        border-bottom: 1px solid lightgray;
    }
`;

export const NumDiv = styled.div`
    width: 50px;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        width: max-content;
    }
`;

export const Id = styled.div`
    font-size: 14px;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        font-size: 11px;
    }
`;
