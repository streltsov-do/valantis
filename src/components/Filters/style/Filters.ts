import styled from "styled-components/macro";

export const Div = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5x;
    border: 2px solid lightgray;
    width: max-content;
    padding: 10px;
    margin-bottom: 20px;
`;

export const Title = styled.h4`
    text-align: left;
`;

export const NotAccepted = styled.span`
    color: red;
`;

export const Controls = styled.div`
    margin-top: 15px;
    display: flex;
    gap: 20px;
`;

export const Params = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5x;
    width: max-content;
`;

export const Submit = styled.button<{ accepted: boolean }>`
    background-color: ${(props) => (props.accepted ? "" : "orange")};
    border: 1px solid black;
    border-radius: 5px;
`;
