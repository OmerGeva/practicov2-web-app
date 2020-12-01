import styled from 'styled-components';

export const PracticesPageContainer = styled.div`
text-align: left;
min-height: 100vh;
width: 100vw;

padding: 5vw;
.title-container{
    display: flex;
    justify-content: space-around;
     margin: auto;
     align-items: center;
     width: 30vw;
    .new-challenge{
        font-size: 60px;
        cursor: pointer;
    }
}
.practice-cards-container{
    display: flex;
    flex-wrap: wrap;
}
`