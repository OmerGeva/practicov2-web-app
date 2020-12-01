import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: 'auto',
        width: '25ch',
      },
    },
  }));


  
export const CustomFormContainer = styled.div`
.sign-in-form{
    margin: auto;
    .text-fields{
        display: flex;
        flex-direction: column;
        
    }
}
`