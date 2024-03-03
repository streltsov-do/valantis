import styled from "styled-components/macro";

export const Div = styled.div`
    display: flex;
    gap: 10px;
`;

export const LabeledInput = styled.div`
    display: flex;
    gap: 10px;
`;

export const LabelRadio = styled.label<{ maxContent?: boolean }>`
    width: ${(props) => (props.maxContent ? "max-content" : "70px")};
    text-align: left;
`;

export const InputValue = styled.input`
    width: 100px;
`;
