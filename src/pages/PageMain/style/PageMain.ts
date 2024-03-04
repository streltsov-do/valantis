import styled from "styled-components/macro";

export const Div = styled.div`
    padding: 50px 30px;
    position: relative;
`;

export const CardsPage = styled.h3`
    margin-bottom: 20px;
`;

export const CardsContainer = styled.div`
    display: flex;
    gap: 20px;
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

export const Filters = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5x;
    border: 2px solid lightgray;
    width: max-content;
    padding: 10px;
    margin-bottom: 20px;
`;

export const FiltersTitle = styled.h4`
    text-align: left;
`;

export const FiltersNotAccepted = styled.span`
    color: red;
`;

export const FiltersControls = styled.div`
    margin-top: 15px;
    display: flex;
    gap: 20px;
`;

export const FiltersParams = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5x;
    width: max-content;
`;

export const FiltersSubmit = styled.button<{ accepted: boolean }>`
    background-color: ${(props) => (props.accepted ? "" : "orange")};
    border: 1px solid black;
    border-radius: 5px;
`;

export const DivEmpty = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    font-size: 40px;
    color: red;
`;

export const EmptyDesc = styled.div`
    font-size: 30px;
    color: orange;
`;
