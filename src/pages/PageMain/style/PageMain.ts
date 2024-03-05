import styled from "styled-components/macro";
import { BREAKPOINT_MOBILE } from "../../../utils/constants";

export const Div = styled.div`
    padding: 50px 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        padding: 30px 10px;
    }
`;

export const DivEmpty = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 40px;
    color: red;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        font-size: 30px;
    }
`;

export const EmptyDesc = styled.div`
    font-size: 30px;
    color: orange;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        font-size: 20px;
    }
`;
