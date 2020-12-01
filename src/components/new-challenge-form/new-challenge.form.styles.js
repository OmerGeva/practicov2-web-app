import styled from 'styled-components';

export const NewChallengeFormContainer = styled.div`
.top-row{
    display: flex;
    flex-wrap: wrap;
    .start-date-picker{
        margin: 10px 5%;
    }
}
.bottom-row{
    height: 10vh;
    align-items: center;

    display: flex;
    h3{
        margin-right: 5%;
    }
    .time-type-chooser{
        height: 80%;
        display: flex;
        align-items: center;

        .option{
            height: 60%;
            width: 4rem;
            display: flex;
            justify-content: center;
            margin: 8px;
            align-items: center;
            border: 1px solid #73bfc6;
            border-radius: 8px;
            padding: 4px;
            &:hover{
                cursor: pointer;
            }
            transition: .2s;

        }
        .chosen-type{
            background-color: #73bfc6;
            color: white;
            transition: .2s;

        }
    }
}
.dialog-actions{
    display: flex;
    justify-content: flex-end;
}
`