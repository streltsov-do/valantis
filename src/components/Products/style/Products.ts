import styled from "styled-components/macro";
import { BREAKPOINT_MOBILE } from "../../../utils/constants";

export const CardsPage = styled.h3`
    margin-bottom: 20px;
`;

export const Container = styled.div`
    display: flex;
    gap: 20px;
    @media (max-width: ${BREAKPOINT_MOBILE}) {
        gap: 20px;
    }
`;

export const Cards = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

export const BtnPage = styled.button<{ $right?: boolean; $height: string }>`
    position: sticky;
    height: ${(props) => props.$height || "70vh"};
    top: calc(50px + 25px + 20px);
    width: 30px;
    font-size: 40px;
    padding: 0;
    border-radius: ${(props) =>
        props.$right ? "0 50px 50px 0" : "50px 0 0 50px"};
    border: none;
`;
