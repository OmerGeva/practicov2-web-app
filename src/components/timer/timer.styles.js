import styled from "styled-components";

export const TimerContainer = styled.div`
.timer-circle{
    margin: auto;
    width: 20vh;
    height: 20vh;
    border-radius: 50%;
    border: 1px solid black;
    position: relative;
    .start-stop{
        position: absolute;
        top: 30px;
        left: 28%;
        .start-icon{
            color: #18AF9F;
            font-size: 100px;
            &:hover{
                cursor: pointer;
            }
        }
        .stop-icon{
            color: #FF1301;
            font-size: 100px;
            &:hover{
                cursor: pointer;
            }
        }
    }
    .countdown{
        font-size: 40px;
        position: absolute;
        bottom: 30px;
        left: 15%;
    }
    
}
.save-check-in{
    margin: auto;
    background-color: #FF1301;
    border-radius: 4px;
    margin: 20px auto;
    padding: 10px 15px;
    color: white;
    width: 60%;

    &:hover{
        cursor: pointer;
        background-color: #FF3B2D;
    }
    p{
        margin: 0;
        font-size: 18px;
        text-align: center;
        height: 10%;
    }
}
.disabled{
    background-color: gray;
    &:hover{
        cursor: default;
        background-color: gray;
    }
}
`