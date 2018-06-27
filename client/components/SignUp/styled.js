import styled from 'styled-components';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Link } from 'react-router-dom';

export const SignupWrapper = styled.div`
    max-width: 500px;
    min-width: 300px;
    text-align: center;
    color: white;
    font-family:'Franklin Gothic Medium', 'Arial Narrow', 'Arial','sans-serif' ,'Courier New', 'Courier', 'monospace';
    display: flex;
    flex-direction: column;
    max-height: 400px;
    justify-content: space-around;
    height: 100%;
    position: relative;
    top: 150px;
    left: 50px;
`;

export const Header = styled.h1`
    color: white;
`;

export const Content = styled.div`

`;

export const BtnSubmit = styled(Button)`
    width: 150px !important;
    background-color: #00b7ff !important;
    font-size: 20px !important;
    border: none !important;

`;

export const ColWrapper = styled(Col)`
    margin-top: 10px;
    font-size: 20px;
    a {

        color:  white;
        &:hover {
            text-decoration: none;
        }
    }
`;

export const LinkWrapper = styled(Link)`
    &:hover {
        text-decoration: none;
    }
`;