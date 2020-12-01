import styled from 'styled-components';

export const PracticeCardContainer = styled.div`
    width: 30vw;
    margin: 12px;
    border: 1px solid white;
    border-radius: 8px;
    padding: 8px;
    text-align: center;
    h3{
        font-size: 24px;

    }
    p{
        font-size: 18px;
    }
    .check-in-button{
        margin: auto;
        background-color: #FF1301;
        border-radius: 4px;
        width: 80%;
        &:hover{
            cursor: pointer;
            background-color: #FF3B2D;
        }
    }
`