import styled from 'styled-components';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export const Container = styled.div`
    width: 100%;
    height: 70%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin: auto;
    align-items: flex-start;
    margin-left: 20px;
`;

export const Header = styled.h1`
    color: white;
    text-align: center;
    ${props => props.h1 && 'font-size: 2.5rem'}
    ${props => props.h2 && 'font-size: 2rem'}
    ${props => props.h3 && 'font-size: 1.5rem'}
    ${props => props.h4 && 'font-size: 1rem'}
    ${props => props.h5 && 'font-size: 0.5rem'}

     ${props => props.justify && 'justify-content: center;'}
     ${props => props.animation && '-webkit-animation: color-change 1s infinite;-moz-animation: color-change 1s infinite;-o-animation: color-change 1s infinite;-ms-animation: color-change 1s infinite;animation: color-change 1s infinite;'}
     @-webkit-keyframes color-change {
        0% { color: #dc3545; }
        50% { color: #17a2b8; }
        100% { color: #dc3545; }
    }
    @-moz-keyframes color-change {
        0% { color: #dc3545; }
        50% { color: #17a2b8; }
        100% { color: #dc3545; }
    }
    @-ms-keyframes color-change {
        0% { color: red; }
        50% { color: #17a2b8; }
        100% { color: #dc3545; }
    }
    @-o-keyframes color-change {
        0% { color: #dc3545; }
        50% { color: #17a2b8; }
        100% { color: #dc3545; }
    }
    @keyframes color-change {
        0% { color: #dc3545; }
        50% { color: #17a2b8; }
        100% { color: #dc3545; }
    }

`;

export const HeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
export const BtnLogin = styled(Button)`
    width: 300px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    ${props => props.marginLeft && 'margin-left: 30px'}
`;


export const BtnWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`;

export const LinkWrapper = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;